import ContactForm from "@/components/ContactForm";
import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneTel,
  links,
  publicAsset,
  whatsappUrl,
} from "@/lib/site";
import {
  ArrowRight,
  CheckSquare,
  ClipboardCheck,
  LineChart,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { label: "Produtos", id: "produtos" },
  { label: "Ciclo", id: "ciclo" },
  { label: "Para quem", id: "para-quem" },
  { label: "Contato", id: "contato" },
];

function External({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

export default function Home() {
  const email = contactEmail();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkTone = scrolled ? "text-white hover:text-[#B7E4EF]" : "text-gray-700 hover:text-[#2B7A8E]";

  function go(id: string) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        Ir para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors ${
          scrolled ? "bg-[#1B4D5C] shadow-lg" : "border-b border-gray-200 bg-white"
        }`}
      >
        <div className="container flex items-center justify-between py-3">
          <a href="#conteudo" className="shrink-0">
            <img
              src={publicAsset("logo.png")}
              alt="Northkeep"
              width={880}
              height={271}
              className={`w-auto ${scrolled ? "h-11 rounded-md bg-white px-2 py-1" : "h-14"}`}
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Seções">
            {nav.map(item => (
              <a key={item.id} href={`#${item.id}`} className={`text-sm font-medium ${linkTone}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a href={`tel:${contactPhoneTel}`} className={`text-sm font-medium ${linkTone}`}>
              {contactPhoneDisplay}
            </a>
            <button type="button" className={scrolled ? "button-accent" : "button-primary"} onClick={() => go("contato")}>
              Falar com a Northkeep <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="rounded p-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen(open => !open)}
          >
            <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
            {menuOpen ? (
              <X className={scrolled ? "text-white" : "text-gray-700"} />
            ) : (
              <Menu className={scrolled ? "text-white" : "text-gray-700"} />
            )}
          </button>
        </div>

        {menuOpen && (
          <div id="menu-mobile" className="border-t border-[#2B7A8E] bg-[#1B4D5C] p-4 lg:hidden">
            <nav className="mb-4 flex flex-col gap-4" aria-label="Seções">
              {nav.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-medium text-white hover:text-[#B7E4EF]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a href={`tel:${contactPhoneTel}`} className="mb-4 block text-sm text-white">
              {contactPhoneDisplay}
            </a>
            <button type="button" className="button-accent w-full justify-center" onClick={() => go("contato")}>
              Falar com a Northkeep
            </button>
          </div>
        )}
      </header>

      <main id="conteudo">
        <section className="bg-gradient-to-b from-white to-gray-50 pb-20 pt-32">
          <div className="container max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#2B7A8E]">
              Consultoria em gestão, BI e indicadores · Joinville/SC
            </p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Dados, decisão e execução no mesmo ciclo
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              A Northkeep é uma consultoria de gestão, business intelligence e indicadores. Os produtos públicos
              são o ONE, o NK Action e o NK Diagnóstico.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button type="button" className="button-primary justify-center" onClick={() => go("produtos")}>
                Conhecer os produtos <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <button type="button" className="button-secondary justify-center" onClick={() => go("contato")}>
                Falar com a Northkeep
              </button>
            </div>
          </div>
        </section>

        <section className="border-b border-gray-200 bg-white py-20">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Onde a gestão se perde</h2>
              <p className="text-gray-600">
                Dados espalhados, decisão sem dono e plano que não sai da reunião. É o recorte que o ONE e o NK
                Action descrevem nas páginas dos produtos.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {[
                ["Território e carteira sem leitura", "Regiões, mix e representantes ficam em planilhas e no ERP, sem uma prioridade para a semana."],
                ["Previsibilidade tarde demais", "Queda de volume, risco de churn e desvio de meta aparecem quando o período já fechou."],
                ["Decisão sem responsável", "A reunião termina e ninguém fica com prazo, devolutiva e evidência."],
                ["Indicador sem resposta", "O desvio aparece no número, mas o plano de ação não é acompanhado."],
              ].map(([title, desc]) => (
                <article key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="produtos" className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">Produtos</h2>
              <p className="text-gray-600">
                Três produtos no ar. Os planos do NK Action, com teste gratuito, estão na página do produto.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
              <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-8">
                <LineChart className="mb-4 size-12 text-[#2B7A8E]" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">ONE</h3>
                <p className="mb-4 text-sm font-semibold text-[#2B7A8E]">Inteligência estratégica comercial</p>
                <p className="mb-4 leading-relaxed text-gray-600">
                  Transforma dados comerciais — SAP, outros ERPs ou carga manual — em priorização de território,
                  mix, carteira e previsão. A IA descreve, diagnostica, prevê e sugere a próxima ação. A liderança
                  valida. Quando o insight vira plano, o NK Action registra indicador, responsável e prazo.
                </p>
                <p className="mb-6 text-sm text-gray-600">
                  O comercial já está no ar. Operações, supply e produção estão no roadmap publicado na página do
                  produto. A avaliação de aderência, sem custo, é para indústrias e distribuidores B2B com 50 ou
                  mais funcionários.
                </p>
                <div className="mt-auto flex flex-col gap-2 text-sm font-semibold">
                  <External href={links.oneLanding} className="text-[#2B7A8E] hover:underline">
                    Conhecer o ONE
                  </External>
                  <External href={links.oneApp} className="text-[#2B7A8E] hover:underline">
                    Entrar no ONE
                  </External>
                </div>
              </article>

              <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-8">
                <CheckSquare className="mb-4 size-12 text-[#1B4D5C]" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">NK Action</h3>
                <p className="mb-4 text-sm font-semibold text-[#1B4D5C]">Planos de ação e indicadores</p>
                <p className="mb-4 leading-relaxed text-gray-600">
                  Organiza o caminho entre a decisão e a devolutiva: plano, responsável, prazo, status e evidência.
                  Indicadores e metas ficam no mesmo produto. Funciona sozinho ou a partir de um insight do ONE. A
                  IA pode sugerir ações a partir de uma ata; o gestor revisa antes de criar o plano.
                </p>
                <p className="mb-6 text-sm text-gray-600">
                  Há teste gratuito. Os planos públicos estão na página do NK Action.
                </p>
                <div className="mt-auto flex flex-col gap-2 text-sm font-semibold">
                  <External href={links.action} className="text-[#2B7A8E] hover:underline">
                    Conhecer o NK Action
                  </External>
                  <External href={links.actionPlans} className="text-[#2B7A8E] hover:underline">
                    Ver planos e preços
                  </External>
                  <External href={links.actionTrial} className="text-[#2B7A8E] hover:underline">
                    Começar gratuitamente
                  </External>
                </div>
              </article>

              <article className="flex flex-col rounded-lg border border-gray-200 bg-white p-8">
                <ClipboardCheck className="mb-4 size-12 text-[#4BA3B8]" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-gray-900">NK Diagnóstico</h3>
                <p className="mb-4 text-sm font-semibold text-[#4BA3B8]">Análise de aderência</p>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Sistema de análise de aderência. O acesso público é a tela de login.
                </p>
                <div className="mt-auto text-sm font-semibold">
                  <External href={links.diagnostico} className="text-[#2B7A8E] hover:underline">
                    Acessar o NK Diagnóstico
                  </External>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="ciclo" className="border-b border-gray-200 bg-white py-20">
          <div className="container max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">ONE e NK Action no mesmo ciclo</h2>
            <p className="mb-10 text-center text-gray-600">
              Ciclo publicado nas páginas do ONE e do NK Action. O NK Diagnóstico é um sistema à parte, de análise
              de aderência.
            </p>
            <ol className="space-y-6">
              {[
                ["O ONE identifica", "Lê o recorte comercial e recomenda território, mix, carteira ou previsão."],
                ["A liderança valida", "A sugestão não vira compromisso sozinha."],
                ["O NK Action organiza", "Registra indicador, responsável, prazo e acompanhamento."],
                ["A equipe executa", "A devolutiva fica no plano, com evidência."],
                ["O resultado retorna", "O histórico permanece para a próxima leitura."],
              ].map(([title, desc], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#2B7A8E] font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-gray-600">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="para-quem" className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="container max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Para quem</h2>
            <p className="mb-8 text-center text-gray-600">
              Empresas que já operam e precisam ligar indicador, decisão e responsável. O recorte publicado na
              página do ONE é indústria e distribuição B2B.
            </p>
            <ul className="grid gap-3 text-gray-700 sm:grid-cols-2">
              {[
                "Sócios e administradores",
                "Diretoria executiva e financeira",
                "Controladoria e gestores",
                "Indústria, distribuição e atacado B2B",
              ].map(item => (
                <li key={item} className="rounded-lg border border-gray-200 bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contato" className="bg-white py-20">
          <div className="container max-w-2xl">
            <h2 className="mb-4 text-center text-3xl font-bold text-gray-900">Fale com a Northkeep</h2>
            <p className="mb-10 text-center text-gray-600">
              Conte o contexto da empresa. O retorno sai pelo e-mail ou telefone informados.
            </p>
            <div className="mb-10 grid gap-4 sm:grid-cols-3">
              <a href={`tel:${contactPhoneTel}`} className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center hover:border-[#2B7A8E]">
                <Phone className="mx-auto mb-2 size-7 text-[#2B7A8E]" aria-hidden="true" />
                <span className="block text-sm font-semibold text-gray-900">Telefone</span>
                <span className="text-sm text-gray-600">{contactPhoneDisplay}</span>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center hover:border-[#2B7A8E]">
                <MessageCircle className="mx-auto mb-2 size-7 text-[#2B7A8E]" aria-hidden="true" />
                <span className="block text-sm font-semibold text-gray-900">WhatsApp</span>
                <span className="text-sm text-gray-600">{contactPhoneDisplay}</span>
              </a>
              <a href={`mailto:${email}`} className="rounded-lg border border-gray-200 bg-gray-50 p-5 text-center hover:border-[#2B7A8E]">
                <Mail className="mx-auto mb-2 size-7 text-[#2B7A8E]" aria-hidden="true" />
                <span className="block text-sm font-semibold text-gray-900">E-mail</span>
                <span className="text-sm text-gray-600">{email}</span>
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-[#1B4D5C] py-12 text-white">
        <div className="container grid gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-3 text-base font-semibold text-white">Produtos</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><External href={links.oneLanding} className="hover:text-white">ONE</External></li>
              <li><External href={links.action} className="hover:text-white">NK Action</External></li>
              <li><External href={links.diagnostico} className="hover:text-white">NK Diagnóstico</External></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-base font-semibold text-white">Site</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="#produtos" className="hover:text-white">Produtos</a></li>
              <li><a href="#ciclo" className="hover:text-white">Ciclo</a></li>
              <li><a href="#contato" className="hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-base font-semibold text-white">Contato</h2>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href={`tel:${contactPhoneTel}`} className="hover:text-white">{contactPhoneDisplay}</a></li>
              <li><a href={whatsappUrl} className="hover:text-white" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-base font-semibold text-white">Onde</h2>
            <p className="text-sm text-gray-200">Joinville, SC</p>
          </div>
        </div>
        <p className="container mt-8 border-t border-[#2B7A8E] pt-6 text-center text-sm text-gray-200">
          © {new Date().getFullYear()} Northkeep.
        </p>
      </footer>
    </div>
  );
}
