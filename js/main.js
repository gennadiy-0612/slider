class ModalService {
  constructor() {
    console.log(this); console.log(this);
  }

document.addEventListener('DOMContentLoaded', () => {
  // Тепер можна передавати просто рядок
  const modal = new ModalService('.hide');
});