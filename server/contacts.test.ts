import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createContact: vi.fn(async (contact) => {
    return { insertId: 1 };
  }),
  getAllContacts: vi.fn(async () => {
    return [
      {
        id: 1,
        name: "John Doe",
        company: "Tech Corp",
        position: "CEO",
        email: "john@techcorp.com",
        phone: "+55 11 99999-9999",
        revenue: "5M - 20M",
        challenge: "Previsibilidade de vendas",
        message: "Interested in the platform",
        createdAt: new Date(),
      },
    ];
  }),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => {
    return true;
  }),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: NonNullable<TrpcContext["user"]> = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contacts.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a contact with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "Jane Smith",
      company: "Business Solutions",
      position: "Sales Director",
      email: "jane@business.com",
      phone: "+55 21 98888-8888",
      revenue: "20M - 100M",
      challenge: "Gestão de carteira",
      message: "Looking for a BI solution",
    });

    expect(result).toEqual({ success: true });
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.create({
        name: "Invalid Email",
        company: "Test Corp",
        position: "Manager",
        email: "not-an-email",
        phone: "+55 11 99999-9999",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("requires mandatory fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.create({
        name: "",
        company: "Test Corp",
        position: "Manager",
        email: "test@example.com",
        phone: "+55 11 99999-9999",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("accepts optional fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "Minimal Contact",
      company: "Minimal Corp",
      position: "Staff",
      email: "minimal@example.com",
      phone: "+55 11 99999-9999",
    });

    expect(result).toEqual({ success: true });
  });
});

describe("contacts.list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requires admin authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.list();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("lists all contacts for admin users", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.list();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("email");
  });

  it("returns empty array when no contacts exist", async () => {
    const { getAllContacts } = await import("./db");
    vi.mocked(getAllContacts).mockResolvedValueOnce([]);

    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.list();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});

describe("contacts notification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("notifies owner when contact is created", async () => {
    const { notifyOwner } = await import("./_core/notification");
    vi.mocked(notifyOwner).mockResolvedValueOnce(true);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.contacts.create({
      name: "Notification Test",
      company: "Test Company",
      position: "Manager",
      email: "test@example.com",
      phone: "+55 11 99999-9999",
      challenge: "Previsibilidade de vendas",
    });

    expect(vi.mocked(notifyOwner)).toHaveBeenCalled();
    const callArgs = vi.mocked(notifyOwner).mock.calls[0]?.[0];
    expect(callArgs?.title).toBe("Novo contato recebido");
    expect(callArgs?.content).toContain("Notification Test");
    expect(callArgs?.content).toContain("Test Company");
  });

  it("handles notification failure gracefully", async () => {
    const { notifyOwner } = await import("./_core/notification");
    vi.mocked(notifyOwner).mockResolvedValueOnce(false);

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "Failed Notification Test",
      company: "Test Company",
      position: "Manager",
      email: "test@example.com",
      phone: "+55 11 99999-9999",
    });

    // Contact should still be created even if notification fails
    expect(result).toEqual({ success: true });
    expect(vi.mocked(notifyOwner)).toHaveBeenCalled();
  });
});
