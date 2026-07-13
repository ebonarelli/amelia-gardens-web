(() => {
  const config = window.AMELIA_CONFIG || {};
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

  const form = document.getElementById("lead-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Completa los campos requeridos.";
        return;
      }

      if (!number) {
        status.textContent = "El número de WhatsApp aún no está configurado.";
        return;
      }

      const data = new FormData(form);
      const message = [
        "Hola, me interesa recibir información sobre Amelia Gardens.",
        "",
        `Nombre: ${data.get("nombre") || ""}`,
        `Teléfono: ${data.get("telefono") || ""}`,
        `Correo: ${data.get("email") || "No indicado"}`,
        `Método preferido: ${data.get("metodo") || "WhatsApp"}`,
        `Motivo: ${data.get("motivo") || "Información general"}`,
        `Mensaje: ${data.get("mensaje") || "Sin mensaje adicional"}`
      ].join("\n");

      status.textContent = "Abriendo WhatsApp...";
      window.open(waUrl(message), "_blank", "noopener");
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

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
})();
