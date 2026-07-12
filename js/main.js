class ModalService {
  #modal;
  #button;
  #closeButtons;
  #titleEl;
  #messageEl;
  #onOpen;
  #onClose;

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
    this.#button?.addEventListener('click', () => this.show('Вітаємо!', 'Це динамічне повідомлення'));
    
    this.#closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });

    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) this.close();
    });
  }

  show(title = '', message = '') {
    if (this.#titleEl) this.#titleEl.textContent = title;
    if (this.#messageEl) this.#messageEl.textContent = message;

    this.#modal.classList.add('show');

    if (typeof this.#onOpen === 'function') this.#onOpen();
  }

  close() {
    this.#modal.classList.remove('show');

    if (typeof this.#onClose === 'function') this.#onClose();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = new ModalService({
    modalSelector: '.customModal',
    buttonSelector: '.triggerModal',
    titleSelector: '.modalTitle',
    messageSelector: '.modalMessage',
    closeBtnSelector: '.closeModal, .modalBtn',
    onOpen: () => console.log('Модальне вікно відкрите!'),
    onClose: () => console.log('Модальне вікно закрите.')
  });
});
