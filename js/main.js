class ModalService {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.title = document.getElementById('modalTitle');
    this.message = document.getElementById('modalMessage');
    this.closeBtn = document.getElementById('closeModal');
    this.okBtn = document.getElementById('modalBtn');

    this._initEvents();
  }

  _initEvents() {
    if (this.closeBtn) this.closeBtn.onclick = () => this.close();
    if (this.okBtn) this.okBtn.onclick = () => this.close();
    
    // Закриття при кліку на фон (зовні вікна)
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
  const modal = new ModalService('customModal');
  const triggerBtn = document.getElementById('triggerModal');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      modal.show('Вітаємо!', 'Ваш сайт успішно працює без фреймворків!');
    });
  }
});
