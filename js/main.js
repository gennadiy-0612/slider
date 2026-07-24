const img = {}
class ElHtml {
  #TagName;
  #CLASS;
  #ALT;
  #SRC;
  constructor(DataSet) {
    this.#TagName = DataSet.TagName;
    this.#CLASS = DataSet.classes;
    this.#ALT = DataSet.alt;
    this.#SRC = DataSet.src;
    console.log(this);
    for (const [key, value] of Object.keys(DataSet)) {
      console.log(`${key}: ${value}`);
    }
  }
  SHWO() {
    const el = document.createElement(this.#TagName);
    el.papa = document.querySelectorAll(".slider");
    el.papa[0].appendChild(el);
    el.setAttribute("class", this.#CLASS);
    el.setAttribute("alt", this.#ALT);
    el.setAttribute("src", this.#SRC);
    return el;
  }
}
img.TagName = "img";
img.classes = "ttt";
img.alt = "Description of the image";
img.src = "img/w.png";
const ElHtmls = new ElHtml(img);
document.addEventListener("DOMContentLoaded", () => {
  ElHtmls.SHWO();
});