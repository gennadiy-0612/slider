class ModalService {
  #modal;
  #button;
  #closeButtons;
  #titleEl;
  #messageEl;
  #onOpen;  // Змінна для колбека відкриття
  #onClose; // Змінна для колбека закриття

  constructor({ 
    modalSelector, 
    buttonSelector, 
    titleSelector = '.modal-title', 
    messageSelector = '.modal-message', 
    closeBtnSelector = '.close-btn',
    onOpen = null,
    onClose = null
  }) {
    this.#modal = document.querySelector(modalSelector);
    this.#button = document.querySelector(buttonSelector);
    this.#onOpen = onOpen;
    this.#onClose = onClose;

    if (!this.#modal) throw new Error(`Modal element not found: ${modalSelector}`);

    this.#titleEl = this.#modal.querySelector(titleSelector);
    this.#messageEl = this.#modal.querySelector(messageSelector);
    this.#closeButtons = this.#modal.querySelectorAll(closeBtnSelector);

    this.#initEvents();
  }

  #initEvents() {
    this.#button?.addEventListener('click', () => this.show());
    this.#closeButtons.forEach(btn => btn.addEventListener('click', () => this.close()));
    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) this.close();
    });
  }

  show(title = '', message = '') {
    if (this.#titleEl) this.#titleEl.textContent = title;
    if (this.#messageEl) this.#messageEl.textContent = message;
    
    this.#modal.classList.add('show');
    
    // Викликаємо колбек, якщо він існує
    if (typeof this.#onOpen === 'function') this.#onOpen();
  }

  close() {
    this.#modal.classList.remove('show');
    
    // Викликаємо колбек, якщо він існує
    if (typeof this.#onClose === 'function') this.#onClose();
  }
}

// Приклад використання з колбеками:
document.addEventListener('DOMContentLoaded', () => {
  const modal = new ModalService({
    modalSelector: '.customModal',
    buttonSelector: '.openModalBtn',
    onOpen: () => console.log('Модальне вікно відкрите!'),
    onClose: () => {
      console.log('Модальне вікно закрите. Очищення даних...');
      // Тут можна додати логіку очищення форми
    }
  });
});
