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
    this.closeBtn.onclick = () => this.close();
    this.okBtn.onclick = () => this.close();
  }

  show(title, message) {
    this.title.textContent = title;
    this.message.textContent = message;
    this.modal.showModal(); // Сучасний стандарт
  }

  close() {
    this.modal.close();
  }
}

// Запускаємо логіку, коли DOM готовий
document.addEventListener('DOMContentLoaded', () => {
  const modal = new ModalService('customModal');
  
  document.getElementById('triggerModal').addEventListener('click', () => {
    modal.show('Вітаємо!', 'Ваш сайт успішно працює на GitHub Pages!');
  });
});

//window.addEventListener("load", (event) => {
  //alert("page is fully loaded");
});
