class ElHtml {
  constructor({ tag, parent, Class, textContent, listen = [], ...attrs }) {
    this.config = {
      tag,
      parent,
      Class,
      textContent,
      listen: Array.isArray(listen) ? listen : [listen],
      attrs
    };
  }

  SHOW() {
    const { tag, parent, Class, textContent, listen, attrs } = this.config;
    const el = document.createElement(tag);

    if (Class) el.className = Class;
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
  changeClass: (e, Class) => {
    if (e && e.target) { e.target.className = Class };
  },
};

// ВИКОРИСТАННЯ
document.addEventListener("DOMContentLoaded", () => {
  ElHtml.SHOW_ALL([
    {
      parent: ".slider", tag: "p", Class: "password", textContent: "My Text",
      listen: [
        { event: "click", deal: e => ElHtml.deals.changeClass(e, "click") },
        { event: "mouseover", deal: e => ElHtml.deals.changeClass(e, "over") }
      ]
    }
  ]);
});