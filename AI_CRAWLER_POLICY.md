# Política de Crawlers de IA — Restaurante Toca do Coelho

Este documento separa dois grupos de robôs bem diferentes que às vezes se confundem, e explica a decisão tomada em `robots.txt`.

## Grupo 1 — Busca e descoberta (LIBERADOS)

Esses robôs existem pra responder perguntas de usuários em tempo real (ex.: "restaurante perto de mim"). Bloqueá-los reduz a chance do restaurante aparecer em respostas de IA. Estão todos com `Allow: /` no `robots.txt`:

| Robô | Empresa | Função |
|---|---|---|
| Googlebot | Google | Indexação da Busca e Maps |
| Bingbot | Microsoft | Indexação do Bing/Copilot |
| OAI-SearchBot | OpenAI | Busca em tempo real do ChatGPT |
| ChatGPT-User | OpenAI | Navegação ao vivo disparada por um usuário no ChatGPT |
| Claude-SearchBot | Anthropic | Busca em tempo real do Claude |
| Claude-User | Anthropic | Navegação ao vivo disparada por um usuário no Claude |
| PerplexityBot | Perplexity | Indexação pra respostas do Perplexity |
| Perplexity-User | Perplexity | Navegação ao vivo disparada por um usuário no Perplexity |

## Grupo 2 — Treinamento de modelos (DECISÃO PENDENTE DO DONO)

Esses robôs coletam conteúdo pra treinar modelos de IA no futuro — não respondem a uma busca específica de um cliente agora. Não bloqueei nem liberei explicitamente nenhum deles no `robots.txt` (o wildcard geral `Allow: /` no topo do arquivo tecnicamente os permite, mas isso é o padrão anterior, não uma decisão nova).

| Robô | Empresa | Função |
|---|---|---|
| GPTBot | OpenAI | Coleta de dados de treinamento |
| ClaudeBot | Anthropic | Coleta de dados de treinamento |
| Google-Extended | Google | Controla uso do conteúdo p/ treinar Gemini (separado do Googlebot de busca) |
| Applebot-Extended | Apple | Controla uso do conteúdo p/ treinar modelos da Apple (Siri, etc. — separado do Applebot de indexação) |

### O que considerar antes de decidir
- **Bloquear treinamento não afeta a Busca/Maps/IA de busca** — são flags separadas dos robôs do Grupo 1.
- **Argumento pra liberar:** mais chance do restaurante ser mencionado organicamente quando alguém pergunta a um assistente de IA sobre restaurantes em São Gonçalo (esses modelos aprendem com o conteúdo coletado).
- **Argumento pra bloquear:** o conteúdo do site (fotos, textos, cardápio) é usado pra treinar modelos comerciais sem retorno direto pro restaurante.
- Essa é uma decisão de **valor de negócio**, não de SEO técnico — por isso não decidi sozinho.

### Como bloquear (se decidir isso)
Adicionar ao final do `robots.txt`:
```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /
```

## Verificação

Pra confirmar que um crawler específico consegue acessar o site, teste com o header `User-Agent`:
```
curl -A "Googlebot" -I https://www.restaurantetocadocoelhosg.com.br/
```
Deve retornar `200 OK` sem `X-Robots-Tag: noindex`.
