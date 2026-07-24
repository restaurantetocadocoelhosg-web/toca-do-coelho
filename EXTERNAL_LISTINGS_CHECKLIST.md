# Checklist de Listagens Externas — Restaurante Toca do Coelho

Nenhum destes itens pode ser corrigido só com código — todos exigem login/acesso às plataformas. Marcados com o que já foi verificado hoje (✅) e o que falta conferir (⬜).

## 1. Google Business Profile — PRIORIDADE MÁXIMA

**Já auditado e corrigido em 24/07/2026** (mesma sessão):
- ✅ Categoria principal: Restaurante self-service
- ✅ Descrição reescrita (mais completa)
- ✅ Atributo "Drive-through" corrigido (estava errado, marcado Sim quando é Não)
- ✅ Horários especiais de feriado cadastrados (7/9, 12/10, 2/11 = 11h-16h; 25/12 e 1/1 = Fechado)
- ✅ Cardápio estruturado com 9 pratos mais pedidos (Lasanha Bolonhesa, Filé de Frango Grelhado, Feijão Tropeiro, Frango Assado, Parmegiana de Frango, Feijoada, Carne Assada, Linguiça Mineira, Fricassê de Frango, Nhoque)
- ✅ Endereço/telefone/site conferem com o que está aqui
- ⬜ Fotos de vitrine/cardápio/pratos específicas (o Google pede 3 slots — já existem fotos boas na galeria, mas o Google quer categorias específicas preenchidas; precisa de fotos originais sem texto/logo pra eu subir)
- ⬜ Responder avaliações (396 avaliações, 4,8★ — ótima nota, mas não sei quantas têm resposta do dono)

## 2. Bing Places for Business
- ⬜ Verificar se existe cadastro
- ⬜ Se não existir: criar, ou importar direto do Google Business Profile (Bing tem essa opção)
- ⬜ Conferir nome, categoria, endereço, telefone, site, horários batendo com `business.json`

## 3. Apple Business Connect
- ⬜ Verificar se existe cadastro (afeta Apple Maps e Siri)
- ⬜ Se não existir: criar em https://businessconnect.apple.com
- ⬜ Conferir mesmos dados

## 4. Tripadvisor
- ✅ Já tem listagem: "RESTAURANTE TOCA DO COELHO, Sao Goncalo" (achado numa busca)
- ⬜ Confirmar se o dono tem acesso pra gerenciar (reivindicar o perfil se ainda não reivindicado)
- ⬜ Conferir site oficial está linkado (não um link antigo/Linktree)
- ⬜ Conferir categoria (não deixar cair como "lanchonete"/"cafeteria")

## 5. Restaurant Guru
- ✅ Já tem listagem (achado numa busca: restaurantguru.com/Restaurante-ToCa-do-Coelho-Sao-Goncalo)
- ⬜ Conferir dados batendo, cardápio atualizado

## 6. Instagram (@restaurante.tocadocoelho)
- ✅ Ativo, 16,1 mil seguidores, bio com info correta
- ⚠️ **Achado em sessão anterior:** último post real foi há quase 3 semanas (hiato) — recomendo retomar postagem regular, ajuda também a busca por IA (conteúdo fresco é sinal de relevância)
- ⬜ Conferir se o link da bio aponta pro site oficial (não Linktree)

## 7. Facebook
- ✅ Existe página: "Restaurante Toca do Coelho | São Gonçalo RJ" (achado numa busca)
- ⬜ Confirmar se o dono gerencia, conferir dados

## 8. iFood
- ✅ Link testado hoje, funcionando (HTTP 200)
- ⬜ Conferir se o cardápio/preços no iFood batem com `business.json` (o iFood tem preços próprios por prato, diferente do buffet a quilo — vale conferir se está tudo certo)

## 9. 99Food
- ✅ Link testado hoje, funcionando (HTTP 200)
- ⬜ Mesma conferência do item 8

## 10. Waze e outros mapas
- ⬜ Conferir pino no Waze (geralmente sincroniza com Google, mas vale checar)

## 11. Guias locais com dados antigos (achados em busca hoje)
Sites que aparecem em buscas mas eu **não posso editar** (não são nossos):
- `cnpj.biz`, `econodata.com.br`, `cnpj.info` — mostram o endereço legal do CNPJ (Colubande) — ver item A1 do `SEO_AUDIT.md`. Só muda se o cadastro na Receita Federal mudar.
- Existem outros estabelecimentos parecidos que podem confundir buscas: "Toca dos Coelhos" (bar, 4,9★/49 avaliações) e "Bar toca do Coelho" — não são a mesma empresa. Não precisa fazer nada, é só pra você saber que existe confusão de nome possível.

## 12. Divergências públicas já detectadas (resumo)
| Dado | Nossa fonte oficial (GBP/site) | Divergência encontrada | Onde |
|---|---|---|---|
| Bairro | Coelho | Colubande | CNPJ (Econodata, cnpj.biz) |
| CEP | 24750-575 | 24.744-560 | CNPJ (Econodata, cnpj.biz) |
| Preço | R$ 64,99 / 89,99 por kg | R$ 59,99 / 74,99 / 89,99 (3 faixas antigas) | Já corrigido no site e no bot hoje — conferir se aparece desatualizado em algum guia externo |

---

**Como usar este checklist:** ao conferir cada item, atualize o ✅/⬜ e, se achar divergência nova, anote em `business.json` no campo relevante antes de corrigir na plataforma externa — isso mantém a fonte única de verdade sincronizada.
