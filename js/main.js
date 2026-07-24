class ElHtml {
  #tag; #parent; #class; #attrs = {}; #listen = {}; #textContent;

constructor(config) {
  for (const [key, value] of Object.entries(config)) {
    if (key === "tag") this.#tag = value;
    else if (key === "parent") this.#parent = value;
    else if (key === "class") this.#class = value;
    else if (key === "textContent") this.#textContent = value;
    else this.#attrs[key] = value;
  }
}

  SHOW() {
    const el = document.createElement(this.#tag || "div");
    if (this.#class) el.className = this.#class;
    Object.assign(el, this.#attrs);
    if (this.#listen.event) {
      el.addEventListener(this.#listen.event, this.#listen.deal);
    }
    const parentEl = document.querySelector(this.#parent) || document.body;
    parentEl.appendChild(el);
    return el;
  }
 static ADD_LISTENER(el, event, deal) {
    el.addEventListener(event, deal);
  }
static makeIt(ttt) {
  console.log(ttt);
}
  // СТАТИЧНИЙ МЕТОД: приймає масив конфігурацій і показує всі
  static SHOW_ALL(configsArray) {
    return configsArray.map(config => new ElHtml(config).SHOW());
  }
}

// ВИКОРИСТАННЯ В 1 РЯДОК:
document.addEventListener("DOMContentLoaded", () => {
  ElHtml.SHOW_ALL([
    { parent: ".slider", tag: "img", class: "slider-img", src: "img/w.png", alt: "Slider Image 1", listen: { event: "click", deal: () => console.log("Image clicked!") } },
    { parent: ".slider", tag: "p", class: "password", textContent: "Password: 12345" },
    { parent: ".slider", tag: "span", class: "password" }
  ]);
})