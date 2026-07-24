class ElHtml {
  // 1. Повернули значення за замовчуванням tag = "div"
  constructor({ tag = "div", parent, class: className, classes, textContent, listen = [], ...attrs }) {
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
  // Метод для зміни CSS-класу
  changeClass: (e, className) => {
    if (e && e.target) e.target.className = className;
  },
  // 2. Додано логер logThis, який викликався для span
  logThis: () => console.log('Клік на span!')
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
      listen: { event: "click", deal: e => ElHtml.deals.changeCLass(e, "highlight") }
    },
    {
      parent: ".slider",
      tag: "p",
      class: "password",
      textContent: "Password: 12345",
      listen: [
        { event: "click", deal: e => ElHtml.deals.changeCLass(e, "highlight") },
        { event: "mouseover", deal: e => ElHtml.deals.changeCLass(e, "pair") }
      ]
    },
    {
      parent: ".slider",
      tag: "span",
      class: "truth",
      textContent: " (копіювати)",
      listen: { event: "mousedown", deal: e => ElHtml.deals.changeClass(e, "yy") }
    }
  ]);
});