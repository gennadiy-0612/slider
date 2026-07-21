class ModalService {
  #modal;

  // Приймаємо звичайний аргумент-рядок
  constructor(modalSelector = '#modal') { 
    this.#modal = document.querySelector(modalSelector);
    console.log(this);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Тепер можна передавати просто рядок
  const modal = new ModalService('.hide');
});