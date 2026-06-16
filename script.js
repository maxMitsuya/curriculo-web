const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

// Definindo campos para preenchimento e mensagens de erro para validação do formulário
const fields = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  message: document.querySelector("#message")
};

const errors = {
  name: document.querySelector("#name-error"),
  email: document.querySelector("#email-error"),
  message: document.querySelector("#message-error")
};

// Decidi configurar para manter a escolha do tema
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

// Toggle do menu para dispositivos móveis
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

// Validação do formulário de contato
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(field, message) {
  errors[field].textContent = message;
  fields[field].setAttribute("aria-invalid", message ? "true" : "false");
}

// Valida os campos do formulário e exibe mensagens de erro se necessário
function validateForm() {
  let isValid = true;
  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const message = fields.message.value.trim();

  setError("name", "");
  setError("email", "");
  setError("message", "");

  if (!name) {
    setError("name", "Informe seu nome.");
    isValid = false;
  }

  if (!email) {
    setError("email", "Informe seu e-mail.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    setError("email", "Use um e-mail válido, como usuario@dominio.com.");
    isValid = false;
  }

  if (!message) {
    setError("message", "Escreva uma mensagem.");
    isValid = false;
  }

  return isValid;
}

// Manipula o envio do formulário, validando os campos e exibindo mensagens de status
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  if (!validateForm()) {
    formStatus.textContent = "Revise os campos destacados antes de enviar.";
    return;
  }

  contactForm.reset();
  formStatus.textContent = "Mensagem enviada com sucesso!";
});

const sections = document.querySelectorAll("main section[id]");
const navigationItems = document.querySelectorAll(".nav-links a");

// Destaca o link do menu correspondente a secao visivel na tela.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navigationItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.45 });

sections.forEach((section) => observer.observe(section));
