# Northkeep — site institucional

Site estático da [Northkeep](https://www.northkeep.com.br), consultoria de gestão, business intelligence e indicadores em Joinville/SC. Apresenta os produtos públicos e um formulário de contato.

| Produto | Endereço |
| --- | --- |
| ONE (inteligência estratégica) | [conheca.one.northkeep.com.br](https://conheca.one.northkeep.com.br/) · app [one.northkeep.com.br](https://one.northkeep.com.br/) |
| NK Action (planos de ação e indicadores) | [action.northkeep.com.br](https://action.northkeep.com.br/) |
| NK Diagnóstico (análise de aderência, login) | [diagnostico.northkeep.com.br](https://diagnostico.northkeep.com.br/) |

O build é Vite + React e gera só arquivos estáticos. Não há servidor, banco, login nem dependência da plataforma em que o projeto foi gerado.

Não reescrever a política de privacidade, os dados de contato, o “+20 anos” nem outros fatos de história da empresa. Não colocar preço nem condição comercial interna. O convite comercial fica aberto: sem piso de porte, faturamento ou segmento.

## Rodar localmente

Requer Node 22 e pnpm 10.

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:5173/`. O padrão é a raiz, a mesma de `www.northkeep.com.br`. Para a URL antiga do repositório:

```bash
VITE_BASE_PATH=/northkeep-site/ pnpm dev
```

```bash
pnpm test
pnpm build
pnpm preview
```

O preview também usa o `base` do build. Com o padrão, a URL é `http://localhost:4173/`.

Copie `.env.example` para `.env.local` se quiser simular formulário ou analytics. `.env.local` não entra no git.

## Variáveis de build

São variáveis de repositório do GitHub Actions (**Settings → Secrets and variables → Actions → Variables**), não secrets: os IDs de analytics ficam visíveis no JavaScript publicado. Valor vazio, ausente ou fora do formato esperado desliga a ferramenta (o GA4 precisa ser `G-…`; Pixel e LinkedIn, só dígitos). Nada disso é commitado com ID real.

| Variável | Efeito |
| --- | --- |
| `VITE_BASE_PATH` | `base` do Vite. Padrão `/`, a raiz de `www.northkeep.com.br`. A URL antiga do repositório usa `/northkeep-site/`. |
| `VITE_FORMSPREE_ENDPOINT` | URL `https://…` que substitui o Formspree padrão (`https://formspree.io/f/meaazpdb`, o mesmo da land do ONE). Vazia: o padrão continua. O `mailto` só abre se o POST falhar. |
| `VITE_CONTACT_EMAIL` | Destino do `mailto` quando o POST falha. Vazia: `contato@northkeep.com.br`, o endereço já impresso na página. |
| `VITE_GA4_ID` | Measurement ID do GA4 (`G-…`). O gtag só carrega depois do consentimento analítico. |
| `VITE_CLARITY_ID` | Projeto Microsoft Clarity. Mesma categoria analítica. |
| `VITE_META_PIXEL_ID` | Meta Pixel (só dígitos). Só carrega depois do consentimento de marketing. |
| `VITE_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag (só dígitos). Mesma categoria de marketing. |

Sem nenhum ID de analytics ou marketing, o aviso de cookies não aparece. Com ID, o script correspondente espera a categoria aceita (analíticos: GA4 e Clarity; marketing: Meta Pixel e LinkedIn). O GA4 usa Consent Mode v2, com armazenamento negado até essa aceitação. Um envio bem-sucedido para o Formspree dispara o evento GA4 `generate_lead` e o evento Meta `Lead` só se essas ferramentas já tiverem sido aceitas. O fallback `mailto` não dispara esses eventos.

A política fica em `/privacidade` e em `/privacidade.html`. O canal dos direitos do titular e do encarregado (Stanley Eliel Ulrich) é `privacidade@northkeep.com.br`. A identificação do controlador está em `client/src/lib/site.ts`.

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` roda em push na `main` (e manualmente). Ele testa, faz o build com as variáveis acima e publica com `actions/deploy-pages`.

1. **Settings → Pages → Source = GitHub Actions**.
2. Preencha as variáveis que forem usadas. Sem elas o site sobe do mesmo jeito: sem analytics e com o contato por e-mail.
3. O workflow faz o build com `VITE_BASE_PATH=/` e publica o artefato com `CNAME`. Depois do DNS, o site responde em `https://www.northkeep.com.br`.

## Domínio www.northkeep.com.br

O repositório já sai pronto para esse host:

1. O workflow define `VITE_BASE_PATH=/`. Os assets ficam na raiz, sem `/northkeep-site/`.
2. `client/public/CNAME` tem uma linha, `www.northkeep.com.br`. O Vite copia o arquivo para `dist/`.
3. O build grava `dist/404.html` como cópia de `index.html`. O GitHub Pages entrega esse arquivo quando a rota não existe, e o React abre `/privacidade` no acesso direto. `dist/privacidade.html` cobre o mesmo caminho com extensão.
4. A canonical e o `og:url` apontam para `https://www.northkeep.com.br/`. Em `/privacidade`, o React troca as duas para `https://www.northkeep.com.br/privacidade`.

No DNS da zona `northkeep.com.br`, deixe o registro em DNS only (sem proxy), para o GitHub emitir o certificado:

- `www` como **CNAME** para `nk-northkeep.github.io`
- se o apex `northkeep.com.br` também precisar responder, use os registros **A** `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` e os **AAAA** `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`, ou um redirecionamento do apex para `www`

Em **Settings → Pages**, o domínio acompanha o `CNAME` do artefato. Confirme o HTTPS depois que o DNS propagar. Só então desligue o site antigo no host atual.

Preços do NK Action não são copiados aqui. A página de planos é [action.northkeep.com.br/#planos](https://action.northkeep.com.br/#planos).
