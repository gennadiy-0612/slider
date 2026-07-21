class ModalService {
  #modal;

  constructor({ 
    modalSelector = #modal
  })
   { 
    this.#modal = document.querySelector(modalSelector);
    console.log(this.#modal);
  }
}


// Ініціалізація після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  // Передаємо наш об'єкт конфігурації в конструктор
  const modal = new ModalService('.hide');
});