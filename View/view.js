export function createCategoryElement(id, clickHandler, scrollHandler) {
  const row = document.createElement("div");
  row.classList.add("row");
  const btn = document.createElement("button");
  btn.classList.add("accordion");
  btn.textContent = `Kategória: ${id}`;
  if (id === 0) btn.textContent = "Népszerű termékek";
  btn.addEventListener("click", clickHandler);
  row.appendChild(btn);
  const panel = document.createElement("div");
  panel.classList.add("panel");
  panel.classList.add(`panel-${id}`);
  panel.setAttribute("id", id);
  panel.addEventListener("scroll", scrollHandler);
  row.appendChild(panel);
  return row;
}

export function createProductElement(product) {
  const productEl = document.createElement("li");
  const productImg = document.createElement("div");
  productImg.classList.add("list-element-img");
  productImg.textContent = product.imgPath;
  productEl.textContent = product.name;
  productEl.classList.add("list-element");
  productEl.appendChild(productImg);
  return productEl;
}

export function createLoadingElement() {
  const loadingEl = document.createElement("div");
  loadingEl.setAttribute("id", "loading");
  loadingEl.classList.add("spinner");
  const imgEl = document.createElement("img");
  imgEl.alt = "Loading...";
  loadingEl.appendChild(imgEl);
  return loadingEl;
}
export function createListDivider() {
  return document.createElement("hr");
}

export function createLoadingEl() {
  const loadingEl = document.createElement("div");
  loadingEl.setAttribute("id", "loading");
  loadingEl.classList.add("spinner");
  const imgEl = document.createElement("img");
  imgEl.alt = "Loading...";

  loadingEl.appendChild(imgEl);
  return loadingEl;
}
