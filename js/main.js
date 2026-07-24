class ElHtml {
  #tag;
  #parent;
  #classes;
  #attrs = {};

  constructor(config) {
    // 1. Циклом перебираємо об'єкт конфігурації
    for (const [key, value] of Object.entries(config)) {
      if (key === "tag") this.#tag = value;
      else if (key === "parent") this.#parent = value;
      else if (key === "classes") this.#classes = value;
      else this.#attrs[key] = value; // Усі інші поля (src, alt, href, id...) зберігаємо як атрибути
    }
  }

  SHOW() {
    // Створюємо елемент
    const el = document.createElement(this.#tag || "div");

    // Додаємо класи
    if (this.#classes) el.className = this.#classes;

    // Застосовуємо всі зібрані атрибути та властивості (src, alt, textContent і т.д.)
    Object.assign(el, this.#attrs);

    // Додаємо в батік або за замовчуванням у body
    const parentEl = document.querySelector(this.#parent) || document.body;
    parentEl.appendChild(el);

    return el;
  }
}

// ==========================================
// ПРИКЛАДИ БАГАТОРАЗОВОГО ВИКОРИСТАННЯ:
// ==========================================

// 1. Створення зображення
const sliderImg = new ElHtml({
  parent: ".slider",
  tag: "img",
  classes: "ttt main-img",
  src: "img/w.png",
  alt: "Description of the image"
});

// 2. Створення посилання
const link = new ElHtml({
  parent: ".slider",
  tag: "a",
  classes: "btn-link",
  href: "https://google.com",
  target: "_blank",
  textContent: "Перейти на сайт"
});

document.addEventListener("DOMContentLoaded", () => {
  sliderImg.SHOW();
  link.SHOW();
});