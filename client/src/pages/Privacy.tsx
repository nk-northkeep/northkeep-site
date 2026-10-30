import { CookiePreferencesButton } from "@/components/CookieBanner";
import { companyIdentification, privacyEmail, privacyUpdated, publicAsset } from "@/lib/site";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Privacy() {
  const company = companyIdentification();
  const hasIdentity = Boolean(company.legalName || company.cnpj || company.address);

  useEffect(() => {
    document.title = "Política de Privacidade | Northkeep";
    return () => {
      document.title = "Northkeep | BI, IA e Indicadores para Performance Comercial";
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/">
            <img src={publicAsset("logo.png")} alt="Northkeep" width={880} height={271} className="h-14 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-sm font-semibold text-[#2B7A8E] hover:underline">
            Voltar ao início
          </Link>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2B7A8E]">Privacidade e proteção de dados</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Política de Privacidade</h1>
        <p className="mt-6 leading-relaxed">
          Em cumprimento à Lei n° 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD), à Lei nº 12.965/2014 (Marco Civil da Internet) e às demais legislações aplicáveis, a <strong>NorthKeep</strong>, pessoa jurídica de direito privado, formaliza este Aviso de Privacidade para dar transparência às atividades de tratamento de dados pessoais realizadas no site institucional (<a className="text-[#2B7A8E] underline" href="https://www.northkeep.com.br/">www.northkeep.com.br</a>), inclusive enquanto ele estiver publicado no endereço temporário do GitHub Pages.
        </p>
        <p className="mt-4"><strong>Cuidamos da sua segurança para que você possa se concentrar no que realmente importa.</strong></p>
        <p><strong>A sua privacidade é nosso compromisso.</strong></p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">Controlador</h2>
        <p className="mt-3">A NorthKeep é a controladora dos dados pessoais tratados neste site.</p>
        {hasIdentity && (
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {company.legalName && <li><strong>Razão social:</strong> {company.legalName}</li>}
            {company.cnpj && <li><strong>CNPJ:</strong> {company.cnpj}</li>}
            {company.address && <li><strong>Endereço:</strong> {company.address}</li>}
          </ul>
        )}

        <h2 className="mt-10 text-2xl font-bold text-gray-900">1. Definições</h2>
        <p className="mt-3">Para facilitar a leitura deste aviso, seguem alguns conceitos importantes da LGPD:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong>Dado pessoal:</strong> informação relacionada a pessoa natural identificada ou identificável.</li>
          <li><strong>Dado pessoal sensível:</strong> dado sobre origem racial ou étnica, convicção religiosa, opinião política, filiação sindical, dado referente à saúde ou à vida sexual, dado genético ou biométrico vinculado a uma pessoa natural.</li>
          <li><strong>Titular:</strong> pessoa natural a quem se referem os dados pessoais tratados.</li>
          <li><strong>Encarregado:</strong> pessoa indicada pela NorthKeep para atuar como canal de comunicação entre o controlador, os titulares dos dados e a Autoridade Nacional de Proteção de Dados.</li>
          <li><strong>Tratamento:</strong> toda operação realizada com dados pessoais, como coleta, produção, recepção, classificação, uso, acesso, armazenamento, compartilhamento, eliminação e demais atividades previstas em lei.</li>
          <li><strong>Autoridade nacional:</strong> órgão responsável por zelar, implementar e fiscalizar o cumprimento da LGPD em todo o território nacional.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">2. Dados coletados pela NorthKeep</h2>
        <h3 className="mt-6 text-xl font-semibold text-gray-900">2.1 Contato, cotações e relacionamento</h3>
        <p className="mt-3">
          Quando o titular entra em contato por telefone, WhatsApp ou e-mail, a mensagem parte do próprio titular. Podemos tratar nome, telefone, e-mail e o conteúdo enviado para retornar o atendimento. Recomendamos que não sejam enviados dados desnecessários, principalmente dados sensíveis.
        </p>
        <p className="mt-3">
          O formulário de contato deste site coleta nome, empresa, cargo, e-mail, telefone e a descrição do desafio de gestão. Há um campo opcional, desmarcado por padrão, para receber comunicações institucionais. Com o canal de formulário ativo, o envio é processado pela Formspree. Sem esse canal, o navegador abre uma mensagem de e-mail para o endereço de contato exibido na página.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">2.2 Execução de contratos</h3>
        <p className="mt-3">
          Na relação com clientes, prestadores de serviço e parceiros, tratamos dados necessários para formalização, execução e acompanhamento contratual. Em relações B2B, isso pode incluir nome, telefone, e-mail e outras informações profissionais pertinentes.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">2.3 Cumprimento de obrigações legais e regulatórias</h3>
        <p className="mt-3">
          Em nossas atividades, tratamos dados para atender exigências legais e regulatórias, como emissão de documentos fiscais, manutenção de registros e cumprimento de obrigações relacionadas ao Marco Civil da Internet.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">2.4 Segurança do titular e de terceiros</h3>
        <p className="mt-3">
          Para preservar a segurança nos ambientes físicos e digitais da NorthKeep, podemos tratar informações de identificação e acesso, sempre de forma proporcional e adequada à finalidade de proteção.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">2.5 Comunicações institucionais</h3>
        <p className="mt-3">
          O titular só passa a receber comunicações institucionais a partir deste formulário se marcar o campo opcional de comunicações. A marcação não é condição para enviar a mensagem. O titular pode se opor depois pelo canal indicado na seção 10.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">2.6 Funcionalidade do site e medição</h3>
        <p className="mt-3">
          O site guarda neste navegador, em armazenamento local, a escolha de cookies do visitante. Isso não identifica a pessoa.
        </p>
        <p className="mt-3">
          Quando a ferramenta está configurada no build e o visitante aceita a categoria correspondente, também podem ser usados: Google Analytics 4 e Microsoft Clarity (analíticos) e Meta Pixel e LinkedIn Insight Tag (marketing). Sem essa aceitação, esses scripts não são carregados. Um envio bem-sucedido do formulário pode registrar um evento de conversão no Google Analytics 4 e no Meta Pixel, se essas ferramentas tiverem sido aceitas.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">3. Finalidades do tratamento</h2>
        <p className="mt-3">Os dados descritos neste aviso podem ser tratados para as seguintes finalidades:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Execução de contrato ou de procedimentos preliminares relacionados a contrato do qual o titular seja parte.</li>
          <li>Cumprimento de obrigação legal ou regulatória pelo controlador.</li>
          <li>Exercício regular de direitos em processo judicial, administrativo ou arbitral.</li>
          <li>Proteção da vida ou da incolumidade física do titular ou de terceiros.</li>
          <li>Atendimento a interesses legítimos da NorthKeep, sempre com respeito aos direitos e liberdades fundamentais do titular.</li>
          <li>Tratamento com base em consentimento, quando aplicável.</li>
        </ol>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">3.1 Dados sensíveis</h3>
        <p className="mt-3">O tratamento de dados pessoais sensíveis ocorrerá somente nas hipóteses admitidas em lei, incluindo:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Prevenção à fraude e garantia da segurança do titular em processos de identificação e autenticação.</li>
          <li>Cumprimento de obrigação legal ou regulatória.</li>
          <li>Exercício regular de direitos em contrato ou processo judicial e administrativo.</li>
          <li>Proteção da vida ou da integridade física do titular ou de terceiros.</li>
          <li>Consentimento específico e destacado do titular, quando aplicável.</li>
        </ol>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">4. Período de armazenamento</h2>
        <p className="mt-3">
          A NorthKeep armazenará os dados pessoais pelo tempo necessário para cumprir as finalidades descritas neste aviso ou para atender obrigações legais, regulatórias e contratuais. Os dados serão tratados de forma ética, responsável e apenas enquanto forem necessários às bases legais que justificam seu uso.
        </p>
        <p className="mt-3">
          Dados relacionados a comunicações institucionais poderão ser tratados até manifestação de oposição pelo titular. Caso haja nova interação com nossos canais, o contato institucional poderá ser retomado dentro dos limites legais.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">5. Segurança da informação</h2>
        <p className="mt-3">
          A segurança é parte central da atuação da NorthKeep. Adotamos medidas técnicas e administrativas adequadas para proteger os dados pessoais contra acessos não autorizados, incidentes e usos indevidos.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Equipe treinada e comprometida com confidencialidade e privacidade.</li>
          <li>Gestão estruturada de acessos e controle de riscos.</li>
          <li>Atualização contínua de soluções de proteção, como antivírus, firewalls e mecanismos preventivos.</li>
          <li>Melhoria contínua dos processos de segurança e conscientização interna.</li>
        </ul>
        <p className="mt-3">
          Embora nenhuma organização esteja totalmente livre de incidentes, a NorthKeep atua continuamente para prevenir riscos e reduzir potenciais impactos aos titulares e à própria organização.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">6. Compartilhamento com terceiros</h2>
        <p className="mt-3">Os dados pessoais poderão ser compartilhados nas seguintes hipóteses:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Em caso de sucessão empresarial, como fusão, incorporação ou aquisição, preservadas as finalidades e condições mínimas de segurança.</li>
          <li>Com fornecedores e operadores que prestem serviços à NorthKeep, como hospedagem, computação em nuvem, processamento, publicidade, marketing, faturamento e assessoria jurídica.</li>
          <li>Por obrigação legal ou mediante ordem de autoridade judicial, policial ou administrativa competente.</li>
        </ol>
        <p className="mt-3">Neste site, os operadores usados são:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong>GitHub Pages</strong> — hospedagem dos arquivos do site.</li>
          <li><strong>Formspree</strong> — processamento do formulário de contato, com servidores nos Estados Unidos, quando o canal está configurado.</li>
          <li><strong>Google Analytics 4</strong> — medição de audiência, somente se estiver configurado e o visitante aceitar cookies analíticos.</li>
          <li><strong>Microsoft Clarity</strong> — medição de audiência e gravação de sessão, somente se estiver configurado e o visitante aceitar cookies analíticos.</li>
          <li><strong>Meta Pixel</strong> — medição de marketing, somente se estiver configurado e o visitante aceitar cookies de marketing.</li>
          <li><strong>LinkedIn Insight Tag</strong> — medição de marketing, somente se estiver configurado e o visitante aceitar cookies de marketing.</li>
        </ul>
        <p className="mt-3">
          Esses terceiros atuam sob orientação da NorthKeep e não utilizam os dados para finalidades próprias incompatíveis com as bases legais aplicáveis.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">6.1 Transferência internacional de dados</h3>
        <p className="mt-3">
          GitHub Pages, Formspree, Google Analytics 4, Microsoft Clarity, Meta Pixel e LinkedIn Insight Tag podem armazenar ou processar dados em servidores fora do Brasil, inclusive nos Estados Unidos. A transferência ocorre quando o serviço está em uso: a hospedagem e, se configurada, a Formspree acompanham o acesso e o envio do formulário; as ferramentas de audiência e marketing só entram depois do consentimento da categoria correspondente. Nesses casos, os parceiros atuam como operadores e seguem instruções da NorthKeep, com exigência de salvaguardas adequadas.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">7. Cookies</h2>
        <p className="mt-3">
          Cookies são pequenos arquivos armazenados no navegador. Neste site as categorias são:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong>Necessários:</strong> a preferência de cookies fica no armazenamento local deste navegador. Não há cookie de terceiro nessa categoria, e ela não depende de consentimento.</li>
          <li><strong>Analíticos:</strong> Google Analytics 4 e Microsoft Clarity. Só são carregados se estiverem configurados e o visitante aceitar esta categoria.</li>
          <li><strong>Marketing:</strong> Meta Pixel e LinkedIn Insight Tag. Só são carregados se estiverem configurados e o visitante aceitar esta categoria.</li>
        </ul>
        <p className="mt-3">
          Na primeira visita, se alguma ferramenta opcional estiver configurada, o aviso oferece Aceitar todos, Rejeitar não essenciais e Personalizar (analíticos e marketing separados). A escolha pode ser revista pelo link Preferências de cookies no rodapé. O navegador também permite bloquear cookies de terceiros; isso pode impedir a medição, sem impedir o envio do formulário.
        </p>
        <p className="mt-3">
          O Google Analytics 4, quando passa a ser carregado, usa o Consent Mode v2. Antes da escolha, os sinais de armazenamento analítico e de publicidade ficam negados.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">8. Direitos do titular de dados</h2>
        <p className="mt-3">Nos termos da LGPD, o titular pode exercer, quando aplicável, direitos como:</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Confirmação da existência de tratamento.</li>
          <li>Acesso aos dados pessoais tratados.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Portabilidade dos dados, quando aplicável.</li>
          <li>Oposição a tratamentos realizados com fundamento específico.</li>
          <li>Eliminação de dados tratados com consentimento, ressalvadas hipóteses legais de retenção.</li>
        </ol>
        <p className="mt-3">A NorthKeep buscará atender esses direitos da melhor forma possível, observados os limites legais e regulatórios aplicáveis.</p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">9. Atualizações deste aviso</h2>
        <p className="mt-3">
          Este aviso poderá ser atualizado a qualquer momento para refletir mudanças legais, regulatórias, operacionais ou de tratamento de dados. Recomendamos consulta periódica para ciência de eventuais alterações.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">10. Contato</h2>
        <p className="mt-3">
          Solicitações, dúvidas ou esclarecimentos sobre privacidade e proteção de dados podem ser enviados para{" "}
          <a className="text-[#2B7A8E] underline" href={`mailto:${privacyEmail}`}>{privacyEmail}</a>.
        </p>
        <p className="mt-3">
          Canal do encarregado pelo tratamento de dados pessoais: o mesmo endereço de e-mail acima, até indicação formal de encarregado específico.
        </p>
        <p className="mt-6"><strong>Última atualização:</strong> {privacyUpdated}.</p>
      </main>
      <footer className="bg-[#1B4D5C] py-8 text-white">
        <div className="container mx-auto flex flex-col gap-3 px-4 text-sm text-gray-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Northkeep. Todos os direitos reservados.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <CookiePreferencesButton className="text-left hover:text-white" />
          </div>
        </div>
      </footer>
    </div>
  );
}
