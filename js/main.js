class ElHtml{
  #TagName
  #ClName;
  constructor(DataSet){
    this.#TagName = DataSet.TagName;
    this.#ClName = DataSet.ClName;
  }
  SHWO(){
    const el = document.createElement(this.#TagName);
    el.className = this.#ClName;
    console.log(el);
    return el;
  }
}
const imgs = {
  alt: "Description of the image",
  src: "img/w.png"
}
const ElHtmls = new ElHtml({TagName: "img", ClName: "my-image"});
const imgElement = ElHtmls.SHWO();
imgElement.src = imgs.src;
imgElement.alt = imgs.alt;
document.addEventListener("DOMContentLoaded", () => {
  ElHtmls.SHWO();
});