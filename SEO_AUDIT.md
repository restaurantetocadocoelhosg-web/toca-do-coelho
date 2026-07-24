# Auditoria de SEO — Restaurante Toca do Coelho

**Data:** 24/07/2026
**Domínio:** https://www.restaurantetocadocoelhosg.com.br/
**Escopo real do projeto:** site estático (1 página, HTML/CSS/JS puro), hospedado no GitHub Pages, sem framework, sem build, sem CI, sem suíte de testes automatizada. Este relatório foi adaptado a essa realidade — itens que pressupõem `src/`, build pipeline, Lighthouse CI etc. foram reformulados ou marcados como "não se aplica" em vez de fabricar infraestrutura que não existe.

## Resumo executivo

O site já estava em bom estado técnico antes desta rodada (schema.org completo com FAQPage, meta tags corretas, redirects limpos, HTTPS forçado, Search Console verificado). O problema real e mais urgente — **preço desatualizado em 6 lugares, incluindo o JSON-LD que a IA do Google cita literalmente** — já foi corrigido hoje, antes desta auditoria formal. Esta rodada focou em: dados estruturados mais ricos, uma fonte única de verdade, política de crawlers de IA, correção de um bug real de dimensão de imagem, e documentação de pendências externas.

Nenhum problema **crítico** foi encontrado hoje (o que teria sido crítico — preço errado no schema — já estava resolvido).

---

## Achados por severidade

### Alto

| # | Problema | Local | Impacto | Correção | Corrigível no código? | Status |
|---|---|---|---|---|---|---|
| A1 | Divergência de bairro/CEP: CNPJ registra "Colubande, 24.744-560"; Google Business Profile e Plus Code registram "Coelho, 24750-575" (fontes: Econodata, cnpj.biz vs. Google Maps ao vivo, checado hoje) | Cadastro CNPJ vs. GBP/site | NAP (nome-endereço-telefone) inconsistente entre fontes é sinal negativo de confiança pro Google e pra IA | Confirmar com o dono qual é o bairro real de operação; reconciliar o cadastro do CNPJ OU aceitar a divergência (comum em fronteiras de bairro) | Não — depende de decisão humana + possível ação na Receita Federal/CNPJ | **Pendente — não decidi sozinho, ver `business.json` campo `_pendingConfirmation`** |

### Médio

| # | Problema | Local | Impacto | Correção | Corrigível no código? | Status |
|---|---|---|---|---|---|---|
| M1 | Google Analytics 4 não está instalado | index.html | Sem GA4 não dá pra medir comportamento no site (cliques em botões, tempo na página) — só dá pra usar dados do Search Console (impressões/cliques de busca) | Criar propriedade GA4 no Google Analytics e inserir o Measurement ID real | Sim, mas **não posso inventar um ID** — precisa que o dono crie a propriedade e me passe o ID | **Pendente — aguardando ID real** |
| M2 | Imagens em JPEG, não WebP/AVIF | `img/*.jpg` (9 arquivos, ~1,95MB no total) | Formatos modernos cortariam ~30-50% do peso, melhorando LCP no celular | Converter pra WebP com fallback `<picture>` | Sim | Não feito nesta rodada — recomendado como próximo passo (ver Plano 30/60/90) |
| M3 | Site é uma única página (sitemap.xml só tem 1 URL) | Arquitetura geral | Menos superfície pra aparecer em buscas de cauda longa (ex. "cardápio Toca do Coelho", "marmitas fit São Gonçalo") | Avaliar criar página `/cardapio/` com conteúdo genuíno (o prompt original sugeria várias páginas — ver seção "Não feito de propósito" abaixo) | Sim, mas requer decisão de conteúdo | Recomendado, não feito (evitar página vazia/duplicada) |
| M4 | Sem cabeçalho HSTS explícito | Resposta HTTP do domínio | Pequena lacuna de segurança de transporte (HTTPS já é forçado, isso é só o header adicional) | GitHub Pages custom domain não permite headers customizados — limitação da hospedagem, não do código | Não — limitação da plataforma | Não corrigível sem trocar de hospedagem |

### Baixo (já corrigidos nesta rodada)

| # | Problema | Local | Impacto | Correção aplicada | Status |
|---|---|---|---|---|---|
| B1 | 4 imagens com `height` declarado errado (1575px) vs. real (1599px) | `prato-bacalhau-rechaud.jpg`, `prato-costela.jpg`, `buffet-feijoada.jpg`, `marmitas-congeladas.jpg` | Pequena distorção de proporção + risco de CLS (Cumulative Layout Shift) | `height` corrigido pro valor real medido (1599) | ✅ Corrigido (commit `20b38a2`) |
| B2 | JSON-LD sem coordenadas geográficas (`geo`) | index.html, schema Restaurant | Menos precisão pra buscas "perto de mim" baseadas em geolocalização | Adicionado `GeoCoordinates` extraído do próprio Place ID já usado no schema (`-22.8306368, -43.0026438`) | ✅ Corrigido (commit `20b38a2`) |
| B3 | Sem propriedade `menu` no schema Restaurant | index.html | Menos contexto estruturado pra IA achar "cardápio" | Adicionado apontando pra `#buffet` (única seção de cardápio publicada hoje) | ✅ Corrigido (commit `20b38a2`) |
| B4 | Sem schema `WebSite` | index.html | Falta o objeto que representa o site como entidade (distinto do negócio) | Adicionado bloco `WebSite` mínimo, sem duplicar `Restaurant` | ✅ Corrigido (commit `20b38a2`) |
| B5 | `robots.txt` só tinha wildcard genérico, sem menção explícita a bots de busca por IA | robots.txt | Funcionava (wildcard já libera geral), mas sem documentação clara da intenção | Adicionadas entradas nomeadas pros bots de busca (Google, Bing, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) | ✅ Corrigido (commit `95faab6`) |
| B6 | Sem fonte única de dados comerciais | (inexistente) | Risco de divergência entre preço/horário exibidos e o real, como já aconteceu (preço desatualizado) | Criado `business.json` + `scripts/check-consistency.js` (testado, roda sem dependências) | ✅ Criado |

