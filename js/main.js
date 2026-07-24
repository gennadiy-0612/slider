class ElHtml {
  constructor({ tag, parent, class: className, classes, textContent, listen = [], ...attrs }) {
    this.config = {
      tag,
      parent,
      className: className || classes,
      textContent,
      listen: Array.isArray(listen) ? listen : [listen],
      attrs
    };
  }

  SHOW() {
    const { tag, parent, className, textContent, listen, attrs } = this.config;
    const el = document.createElement(tag);

    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    Object.assign(el, attrs);

    listen.forEach(({ event, deal }) => {
      if (!event || !deal) return;
      // Якщо deal — це рядок, беремо функцію з ElHtml.deals, інакше використовуємо сам deal
      const handler = typeof deal === "string" ? ElHtml.deals[deal] : deal;
      if (typeof handler === "function") {
        el.addEventListener(event, handler);
      }
    });

    (document.querySelector(parent) || document.body).appendChild(el);
    return el;
  }

  static SHOW_ALL(configs) {
    return configs.map(cfg => new ElHtml(cfg).SHOW());
  }
}

// Готові обробники подій
ElHtml.deals = {
  // Тепер приймає і об'єкт події e, і потрібний колір
  changeColor: (e, color) => {
    if (e && e.target) e.target.style.color = color;
  },
  logThis: () => console.log(this)
};

// ВИКОРИСТАННЯ
document.addEventListener("DOMContentLoaded", () => {
  ElHtml.SHOW_ALL([
    {
      parent: ".slider", 
      tag: "img", 
      class: "slider-img", 
      src: "img/w.png", 
      alt: "Slider Image 1",
      // Передаємо `e` першим аргументом
      listen: { event: "click", deal: e => ElHtml.deals.changeColor(e, "red") }
    },
    {
      parent: ".slider", 
      tag: "p", 
      class: "password", 
      textContent: "Password: 12345", 
      listen: [
        { event: "mouseenter", deal: e => ElHtml.deals.changeColor(e, "red") },
        { event: "mouseleave", deal: e => ElHtml.deals.changeColor(e, "black") }
      ]
    },
    { 
      parent: ".slider", 
      tag: "span", 
      class: "password", 
      textContent: " (копіювати)",
      // Приклад використання функції з deals за її назвою (рядком)
      listen: { event: "click", deal: "logThis" }
    }
  ]);
});