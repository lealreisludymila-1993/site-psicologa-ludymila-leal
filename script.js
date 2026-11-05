/* Ludymila Leal — script.js
   1) Formulário de contato e menu do cabeçalho
   2) Scripts do site */

/* ---- 1) Formulário e menu ---- */
    (function () {
      var form = document.getElementById("form-contato");
      if (form) {
        var status = document.getElementById("form-status");
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          var btn = form.querySelector("button[type=submit]");
          btn.disabled = true; status.textContent = "A enviar…";
          var data = {};
          new FormData(form).forEach(function (v, k) { data[k] = v; });
          fetch("https://formsubmit.co/ajax/ludymilaleal.contato@hotmail.com", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(data)
          }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
            .then(function (res) {
              if (res.ok && String(res.j.success) !== "false") {
                form.reset(); status.textContent = "Mensagem enviada. Obrigada pelo contato!";
              } else { throw new Error("falha"); }
            })
            .catch(function () {
              status.textContent = "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";
            })
            .then(function () { btn.disabled = false; });
        });
      }

      var btn = document.querySelector(".menu-toggle");
      var nav = document.getElementById("menu-principal");
      if (!btn || !nav) return;

      function setOpen(open) {
        nav.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      }
      btn.addEventListener("click", function () {
        setOpen(btn.getAttribute("aria-expanded") !== "true");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) setOpen(false);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
          setOpen(false);
          btn.focus();
        }
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) setOpen(false);
      });
    })();
  

