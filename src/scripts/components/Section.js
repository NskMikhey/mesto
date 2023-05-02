export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  //метод, который отвечает за отрисовку всех элементов из масива
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
