# Northkeep — site institucional

Site estático da [Northkeep](https://www.northkeep.com.br), consultoria de gestão, business intelligence e indicadores em Joinville/SC. Apresenta os produtos públicos e um formulário de contato.

| Produto | Endereço |
| --- | --- |
| ONE (inteligência estratégica) | [conheca.one.northkeep.com.br](https://conheca.one.northkeep.com.br/) · app [one.northkeep.com.br](https://one.northkeep.com.br/) |
| NK Action (planos de ação e indicadores) | [action.northkeep.com.br](https://action.northkeep.com.br/) |
| NK Diagnóstico (análise de aderência, login) | [diagnostico.northkeep.com.br](https://diagnostico.northkeep.com.br/) |

O build é Vite + React e gera só arquivos estáticos. Não há servidor, banco, login nem dependência da plataforma em que o projeto foi gerado.

## Rodar localmente

Requer Node 22 e pnpm 10.

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:5173/northkeep-site/` — esse é o caminho padrão do GitHub Pages do repositório. Para a raiz:

```bash
VITE_BASE_PATH=/ pnpm dev
```

```bash
pnpm test
pnpm build
pnpm preview
```

O preview também usa o `base` do build. Com o padrão, a URL é `http://localhost:4173/northkeep-site/`.

Copie `.env.example` para `.env.local` se quiser simular formulário ou analytics. `.env.local` não entra no git.

## Variáveis de build

São variáveis de repositório do GitHub Actions (**Settings → Secrets and variables → Actions → Variables**), não secrets: os IDs de analytics ficam visíveis no JavaScript publicado. Valor vazio, ausente ou fora do formato esperado desliga a ferramenta (o GA4 precisa ser `G-…`; Pixel e LinkedIn, só dígitos). Nada disso é commitado com ID real.

| Variável | Efeito |
| --- | --- |
| `VITE_BASE_PATH` | `base` do Vite. Padrão `/northkeep-site/`. No domínio próprio, `/`. |
| `VITE_FORMSPREE_ENDPOINT` | URL `https://…` do Formspree. Vazia: o formulário abre um `mailto`. |
| `VITE_CONTACT_EMAIL` | E-mail exibido e usado no `mailto`. Vazia: `comercial@northkeep.com.br`. |
| `VITE_GA4_ID` | Measurement ID do GA4 (`G-…`). Carrega o gtag. |
| `VITE_CLARITY_ID` | Projeto Microsoft Clarity. |
| `VITE_META_PIXEL_ID` | Meta Pixel (só dígitos). |
| `VITE_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag (só dígitos). |

Um envio bem-sucedido para o Formspree dispara o evento GA4 `generate_lead` e o evento Meta `Lead`, se os respectivos IDs estiverem no build. O fallback `mailto` não dispara esses eventos.

O GA4 sobe pelo gtag da própria página, com um `page_view`. Se no futuro houver um GTM neste domínio, não crie outra tag GA4 para o mesmo measurement ID.

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` roda em push na `main` (e manualmente). Ele testa, faz o build com as variáveis acima e publica com `actions/deploy-pages`.

1. **Settings → Pages → Source = GitHub Actions**.
2. Preencha as variáveis que forem usadas. Sem elas o site sobe do mesmo jeito: sem analytics e com o contato por e-mail.
3. A URL temporária é `https://nk-northkeep.github.io/northkeep-site/`.

Não há arquivo `CNAME` de propósito. O DNS de `www.northkeep.com.br` só muda depois da aprovação do cutover.

## Passar para www.northkeep.com.br

Quando o cutover for aprovado:

1. Crie a variável `VITE_BASE_PATH` com o valor `/` e rode o workflow de novo (ou faça um push em `main`). Sem isso os assets continuam em `/northkeep-site/` e quebram na raiz do domínio.
2. Adicione um arquivo `CNAME` na raiz do site publicado com uma única linha: `www.northkeep.com.br`. O jeito simples é colocar `client/public/CNAME` (o Vite copia para `dist/`) e publicar de novo.
3. Em **Settings → Pages**, confirme o custom domain `www.northkeep.com.br` e o HTTPS.
4. No DNS da zona `northkeep.com.br`, aponte o host para o GitHub Pages e deixe o registro em DNS only (sem proxy), para o GitHub emitir o certificado:
   - `www` como **CNAME** para `nk-northkeep.github.io`
   - se o apex `northkeep.com.br` também precisar responder, use os registros **A** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` e os **AAAA** `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`, ou um redirecionamento do apex para `www`
5. Só então remova o site antigo do host atual. Enquanto o `CNAME` do GitHub não existir, o domínio continua onde está.

Preços do NK Action não são copiados aqui. A página de planos é [action.northkeep.com.br/#planos](https://action.northkeep.com.br/#planos).
