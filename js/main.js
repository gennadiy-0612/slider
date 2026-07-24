class ElHtml {
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

    listen.forEach(({ event, deal }) => event && deal && el.addEventListener(event, deal));

    (document.querySelector(parent) || document.body).appendChild(el);
    return el;
  }

  static SHOW_ALL(configs) {
    return configs.map(cfg => new ElHtml(cfg).SHOW());
  }
}
ElHtml.deals = {
  changeColor: (color) => e.target.style.color = color,
  logThis: () => console.log('oo')
};
// ВИКОРИСТАННЯ (залишилося таким самим)
document.addEventListener("DOMContentLoaded", () => {
  ElHtml.SHOW_ALL([
    {
      parent: ".slider", tag: "img", class: "slider-img", src: "img/w.png", alt: "Slider Image 1",
      listen: { event: "click", deal: () => ElHtml.deals.changeColor("red") }
    },
    {
      parent: ".slider", tag: "p", class: "password", textContent: "Password: 12345", listen: [
        { event: "mouseenter", deal: e => ElHtml.deals.changeColor("red") },
        { event: "mouseleave", deal: e => e.target.style.color = "black" }
      ]
    },
    { parent: ".slider", tag: "span", class: "password", textContent: " (копіювати)" }
  ]);
});