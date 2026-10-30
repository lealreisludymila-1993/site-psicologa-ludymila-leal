/* Ludymila Leal — script.js
   1) Formulário de contato e menu do cabeçalho
   2) Consentimento de privacidade / widget de avaliações (Trustindex) */

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
  

/* ---- 2) Consentimento de privacidade ---- */
(function(){
  var key='ludymila_trustindex_consent_v1';
  var banner=document.getElementById('cookie-consent');
  var reviews=document.querySelector('.trustindex-reviews [data-src]');
  function loadReviews(){if(!reviews||reviews.dataset.loaded==='true')return;reviews.dataset.loaded='true';var s=document.createElement('script');s.src='https://cdn.trustindex.io/loader.js?c413e4b8444e522cd226c9bd40d';s.async=true;s.defer=true;document.head.appendChild(s);}
  var choice=null;try{choice=localStorage.getItem(key);}catch(e){}
  if(choice==='accepted'){loadReviews();}else if(choice!=='rejected'){banner.style.display='block';}
  document.getElementById('cookie-accept').addEventListener('click',function(){try{localStorage.setItem(key,'accepted');}catch(e){}banner.style.display='none';loadReviews();});
  document.getElementById('cookie-reject').addEventListener('click',function(){try{localStorage.setItem(key,'rejected');}catch(e){}banner.style.display='none';});
  var reopen=document.getElementById('open-privacy-preferences');if(reopen)reopen.addEventListener('click',function(){banner.style.display='block';});
})();
