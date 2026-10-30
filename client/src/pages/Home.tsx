import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Brain, CheckSquare, TrendingUp, AlertCircle, Users, LineChart, Menu, X, Loader2, Phone, Mail, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

/**
 * Northkeep - Plataforma de Gestão Empresarial
 * Tagline: Transforme dados em decisões e decisões em execução
 * Produtos: NK Insights, NK Copilot (Start/Pro), NK Action
 */

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    challenge: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createContactMutation = trpc.contacts.create.useMutation({
    onSuccess: () => {
      toast.success("Obrigado! Entraremos em contato em breve.");
      setFormData({
        name: "",
        company: "",
        position: "",
        email: "",
        phone: "",
        challenge: "",
      });
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Erro ao enviar. Tente novamente.");
      setIsSubmitting(false);
    },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createContactMutation.mutateAsync(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const maxScroll = 300;
      const blur = Math.min((window.scrollY / maxScroll) * 12, 12);
      setBlurAmount(blur);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#1B4D5C] shadow-lg"
            : "bg-white border-b border-gray-200"
        }`}
        style={{
          backdropFilter: `blur(${blurAmount}px)`,
          opacity: isScrolled ? 0.95 : 1,
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/northkeep2_d196630a.png"
              alt="Northkeep"
              className={`transition-all duration-300 ${
                isScrolled ? "h-16" : "h-20"
              }`}
              style={{
                opacity: isScrolled ? 0.9 : 0.7,
                filter: isScrolled ? "brightness(1.1)" : "brightness(1)",
              }}
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Produtos", id: "produtos" },
              { label: "Integração", id: "integracao" },
              { label: "Para Quem", id: "para-quem" },
              { label: "Contato", id: "contato" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-white hover:text-[#00A8E8]"
                    : "text-gray-700 hover:text-[#2B7A8E]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+554731500001"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-white hover:text-[#00A8E8]"
                  : "text-gray-700 hover:text-[#2B7A8E]"
              }`}
            >
              47 3150-0001
            </a>
            <Button
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className={`transition-all ${
                isScrolled
                  ? "bg-white text-[#1B4D5C] hover:bg-gray-100"
                  : "bg-[#2B7A8E] text-white hover:bg-[#1B4D5C]"
              }`}
            >
              Agendar Diagnóstico <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-white" : "text-gray-700"} />
            ) : (
              <Menu className={isScrolled ? "text-white" : "text-gray-700"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1B4D5C] border-t border-[#2B7A8E] p-4">
            <nav className="flex flex-col gap-4 mb-4">
              {[
                { label: "Produtos", id: "produtos" },
                { label: "Integração", id: "integracao" },
                { label: "Para Quem", id: "para-quem" },
                { label: "Contato", id: "contato" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-white hover:text-[#00A8E8] text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="tel:+554731500001" className="block text-white text-sm mb-4">
              47 3150-0001
            </a>
            <Button 
              className="w-full bg-white text-[#1B4D5C] hover:bg-gray-100"
              onClick={() => {
                document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              Agendar Diagnóstico
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[#2B7A8E] font-semibold mb-6 italic">
              "Visão sem execução é alucinação." — Thomas Edison
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transforme dados em decisões e decisões em execução
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A Northkeep organiza indicadores, aplica inteligência artificial à gestão e acompanha planos de ação para que empresas tenham mais clareza, direção e execução nas áreas comercial, financeira, produtiva, logística e estratégica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#2B7A8E] text-white hover:bg-[#1B4D5C]"
                onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
              >
                Conhecer os Módulos <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="border-[#2B7A8E] text-[#2B7A8E] hover:bg-[#2B7A8E] hover:text-white"
                onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              >
                Agendar Diagnóstico
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              O Desafio da Gestão Moderna
            </h2>
            <p className="text-base text-gray-600">
              Empresas acumulam dados dispersos, mas carecem de inteligência para interpretá-los e disciplina para transformar decisões em execução.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: AlertCircle, title: "Dados Espalhados", desc: "Informações em planilhas, ERP e relatórios manuais sem visão consolidada" },
              { icon: Users, title: "Reuniões sem Ação", desc: "Decisões que não resultam em planos claros com responsáveis e prazos" },
              { icon: TrendingUp, title: "Falta de Previsibilidade", desc: "Dificuldade em interpretar indicadores e antecipar resultados" },
              { icon: LineChart, title: "Execução Desconectada", desc: "Falta de conexão entre análise de dados e ações práticas" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <item.icon className="w-8 h-8 text-[#2B7A8E] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos Section */}
      <section id="produtos" className="py-20 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Os Três Módulos da Northkeep
            </h2>
            <p className="text-base text-gray-600">
              Cada módulo pode ser contratado separadamente, mas funcionam melhor juntos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* NK Insights */}
            <div className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Database className="w-12 h-12 text-[#2B7A8E] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">NK Insights</h3>
              <p className="text-sm font-semibold text-[#2B7A8E] mb-4">Sistema de dados e indicadores</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                O NK Insights organiza os dados da empresa em indicadores, dashboards e relatórios gerenciais, permitindo que a diretoria acompanhe vendas, finanças, produção, logística, estoque e demais áreas críticas em uma visão clara e objetiva.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">O que entrega:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Organização centralizada de dados</li>
                  <li>✓ Dashboards por área (comercial, financeiro, produtivo, logístico)</li>
                  <li>✓ Indicadores em tempo real</li>
                  <li>✓ Relatórios executivos</li>
                  <li>✓ Visão gerencial consolidada</li>
                  <li>✓ Acompanhamento de metas e resultados</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Ideal para:</p>
                <p className="text-sm text-gray-600">
                  Empresas com dados espalhados, sem BI, com ERP que não entrega visão gerencial, ou diretorias sem indicadores consolidados.
                </p>
              </div>
            </div>

            {/* NK Copilot */}
            <div className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <Brain className="w-12 h-12 text-[#00A8E8] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">NK Copilot</h3>
              <p className="text-sm font-semibold text-[#00A8E8] mb-4">Sistema de IA aplicada à gestão</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                O NK Copilot permite que gestores façam perguntas sobre os dados da empresa e recebam respostas, análises, recomendações e sugestões de planos de ação, tornando a tomada de decisão mais rápida, inteligente e fundamentada.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">Dois níveis:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><strong>Start:</strong> Dados essenciais para gestão</li>
                  <li><strong>Pro:</strong> Análise ampla com maior integração</li>
                </ul>
              </div>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">O que entrega:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Perguntas em linguagem natural</li>
                  <li>✓ Interpretação de indicadores</li>
                  <li>✓ Identificação de riscos</li>
                  <li>✓ Sugestão de prioridades</li>
                  <li>✓ Recomendações de ações</li>
                  <li>✓ Resumos executivos</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Ideal para:</p>
                <p className="text-sm text-gray-600">
                  Empresas que já possuem dados, querem usar IA para análise, automatizar insights e apoiar a diretoria na tomada de decisão.
                </p>
              </div>
            </div>

            {/* NK Action */}
            <div className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <CheckSquare className="w-12 h-12 text-[#1B4D5C] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">NK Action</h3>
              <p className="text-sm font-semibold text-[#1B4D5C] mb-4">Sistema de planos de ação</p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                O NK Action organiza os planos de ação da empresa, conectando decisões a responsáveis, prazos, prioridades e acompanhamento, para que a gestão não termine na reunião.
              </p>
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">O que entrega:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Cadastro de planos de ação</li>
                  <li>✓ Responsáveis e prazos</li>
                  <li>✓ Prioridades e status</li>
                  <li>✓ Acompanhamento de execução</li>
                  <li>✓ Reuniões de follow-up</li>
                  <li>✓ Visão gerencial do andamento</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Ideal para:</p>
                <p className="text-sm text-gray-600">
                  Empresas cujas reuniões geram decisões sem acompanhamento, com tarefas espalhadas, ou que precisam de clareza sobre responsáveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integração Section */}
      <section id="integracao" className="py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              O Diferencial Está na Integração
            </h2>
            <p className="text-base text-gray-600">
              Apesar de cada módulo poder ser contratado separadamente, o maior diferencial da Northkeep está na interação entre eles.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { num: "1", title: "Dados mostram o cenário", desc: "NK Insights centraliza informações de todas as áreas", icon: Database },
                { num: "2", title: "IA interpreta e recomenda", desc: "NK Copilot analisa os dados e sugere ações", icon: Brain },
                { num: "3", title: "Planos de ação organizam a execução", desc: "NK Action estrutura responsáveis, prazos e prioridades", icon: CheckSquare },
                { num: "4", title: "Diretoria acompanha resultados", desc: "Visão clara do andamento e impacto das ações", icon: TrendingUp },
                { num: "5", title: "Indicadores são atualizados", desc: "Resultados retornam aos dashboards", icon: LineChart },
                { num: "6", title: "A gestão evolui continuamente", desc: "Ciclo de melhoria contínua retroalimentado", icon: ArrowRight },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#2B7A8E] text-white font-bold">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem Section */}
      <section id="para-quem" className="py-20 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Para Quem é a Northkeep?
            </h2>
            <p className="text-base text-gray-600">
              A Northkeep é indicada para empresas que já possuem operação, clientes, equipe e dados, mas ainda têm dificuldade em transformar informações em decisões práticas e decisões em execução acompanhada.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemplos de Dores:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Dados espalhados em planilhas, ERP e relatórios manuais</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Diretoria sem visão consolidada dos indicadores</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Reuniões que geram decisões sem acompanhamento</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Falta de clareza sobre responsáveis e prazos</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Dificuldade de interpretar indicadores</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Baixa previsibilidade de resultados</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Falta de conexão entre análise e execução</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Público Ideal:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Sócios e Administradores</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Diretores Executivos e Financeiros</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Controllers e Gestores</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Empresas B2B com operação complexa</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Indústrias e Distribuidoras</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Empresas com 50+ colaboradores</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2B7A8E] font-bold">•</span>
                    <span>Faturamento de R$ 5M a R$ 500M+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Pronto para Transformar sua Gestão?
            </h2>
            <p className="text-base text-gray-600 mb-12 text-center">
              Agende um diagnóstico gratuito e descubra como a Northkeep pode ajudar sua empresa.
            </p>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <a
                href="tel:+554731500001"
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#2B7A8E] transition-colors text-center"
              >
                <Phone className="w-8 h-8 text-[#2B7A8E] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Telefone</h3>
                <p className="text-gray-600">47 3150-0001</p>
              </a>

              <a
                href="https://wa.me/554731500001"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#2B7A8E] transition-colors text-center"
              >
                <MessageCircle className="w-8 h-8 text-[#2B7A8E] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600">47 3150-0001</p>
              </a>

              <a
                href="mailto:contato@northkeep.com.br"
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#2B7A8E] transition-colors text-center"
              >
                <Mail className="w-8 h-8 text-[#2B7A8E] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-sm text-gray-600">contato@northkeep.com.br</p>
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6 bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu Nome"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2B7A8E]"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Empresa"
                  value={formData.company}
                  onChange={handleFormChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2B7A8E]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="position"
                  placeholder="Cargo"
                  value={formData.position}
                  onChange={handleFormChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2B7A8E]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2B7A8E]"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Telefone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2B7A8E]"
              />

              <textarea
                name="challenge"
                placeholder="Qual é seu maior desafio de gestão?"
                value={formData.challenge}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#2B7A8E]"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2B7A8E] text-white hover:bg-[#1B4D5C] py-3 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar Diagnóstico
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B4D5C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#produtos" className="hover:text-white">NK Insights</a></li>
                <li><a href="#produtos" className="hover:text-white">NK Copilot</a></li>
                <li><a href="#produtos" className="hover:text-white">NK Action</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#para-quem" className="hover:text-white">Para Quem</a></li>
                <li><a href="#integracao" className="hover:text-white">Integração</a></li>
                <li><a href="#contato" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="tel:+554731500001" className="hover:text-white">47 3150-0001</a></li>
                <li><a href="https://wa.me/554731500001" className="hover:text-white">WhatsApp</a></li>
                <li><a href="mailto:contato@northkeep.com.br" className="hover:text-white">contato@northkeep.com.br</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Localização</h4>
              <p className="text-sm text-gray-300">Joinville, SC</p>
              <p className="text-sm text-gray-300 mt-2">+20 anos de experiência em gestão empresarial</p>
            </div>
          </div>
          <div className="border-t border-[#2B7A8E] pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2026 Northkeep. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
