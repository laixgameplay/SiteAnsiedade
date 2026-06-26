// Script principal para todas as páginas
// Inicialização comum
document.addEventListener('DOMContentLoaded', function() {
  // Scroll to top quando a página carregar
  window.scrollTo(0, 0);
  
  // Marca o link ativo na navegação
  setActiveNavLink();
});

// Função para marcar o link ativo na navegação
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Função de scroll suave para âncoras
function smoothScrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Adiciona comportamento de scroll suave para todos os links com #
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScrollToElement(targetId);
    });
  });
});

const form = document.getElementById("testimonialForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // impede recarregar a página

  const texto = document.getElementById("message").value;

 await fetch("https://backend-site-ansiedade.onrender.com/mensagens", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ texto })
});

  alert("Mensagem enviada!");
});

async function carregarMensagens() {
  const resposta = await fetch("https://backend-site-ansiedade.onrender.com/mensagens");
  const dados = await resposta.json();

  const lista = document.getElementById("testimonialsList");
  lista.innerHTML = "";

  dados.forEach(msg => {
    const div = document.createElement("div");

    div.innerHTML = `
      <p>${msg.texto}</p>
      <button onclick="deletarMensagem(${msg.id})">Excluir</button>
    `;

    lista.appendChild(div);

  });
}

async function deletarMensagem(id) {
  await fetch(`https://backend-site-ansiedade.onrender.com/mensagens/${id}`, {
    method: "DELETE"
  });

  carregarMensagens();
}