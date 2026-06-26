// Script para a página de Recursos
document.addEventListener('DOMContentLoaded', function() {
  // Scroll to top quando a página carregar
  window.scrollTo(0, 0);

  // Funcionalidade do accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const content = accordionItem.querySelector('.accordion-content');
      const icon = this.querySelector('svg');
      
      // Toggle o estado do accordion
      const isOpen = accordionItem.classList.contains('active');
      
      // Fecha todos os outros accordions (comportamento de accordion único aberto)
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('active');
          const otherContent = item.querySelector('.accordion-content');
          const otherIcon = item.querySelector('.accordion-header svg');
          if (otherContent) {
            otherContent.style.maxHeight = '0';
          }
          if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
          }
        }
      });
      
      // Toggle o accordion atual
      if (isOpen) {
        accordionItem.classList.remove('active');
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        accordionItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});
