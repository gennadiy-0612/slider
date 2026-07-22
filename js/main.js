class ModalService {
  #modal;

  // 1. Додаємо параметр selector у конструктор
  constructor(selector) {
    this.#modal = document.querySelector(selector);
    
    console.log('Екземпляр класу (this):', this); 
    console.log('Знайдений елемент:', this.#modal);
  }
} // 2. Не забудьте закрити клас тут!

// 3. Правильно оформлюємо стрілочну функцію () => { ... }
document.addEventListener('DOMContentLoaded', () => {
  // Передаємо рядок з селектором
  const modal = new ModalService('.hide');
});