### Já estava correto (verificado, não mexido)

- Redirects: **todas** as combinações (http/https × com/sem www) caem em `https://www.` com 301 único, sem cadeia — testado com `curl -I` hoje.
- Sem `X-Robots-Tag` bloqueando nada.
- `robots.txt` já permitia tudo (`Allow: /`) e apontava o sitemap correto.
- `sitemap.xml` retorna 200, XML válido, `lastmod` atualizado hoje.
- Canonical único, meta title/description/OG/Twitter-equivalentes presentes e não genéricos.
- H1 único por página (`Toca do Coelho`), hierarquia H2/H3 organizada por seção.
- Todas as imagens têm `alt` descritivo (prato, ambiente, contexto) e `loading="lazy"` (exceto a hero, que é `preload` com `fetchpriority="high"` corretamente, pro LCP).
- Schema `Restaurant` já tinha endereço, telefone, `openingHoursSpecification`, `priceRange`, `paymentAccepted`, `sameAs` — só faltavam `geo` e `menu` (corrigido acima).
- Schema `FAQPage` com 8 perguntas reais, respostas batendo com o texto visível da página.
- Google Search Console verificado (meta tag presente).
- Todos os links externos testados hoje retornam 200 (iFood, 99Food, Instagram, portfólio de marmitas).
- Nenhum `AggregateRating` inventado no schema — e não vamos adicionar um, mesmo sabendo que o Google mostra 4,8★/396 avaliações, porque essas avaliações não estão hospedadas no nosso domínio (contra as diretrizes do próprio Google de dados estruturados).

---

## O que o prompt original pedia e NÃO foi feito de propósito

O prompt original foi escrito pra um projeto com framework/build system (`src/data/business.ts`, testes automatizados, Lighthouse CI, múltiplas páginas de rota). Adaptações conscientes:

- **Não criei `/restaurante-em-sao-goncalo/`, `/buffet-a-quilo/`, `/delivery/`, `/contato/` etc.** O prompt avisa explicitamente para não criar "páginas vazias ou quase duplicadas" — como o conteúdo de cada uma dessas seções já vive bem na página única (com âncoras `#buffet`, `#delivery` etc.), criar páginas separadas agora seria conteúdo fino/duplicado. **Exceção que recomendo**: uma página `/cardapio/` dedicada tem conteúdo genuíno o suficiente (o buffet muda diariamente, tem destaques semanais) — deixo como recomendação pro plano de 30 dias, não fiz sem validar convosco.
- **Não rodei Lighthouse/CI** porque não existe pipeline configurado. Fiz uma auditoria manual equivalente (curl pra redirects/headers, Python/Pillow pra dimensões de imagem, teste de links).
- **Não criei testes automatizados em CI** (não há test runner). Criei `scripts/check-consistency.js`, um script Node simples (zero dependências) que roda manualmente e falha com código de saída 1 se achar divergência — testei rodando contra o site ao vivo agora, passou.
- **Não instalei IndexNow** — exigiria gerar uma chave e publicá-la (arquivo público `{chave}.txt` na raiz) e depois integrar o envio a cada mudança. Como não há processo de build/deploy automatizado que dispare isso, ficaria como uma chamada manual — documentado como próximo passo, não implementado às cegas.
- **Não instalei GA4** — exigiria um Measurement ID real que só o dono pode gerar (não vou inventar/colocar placeholder ativo).

---

## Comandos usados para testar (reprodutíveis)

```bash
# Redirects
curl -I http://restaurantetocadocoelhosg.com.br/
curl -I https://restaurantetocadocoelhosg.com.br/
curl -I http://www.restaurantetocadocoelhosg.com.br/
curl -I https://www.restaurantetocadocoelhosg.com.br/

# robots.txt / sitemap
curl https://www.restaurantetocadocoelhosg.com.br/robots.txt
curl https://www.restaurantetocadocoelhosg.com.br/sitemap.xml

# Consistência de dados (rodar sempre que mudar preço/horário/telefone)
node scripts/check-consistency.js
```

## Próximo passo imediato recomendado

Ver `EXTERNAL_LISTINGS_CHECKLIST.md` para o que precisa de ação humana fora do código (Google Business Profile, Tripadvisor, Bing Places, etc.) e o plano de 30/60/90 dias no final deste documento.

---

## Plano de acompanhamento

**30 dias:**
- Confirmar bairro/CEP oficial (item A1) e decidir se reconcilia o CNPJ.
- Decidir política de bots de treinamento de IA (ver `AI_CRAWLER_POLICY.md`).
- Criar propriedade GA4 e me passar o Measurement ID pra eu instalar.
- Submeter o site no Bing Webmaster Tools (ver `EXTERNAL_LISTINGS_CHECKLIST.md`).

**60 dias:**
- Avaliar criação da página `/cardapio/` com conteúdo real (destaques semanais, atualização visível).
- Converter as 9 imagens pra WebP com fallback.
- Revisar se `business.json` precisa de campos novos conforme o site cresce.

**90 dias:**
- Reavaliar métricas do Search Console (impressões, cliques, posição média pras consultas-alvo listadas no prompt original).
- Reconferir consistência das listagens externas (Tripadvisor, Bing, Apple Maps) contra o checklist.
