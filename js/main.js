class ModalService {
  // Приватні поля (інцип інкапсуляції)
  #modal;
  #title;
  #message;
  #closeBtn;
  #okBtn;

  constructor(modalElement) {
    this.#modal = modalElement;
    
    // Використовуємо optional chaining та надійні селектори
    this.#title = this.#modal.querySelector('.modalTitle');
    this.#message = this.#modal.querySelector('.modalMessage');
    this.#closeBtn = this.#modal.querySelector('.closeModal');
    this.#okBtn = this.#modal.querySelector('.modalBtn');

    this.#initEvents();
  }

  #initEvents() {
    // Використовуємо addEventListener замість onclick для кращої гнучкості
    this.#closeBtn?.addEventListener('click', () => this.close());
    this.#okBtn?.addEventListener('click', () => this.close());

    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) this.close();
    });
  }

  show(title, message) {
    if (this.#title) this.#title.textContent = title;
    if (this.#message) this.#message.textContent = message;
    
    this.#modal.classList.add('show');
  }

  close() {
    this.#modal.classList.remove('show');
  }
}

// Використання сучасного підходу до ініціалізації
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.querySelector('.customModal');
  const triggerBtn = document.querySelector('.triggerModal');

  if (!modalEl) return;

  const modal = new ModalService(modalEl);

  triggerBtn?.addEventListener('click', () => {
    modal.show('Вітаємо!', 'Код оновлено до сучасних стандартів ES6+');
  });
});
