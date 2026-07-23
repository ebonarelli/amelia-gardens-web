(() => {
  const config = window.AMELIA_CONFIG || {};

  /* ===== WHATSAPP LINKS ===== */
  const number = String(config.whatsappNumber || "").replace(/\D/g, "");
  const baseMessage = "Hola, me interesa recibir información sobre los solares de Amelia Gardens.";
  const visitMessage = "Hola, me interesa agendar una visita a Amelia Gardens.";
  const locationMessage = "Hola, me interesa recibir la ubicación de Amelia Gardens.";

  const waUrl = (message) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll(".whatsapp-link").forEach(link => {
    link.href = number ? waUrl(baseMessage) : "#contacto";
  });
  document.querySelectorAll(".whatsapp-visit-link").forEach(link => {
    link.href = number ? waUrl(visitMessage) : "#contacto";
  });
  document.querySelectorAll(".whatsapp-location-link").forEach(link => {
    link.href = number ? waUrl(locationMessage) : "#contacto";
  });

  /* ===== INSTAGRAM LINKS ===== */
  const igUrl = config.instagramUrl || "https://instagram.com/ameliagardensrd";
  document.querySelectorAll(".instagram-link").forEach(link => {
    link.href = igUrl;
  });

  /* ===== GOOGLE MAPS LINKS ===== */
  const mapsUrl = config.googleMapsUrl || "https://maps.app.goo.gl/xnTaY773AUuoj8ck7?g_st=ic";
  document.querySelectorAll(".maps-link").forEach(link => {
    link.href = mapsUrl;
  });

  /* ===== MOBILE NAV ===== */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ===== LEAD FORM ===== */
  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  const webhookUrl =
    "https://reading-postal-mas-andrew.trycloudflare.com/webhook/16a31e9e-f22d-48b9-8133-c3b12b1cfd94";

  const WA_NUMBER = "18299028888";

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const nombre   = String(data.get("nombre")   || "").trim();
      const telefono = String(data.get("telefono") || "").trim();
      const email    = String(data.get("email")    || "").trim();
      const metodo   = String(data.get("metodo_contacto") || "").trim();
      const motivo   = String(data.get("motivo")   || "Información general").trim();
      const mensaje  = String(data.get("mensaje")  || "").trim();
      const consent  = data.get("consentimiento");

      /* --- Validación sincrónica --- */
      if (!nombre) {
        status.textContent = "Por favor ingresa tu nombre completo.";
        form.querySelector('[name="nombre"]').focus();
        return;
      }
      if (!telefono) {
        status.textContent = "Por favor ingresa tu número de teléfono.";
        form.querySelector('[name="telefono"]').focus();
        return;
      }
      if (!consent) {
        status.textContent = "Debes aceptar ser contactado para continuar.";
        return;
      }
      if (!metodo) {
        status.textContent = "Por favor indica cómo prefieres que te contactemos.";
        return;
      }

      /* --- Construir mensaje en el formato requerido --- */
      const metodoPrint = metodo === "correo"   ? "Correo electrónico"
                        : metodo === "whatsapp" ? "WhatsApp"
                        : metodo === "asesor"   ? "Llamada con asesor"
                        : "No indicado";

      const waMessage = [
        "Hola, quiero recibir información sobre Amelia Gardens.",
        "",
        `Nombre: ${nombre}`,
        `Teléfono: ${telefono}`,
        `Correo: ${email || "No indicado"}`,
        `Forma de contacto: ${metodoPrint}`,
        `Consulta: ${motivo}`,
        `Mensaje: ${mensaje || "Sin mensaje adicional"}`
      ].join("\n");

      const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

      /* --- Solo abrir WhatsApp si el método NO es correo electrónico --- */
      if (metodo !== "correo") {
        window.open(waLink, "_blank", "noopener,noreferrer");
        status.innerHTML =
          "✅ Solicitud lista. <a href=\"" + waLink + "\" target=\"_blank\" rel=\"noopener noreferrer\" " +
          "style=\"color:inherit;font-weight:700;text-decoration:underline;\">Abrir WhatsApp</a> " +
          "si no se abrió automáticamente.";
      } else {
        status.textContent = "✅ Solicitud recibida. Te contactaremos pronto por correo electrónico.";
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando…";
      }

      /* --- Enviar webhook en segundo plano --- */
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono, email, metodo_contacto: metodo, interes: motivo, mensaje })
      }).catch(() => {});

      /* --- Resetear formulario y restaurar botón --- */
      setTimeout(() => {
        form.reset();
        status.innerHTML = "";
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar solicitud";
        }
      }, 8000);
    });
  }

  /* ===== YEAR ===== */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ===== CANONICAL ===== */
  if (config.canonicalUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonicalUrl;

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = config.canonicalUrl;
  }

  /* ===== FADE-IN ANIMATIONS (Intersection Observer) ===== */
  const fadeEls = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings in the same parent
          const siblings = [...entry.target.parentElement.querySelectorAll(".fade-up")];
          const idx = siblings.indexOf(entry.target);
          const delay = (idx % 6) * 80;
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(el => el.classList.add("visible"));
  }

  /* ===== LAZY LOADING POLYFILL ===== */
  if (!("loading" in HTMLImageElement.prototype)) {
    document.querySelectorAll("img[loading=lazy]").forEach(img => {
      img.src = img.src;
    });
  }
})();
