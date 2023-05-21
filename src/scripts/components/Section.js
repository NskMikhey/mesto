export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  //метод, который отвечает за отрисовку всех элементов из масива
  renderItems() {
    this._renderedItems.forEach(this._renderer)
  }

  //метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
