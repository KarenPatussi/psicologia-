(() => {
  const form = document.getElementById("contactForm");

  if (!form) return;

  const endpoint = "https://formsubmit.co/ajax/contato@terapiacomkaren.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = form.querySelector("[name='nome']");
    const email = form.querySelector("[name='email']");
    const telefone = form.querySelector("[name='telefone']");
    const mensagem = form.querySelector("[name='mensagem']");
    const honeypot = form.querySelector("[name='_honey']");

    // 🔒 anti-spam
    if (honeypot && honeypot.value !== "") return;

    // ✅ validação simples
    if (!nome.value || !email.value || !mensagem.value) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    if (mensagem.value.length > 500) {
      alert("Mensagem muito longa (máx. 500 caracteres).");
      return;
    }

    const data = new FormData(form);

    // 💡 Configs FormSubmit
    data.append("_subject", "Novo contato pelo site – Karen Patussi");
    data.append("_template", "box");
    data.append("_captcha", "false");

    // 🔥 AUTO RESPOSTA
    data.append("_autoresponse",
`Olá! Recebemos sua mensagem 🌿

Em breve você terá retorno.

Se preferir, pode falar diretamente pelo WhatsApp.

— Karen Patussi`);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success === "true") {
        showSuccess();
        form.reset();
      } else {
        alert("Erro ao enviar. Tente novamente.");
      }

    } catch (error) {
      console.error(error);
      alert("Erro de conexão. Tente novamente.");
    }
  });

  // 🎉 Feedback visual
  function showSuccess() {
    const success = document.createElement("div");
    success.className = "form-success";
    success.innerHTML = `
      <div class="success-card">
        <div class="check">✔</div>
        <p>Mensagem enviada.<br>Em breve entraremos em contato.</p>
      </div>
    `;

    document.body.appendChild(success);

    setTimeout(() => {
      success.classList.add("show");
    }, 10);

    setTimeout(() => {
      success.classList.remove("show");
      setTimeout(() => success.remove(), 400);
    }, 3000);
  }

})();
