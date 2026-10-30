import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import { createContact, getAllContacts } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contacts: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          company: z.string().min(1),
          position: z.string().min(1),
          email: z.string().email(),
          phone: z.string().min(1),
          revenue: z.string().optional(),
          challenge: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const contact = await createContact(input);

          // Notify owner about new contact
          const notificationSent = await notifyOwner({
            title: "Novo contato recebido",
            content: `${input.name} de ${input.company} (${input.position}) solicitou uma demonstracao.\n\nE-mail: ${input.email}\nTelefone: ${input.phone}\nDesafio: ${input.challenge || "Nao informado"}`,
          });

          if (!notificationSent) {
            console.warn("[Contacts] Failed to send notification to owner for contact:", input.email);
          }

          return { success: true };
        } catch (error) {
          console.error("Failed to create contact:", error);
          throw new Error("Failed to create contact");
        }
      }),
    list: adminProcedure.query(async () => {
      try {
        return await getAllContacts();
      } catch (error) {
        console.error("Failed to list contacts:", error);
        throw new Error("Failed to list contacts");
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
