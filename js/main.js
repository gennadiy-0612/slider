class ModalService {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    // Додаємо перевірку, чи знайшовся елемент
    if (!this.modal) {
      console.error(`Модальне вікно з ID "${modalId}" не знайдено!`);
      return;
    }

    this.title = document.getElementById('modalTitle');
    this.message = document.getElementById('modalMessage');
    this.closeBtn = document.getElementById('closeModal');
    this.okBtn = document.getElementById('modalBtn');
    
    this._initEvents();
  }

  _initEvents() {
    if (this.closeBtn) this.closeBtn.onclick = () => this.close();
    if (this.okBtn) this.okBtn.onclick = () => this.close();
  }

  show(title, message) {
    this.title.textContent = title;
    this.message.textContent = message;
    this.modal.showModal();
  }

  close() {
    this.modal.close();
  }
}

// Єдиний блок ініціалізації
document.addEventListener('DOMContentLoaded', () => {
  const modal = new ModalService('customModal');
  const triggerBtn = document.getElementById('triggerModal');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      modal.show('Вітаємо!', 'Ваш сайт успішно працює на GitHub Pages!');
    });
  }
});
