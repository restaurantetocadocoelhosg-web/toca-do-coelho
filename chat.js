/* Chat de dúvidas rápidas — Restaurante Toca do Coelho
   Responde na hora com dados oficiais; fora disso, encaminha ao WhatsApp (bot Sr. Coelho). */
(function () {
  'use strict';

  const CFG = {
    nome: 'Toca do Coelho',
    saudacao: 'Olá! 🐰 Sou o assistente da Toca do Coelho. Pergunta rapidinha? Toca num botão ou escreve aí embaixo!',
    corTopo: 'linear-gradient(135deg,#5b1619,#2d0b0d)',
    corAcento: '#c9982f',
    whatsapp: '5521997912517',
    chips: ['Horários', 'Preço do quilo', 'Endereço', 'Delivery', 'Marmitas fit', 'Reservas'],
    semResposta: 'Boa pergunta! Essa eu deixo com a equipe — clica abaixo que o nosso atendimento no WhatsApp responde rapidinho. 👇',
    base: [
      { k: ['horario', 'hora', 'abre', 'fecha', 'funciona', 'aberto', 'feriado', 'domingo', 'segunda'],
        r: 'Funcionamos TODOS os dias no almoço:\n• Seg a qui: 11h às 15h30\n• Sex a dom: 11h às 16h\n• Feriados: normal 🎉' },
      { k: ['preco', 'quilo', 'kg', 'valor', 'custa', 'quanto'],
        r: 'Preço do quilo:\n• Seg a qui: R$ 59,99/kg\n• Sex e sáb: R$ 74,99/kg\n• Dom e feriados: R$ 89,99/kg\nSelf-service à vontade, você paga pelo peso! 🍽️' },
      { k: ['endereco', 'onde', 'fica', 'local', 'chegar', 'rua', 'mapa'],
        r: 'Estamos na Rua Capitão Juvenal Figueiredo, 71 — bairro Coelho, São Gonçalo/RJ (junto à RJ-104). Tem espaço pra estacionar em frente! 📍',
        link: ['Abrir no Google Maps', 'https://www.google.com/maps/search/?api=1&query=Restaurante%20Toca%20do%20Coelho&query_place_id=ChIJy973t4uRmQARQXr3mZFOpjg'] },
      { k: ['delivery', 'entrega', 'ifood', '99', 'pedir em casa', 'entregam'],
        r: 'Nosso delivery é pelo iFood e 99Food! 🛵',
        link: ['Pedir no iFood', 'https://www.ifood.com.br/delivery/sao-goncalo-rj/restaurante-toca-do-coelho-coelho/7eb56d39-81ed-4cf2-a819-f783c159f23a'] },
      { k: ['marmita', 'fit', 'congelada', 'semana'],
        r: 'Temos marmitas fit congeladas de 350g pra organizar sua semana! É só aquecer. Pedidos pelo WhatsApp. 🥗',
        link: ['Ver portfólio de marmitas', 'https://restaurantetocadocoelhosg-web.github.io/marmitas/'] },
      { k: ['reserva', 'reservar', 'mesa', 'aniversario', 'evento', 'festa'],
        r: 'No dia a dia atendemos por ordem de chegada, sem reserva. Para EVENTOS e datas especiais, fala com a gente no WhatsApp que organizamos tudo! 🎈' },
      { k: ['pagamento', 'cartao', 'pix', 'vale', 'voucher', 'alelo', 'ticket', 'vr', 'pluxee', 'aceita'],
        r: 'Aceitamos crédito, débito, Pix, dinheiro e vale-refeição (Alelo, Ticket, VR, Pluxee e outras bandeiras — confirma a sua na chegada). 💳' },
      { k: ['cardapio', 'prato', 'comida', 'menu', 'serve', 'buffet', 'feijoada', 'churrasco', 'frutos do mar', 'peixe'],
        r: 'Somos self-service a quilo com cardápio variado todos os dias! Trabalhamos com grelhados, assados, tortas quentes, massas, saladas diversas e muito mais. Aos domingos também temos frutos do mar. O cardápio muda diariamente para trazer sempre novidades. Venha nos visitar e se surpreenda! 🍲\n(E sexta é dia de feijoada!)' },
      { k: ['bebida', 'refrigerante', 'suco', 'cerveja', 'trazer'],
        r: 'Temos sucos em copo e jarra e refrigerantes até 500ml (alguns sabores). Não é permitido trazer bebida de fora, tá? 🧃' },
      { k: ['estacionamento', 'estacionar', 'carro', 'vaga'],
        r: 'Não temos estacionamento próprio, mas há espaço em frente ao restaurante. Como a RJ-104 tem bastante fluxo, vale chegar com antecedência. 🚗' },
      { k: ['trabalhe', 'trabalhar', 'emprego', 'vaga de', 'curriculo'],
        r: 'Que bom que quer trabalhar com a gente! Manda seu currículo pelo WhatsApp que a equipe te orienta. 💼' }
    ]
  };

  /* ============ motor do chat (compartilhado) ============ */
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function responder(texto) {
    const t = norm(texto);
    let melhor = null, pts = 0;
    for (const item of CFG.base) {
      const hits = item.k.filter(k => t.includes(norm(k))).length;
      if (hits > pts) { pts = hits; melhor = item; }
    }
    return melhor;
  }

  const css = `
  .rpchat-btn{position:fixed;right:18px;bottom:18px;z-index:9998;width:58px;height:58px;border-radius:999px;border:none;background:#25d366;color:#fff;display:grid;place-items:center;box-shadow:0 12px 28px rgba(0,0,0,.4);cursor:pointer;transition:transform .18s}
  .rpchat-btn:hover{transform:translateY(-3px) scale(1.04)}
  .rpchat-btn svg{width:30px;height:30px}
  .rpchat-hint{position:fixed;right:84px;bottom:30px;z-index:9998;background:#fff;color:#222;font:600 12px/1.3 Inter,system-ui,sans-serif;padding:8px 12px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.3);animation:rpchat-pop .4s ease}
  .rpchat-hint:after{content:"";position:absolute;right:-6px;top:50%;transform:translateY(-50%);border:6px solid transparent;border-left-color:#fff;border-right:none}
  @keyframes rpchat-pop{from{opacity:0;transform:translateY(8px)}to{opacity:1}}
  .rpchat-panel{position:fixed;right:18px;bottom:88px;z-index:9999;width:min(370px,calc(100vw - 24px));max-height:min(560px,calc(100vh - 110px));display:none;flex-direction:column;background:#fffdf8;border-radius:20px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif}
  .rpchat-panel.aberto{display:flex}
  .rpchat-head{padding:14px 16px;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:10px}
  .rpchat-head b{font-size:15px}
  .rpchat-head small{display:block;font-weight:400;font-size:11px;opacity:.85}
  .rpchat-x{background:rgba(255,255,255,.15);border:none;color:#fff;width:30px;height:30px;border-radius:99px;cursor:pointer;font-size:15px;line-height:1}
  .rpchat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(180deg,#f7f2e9,#fffdf8)}
  .rpchat-m{max-width:85%;padding:10px 13px;border-radius:15px;font-size:13.5px;line-height:1.45;white-space:pre-line;animation:rpchat-pop .25s ease}
  .rpchat-m.bot{background:#fff;color:#2a2a2a;border:1px solid rgba(0,0,0,.08);border-bottom-left-radius:5px;align-self:flex-start;box-shadow:0 2px 8px rgba(0,0,0,.05)}
  .rpchat-m.eu{background:#dcf8c6;color:#1c2b17;border-bottom-right-radius:5px;align-self:flex-end}
  .rpchat-m a.rpchat-link{display:inline-block;margin-top:8px;font-weight:700;font-size:12.5px;text-decoration:none;padding:8px 12px;border-radius:10px;color:#fff}
  .rpchat-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px;background:#fffdf8}
  .rpchat-chip{border-radius:99px;padding:7px 12px;font:600 12px Inter,system-ui,sans-serif;cursor:pointer;background:#fff;transition:.15s}
  .rpchat-in{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(0,0,0,.08);background:#fff}
  .rpchat-in input{flex:1;border:1px solid rgba(0,0,0,.15);border-radius:12px;padding:10px 12px;font:400 13.5px Inter,system-ui,sans-serif;outline:none}
  .rpchat-send{border:none;border-radius:12px;width:42px;color:#fff;cursor:pointer;font-size:16px}
  .rpchat-wa{display:flex;align-items:center;justify-content:center;gap:8px;margin:6px 14px 12px;padding:11px;border-radius:12px;background:#25d366;color:#063a1e;font:800 13px Inter,system-ui,sans-serif;text-decoration:none}
  @media (max-width:640px){
    .rpchat-panel{right:0;left:0;bottom:0;width:100%;max-width:none;max-height:88vh;max-height:88dvh;border-radius:18px 18px 0 0}
    .rpchat-msgs{min-height:180px}
    .rpchat-in input{font-size:16px}
    .rpchat-btn{right:14px;bottom:14px}
    .rpchat-hint{right:80px;bottom:26px}
  }
  `;

  function init() {
    const style = document.createElement('style');
    style.textContent = css +
      `.rpchat-head{background:${CFG.corTopo}}` +
      `.rpchat-chip{border:1px solid ${CFG.corAcento};color:#5b4310}` +
      `.rpchat-chip:hover{background:${CFG.corAcento};color:#fff}` +
      `.rpchat-send{background:${CFG.corAcento}}` +
      `.rpchat-m a.rpchat-link{background:${CFG.corAcento}}`;
    document.head.appendChild(style);

    const antigo = document.querySelector('.wpp-float');
    if (antigo) antigo.remove();

    const btn = document.createElement('button');
    btn.className = 'rpchat-btn';
    btn.setAttribute('aria-label', 'Abrir chat de dúvidas');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';

    const hint = document.createElement('div');
    hint.className = 'rpchat-hint';
    hint.textContent = 'Dúvidas? Fala comigo! 🐰';

    const panel = document.createElement('div');
    panel.className = 'rpchat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat de dúvidas rápidas');
    panel.innerHTML =
      `<div class="rpchat-head"><div><b>${CFG.nome}</b><small>respostas na hora · sem espera</small></div><button class="rpchat-x" aria-label="Fechar chat">✕</button></div>` +
      `<div class="rpchat-msgs"></div>` +
      `<div class="rpchat-chips">${CFG.chips.map(c => `<button class="rpchat-chip">${c}</button>`).join('')}</div>` +
      `<a class="rpchat-wa" target="_blank" rel="noopener">💬 Falar com atendente no WhatsApp</a>` +
      `<div class="rpchat-in"><input type="text" placeholder="Escreva sua pergunta..." aria-label="Sua pergunta" maxlength="300" /><button class="rpchat-send" aria-label="Enviar">➤</button></div>`;

    document.body.appendChild(btn);
    document.body.appendChild(hint);
    document.body.appendChild(panel);

    const msgs = panel.querySelector('.rpchat-msgs');
    const input = panel.querySelector('input');
    const waBtn = panel.querySelector('.rpchat-wa');
    let ultimaPergunta = '';

    function setWa() {
      const txt = ultimaPergunta
        ? `Olá! Vim pelo site e tenho uma dúvida: ${ultimaPergunta}`
        : 'Olá! Vim pelo site e tenho uma dúvida.';
      waBtn.href = `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(txt)}`;
    }

    function add(texto, quem, link) {
      const el = document.createElement('div');
      el.className = `rpchat-m ${quem}`;
      el.textContent = texto;
      if (link) {
        const a = document.createElement('a');
        a.className = 'rpchat-link';
        a.href = link[1]; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = link[0] + ' ↗';
        el.appendChild(document.createElement('br'));
        el.appendChild(a);
      }
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function perguntar(texto) {
      if (!texto.trim()) return;
      add(texto, 'eu');
      ultimaPergunta = texto; setWa();
      const resp = responder(texto);
      setTimeout(() => {
        if (resp) add(resp.r, 'bot', resp.link || null);
        else add(CFG.semResposta, 'bot');
      }, 350);
    }

    btn.addEventListener('click', () => {
      panel.classList.toggle('aberto');
      hint.remove();
      if (panel.classList.contains('aberto') && !msgs.children.length) {
        add(CFG.saudacao, 'bot'); setWa();
      }
      if (panel.classList.contains('aberto')) input.focus();
    });
    panel.querySelector('.rpchat-x').addEventListener('click', () => panel.classList.remove('aberto'));
    panel.querySelectorAll('.rpchat-chip').forEach(c => c.addEventListener('click', () => perguntar(c.textContent)));
    panel.querySelector('.rpchat-send').addEventListener('click', () => { perguntar(input.value); input.value = ''; });
    input.addEventListener('keydown', e => { if (e.key === 'Enter') { perguntar(input.value); input.value = ''; } });

    setTimeout(() => hint.remove(), 9000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
