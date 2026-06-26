// Script avançado para a página de Depoimentos com localStorage
document.addEventListener('DOMContentLoaded', function() {
  // Scroll to top quando a página carregar
  window.scrollTo(0, 0);

  // Chave para localStorage
  const STORAGE_KEY = 'ansiedade_testimonials';

  // Array para armazenar depoimentos
  let testimonials = loadTestimonials();

  // Carrega depoimentos do localStorage
  function loadTestimonials() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
      return [];
    }
  }

  // Salva depoimentos no localStorage
  function saveTestimonials() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
      return true;
    } catch (error) {
      console.error('Erro ao salvar depoimentos:', error);
      return false;
    }
  }

  // Sanitiza texto para prevenir XSS
  function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Formata data
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('pt-BR', options);
  }

  // Função para renderizar depoimentos
  function renderTestimonials() {
    const listElement = document.getElementById('testimonialsList');
    
    if (!listElement) return;
    
    if (testimonials.length === 0) {
      listElement.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #6b7280;">
          <p>Nenhum depoimento ainda. Seja o primeiro a compartilhar!</p>
        </div>
      `;
      return;
    }
    
    listElement.innerHTML = testimonials.map(testimonial => `
      <div class="testimonial-item" data-id="${testimonial.id}">
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
          <div class="user-icon">
            <svg class="icon" style="width: 1.5rem; height: 1.5rem; color: white;" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: start;">
              <div>
                <p style="margin-bottom: 0.25rem; font-weight: 500;">Usuário anônimo</p>
                ${testimonial.timestamp ? `
                  <p style="font-size: 0.75rem; color: #9ca3af; margin-bottom: 0.5rem;">
                    ${formatDate(testimonial.timestamp)}
                  </p>
                ` : ''}
              </div>
              <button 
                class="delete-btn" 
                data-id="${testimonial.id}"
                style="background: none; border: none; cursor: pointer; color: #ef4444; padding: 0.25rem;"
                title="Deletar depoimento"
              >
                <svg style="width: 1.25rem; height: 1.25rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <p style="font-size: 0.875rem; color: #4b5563; font-style: italic; line-height: 1.6;">
              "${sanitizeHTML(testimonial.text)}"
            </p>
          </div>
        </div>
      </div>
    `).join('');

    // Adiciona event listeners para botões de deletar
    addDeleteListeners();
  }

  // Adiciona listeners para botões de deletar
  function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        deleteTestimonial(id);
      });
    });
  }

  // Deleta um depoimento
  function deleteTestimonial(id) {
    if (confirm('Tem certeza que deseja deletar este depoimento?')) {
      testimonials = testimonials.filter(t => t.id !== id);
      saveTestimonials();
      renderTestimonials();
      
      // Mostra mensagem de sucesso (opcional)
      if (typeof showNotification === 'function') {
        showNotification('Depoimento removido com sucesso', 'success');
      }
    }
  }

  // Formulário submit
  const form = document.getElementById('testimonialForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const messageInput = document.getElementById('message');
      const message = messageInput.value.trim();
      
      // Validações
      if (!message) {
        alert('Por favor, escreva seu depoimento.');
        return;
      }
      
      if (message.length < 10) {
        alert('O depoimento deve ter pelo menos 10 caracteres.');
        return;
      }
      
      if (message.length > 500) {
        alert('O depoimento não pode ter mais de 500 caracteres.');
        return;
      }
      
      // Adiciona novo depoimento
      const newTestimonial = {
        id: Date.now(),
        text: message,
        timestamp: Date.now()
      };
      
      testimonials.unshift(newTestimonial);
      
      // Salva e renderiza
      if (saveTestimonials()) {
        messageInput.value = '';
        renderTestimonials();
        
        // Mostra mensagem de sucesso (opcional)
        if (typeof showNotification === 'function') {
          showNotification('Depoimento adicionado com sucesso!', 'success');
        }
        
        // Scroll para o topo da lista de depoimentos
        const listElement = document.getElementById('testimonialsList');
        if (listElement) {
          listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        alert('Erro ao salvar depoimento. Por favor, tente novamente.');
      }
    });
    
    // Contador de caracteres
    const messageInput = document.getElementById('message');
    if (messageInput) {
      const maxLength = 500;
      
      // Cria elemento contador
      const counter = document.createElement('div');
      counter.id = 'char-counter';
      counter.style.cssText = 'text-align: right; font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;';
      counter.textContent = `0 / ${maxLength}`;
      
      messageInput.parentNode.appendChild(counter);
      
      messageInput.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length} / ${maxLength}`;
        counter.style.color = length > maxLength ? '#ef4444' : '#6b7280';
      });
    }
  }

  // Botão para limpar todos os depoimentos (desenvolvimento)
  function addClearAllButton() {
    const container = document.querySelector('.container');
    if (container && testimonials.length > 0) {
      const clearBtn = document.createElement('button');
      clearBtn.textContent = 'Limpar todos os depoimentos';
      clearBtn.style.cssText = `
        background: #ef4444;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 1rem;
        font-size: 0.875rem;
      `;
      clearBtn.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja deletar TODOS os depoimentos?')) {
          testimonials = [];
          saveTestimonials();
          renderTestimonials();
          this.remove();
        }
      });
      container.appendChild(clearBtn);
    }
  }

  // Renderiza depoimentos ao carregar
  renderTestimonials();
  
  // Adiciona botão de limpar (comentado por padrão)
  // addClearAllButton();
});
