class ElHtml {
  #tag; #parent; #classes; #attrs = {};

  constructor(config) {
    for (const [key, value] of Object.entries(config)) {
      if (key === "tag") this.#tag = value;
      else if (key === "parent") this.#parent = value;
      else if (key === "classes") this.#classes = value;
      else this.#attrs[key] = value;
    }
  }

  SHOW() {
    const el = document.createElement(this.#tag || "div");
    if (this.#classes) el.className = this.#classes;
    Object.assign(el, this.#attrs);

    const parentEl = document.querySelector(this.#parent) || document.body;
    parentEl.appendChild(el);
    return el;
  }

  // СТАТИЧНИЙ МЕТОД: приймає масив конфігурацій і показує всі
  static SHOW_ALL(configsArray) {
    return configsArray.map(config => new ElHtml(config).SHOW());
  }
  static RadioStation(els) {
    console.log(this);
  }
}

// ВИКОРИСТАННЯ В 1 РЯДОК:
document.addEventListener("DOMContentLoaded", () => {
  ElHtml.SHOW_ALL([
    { parent: "form", tag: "input", placeholder: "Логін" },
    { parent: "form", tag: "input", type: "password", placeholder: "Пароль" },
    { parent: "form", tag: "button", textContent: "Увійти" }
  ]);
});