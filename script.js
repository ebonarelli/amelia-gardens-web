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
  const mapsUrl = config.googleMapsUrl || "https://maps.app.goo.gl/K3VM1j5qKnEGbSj4A?g_st=ic";
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

  const webhookUrl =
    "https://reading-postal-mas-andrew.trycloudflare.com/webhook/16a31e9e-f22d-48b9-8133-c3b12b1cfd94";

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Completa los campos requeridos.";
        return;
      }

      const data = new FormData(form);

      const lead = {
        nombre: String(data.get("nombre") || "").trim(),
        telefono: String(data.get("telefono") || "").trim(),
        email: String(data.get("email") || "").trim(),
        interes: String(
          data.get("motivo") ||
          data.get("interes") ||
          "Información general"
        ).trim(),
        mensaje: String(data.get("mensaje") || "").trim()
      };

      try {
        status.textContent = "Enviando solicitud...";

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(lead)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        status.textContent =
          "Solicitud recibida. Te contactaremos próximamente.";

        form.reset();

        if (number) {
          const message = [
            "Hola, acabo de solicitar información sobre Amelia Gardens.",
            "",
            `Nombre: ${lead.nombre}`,
            `Teléfono: ${lead.telefono}`,
            `Correo: ${lead.email || "No indicado"}`,
            `Interés: ${lead.interes}`,
            `Mensaje: ${lead.mensaje || "Sin mensaje adicional"}`
          ].join("\n");

          window.open(waUrl(message), "_blank", "noopener");
        }
      } catch (error) {
        console.error("Error enviando lead:", error);
        status.textContent =
          "No pudimos enviar la solicitud. Intenta nuevamente o escríbenos por WhatsApp.";
      }
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
