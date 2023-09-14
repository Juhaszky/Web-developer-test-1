import { Category } from "../Models/Category.js";
import { Product } from "../Models/Product.js";
import * as view from "../View/view.js";

const box = document.querySelector(".box");
let lastOpenedPanelEL;
let isLoading = false;

const categories = [];

function getRandomProductsQuantity() {
  return Math.random() * (30 - 5) + 5;
}

function onInit() {
  generateData();
  createCategories();
}

function generateData() {
  for (let i = 0; i < 11; i++) {
    const products = [];
    for (let i = 0; i < getRandomProductsQuantity(); i++) {
      products.push(new Product("Termek_kep", `Termék: ${i + 1}`));
    }
    categories.push(new Category(i, products));
  }
}

function createCategories() {
  categories.forEach((category, i) => {
    const categoryElement = view.createCategoryElement(
      i,
      () => {
        onCategoryClick(i);
      },
      loadMoreProducts
    );
    box.appendChild(categoryElement);

    if (i === 0) {
      categoryElement.querySelector(".panel").style.display = "block";
      lastOpenedPanelEL = document.querySelector(`.panel-${i}`);
      fillProducts(lastOpenedPanelEL, i);
    }
  });
}

function onCategoryClick(i) {
  const panel = document.querySelector(`.panel-${i}`);

  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    lastOpenedPanelEL.style.display = "none";
    lastOpenedPanelEL = panel;
    panel.style.display = "block";
    if (!panel.classList.contains("Opened")) {
      fillProducts(panel, i);
      panel.classList.add("Opened");
    }
  }
}

function fillProducts(panel, id) {
  const products = categories[id].products;
  const loopAmount = Math.min(products.length, 10);
  categories[id].lastAskedProductNumber = loopAmount;

  const ulEl = document.createElement("ul");
  ulEl.classList.add("list");

  for (let i = 0; i < loopAmount; i++) {
    ulEl.appendChild(view.createProductElement(products[i]));
    ulEl.appendChild(view.createListDivider());
  }

  panel.innerHTML = "";
  panel.appendChild(ulEl);
}

function loadMoreProducts() {
  const category = categories[this.id];
  if (category.products.length !== category.lastAskedProductNumber) {
    if (isLoading) return;
    if (this.scrollHeight - this.scrollTop <= this.clientHeight + 10) {
      isLoading = true;

      const productsToLoad = category.products.slice(
        category.lastAskedProductNumber,
        category.lastAskedProductNumber + 10
      );
      if (productsToLoad.length > 0) {
        this.children[0].appendChild(view.createLoadingEl());
        setTimeout(() => {
          isLoading = false;
          this.children[0].removeChild(this.children[0].lastChild);
          productsToLoad.forEach((product) => {
            const newProduct = view.createProductElement(product);
            this.children[0].appendChild(newProduct);
            this.children[0].appendChild(view.createListDivider());
          });
        }, 1000);
        category.modifyLastAskedProductNumber(productsToLoad.length);
      }
    }
  }
}

onInit();
