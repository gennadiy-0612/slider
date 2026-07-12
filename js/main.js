class ModalService {
  constructor(modalElement) {
    this.modal = modalElement;
    // Шукаємо елементи всередині поточного модального вікна
    this.title = this.modal.querySelector('.modalTitle');
    this.message = this.modal.querySelector('.modalMessage');
    this.closeBtn = this.modal.querySelector('.closeModal');
    this.okBtn = this.modal.querySelector('.modalBtn');

    this._initEvents();
  }

  _initEvents() {
    if (this.closeBtn) this.closeBtn.onclick = () => this.close();
    if (this.okBtn) this.okBtn.onclick = () => this.close();
    
    this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
    });
  }

  show(title, message) {
    this.title.textContent = title;
    this.message.textContent = message;
    this.modal.classList.add('show');
  }

  close() {
    this.modal.classList.remove('show');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Знаходимо всі модалки на сторінці
  const modalElements = document.querySelectorAll('.customModal');
  const triggerBtn = document.querySelector('.triggerModal');

  // Ініціалізуємо першу знайдену модалку
  if (modalElements.length > 0) {
    const modal = new ModalService(modalElements[0]);
    
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        modal.show('Вітаємо!', 'Тепер ми використовуємо тільки класи!');
      });
    }
  }
});
