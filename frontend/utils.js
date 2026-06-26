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
