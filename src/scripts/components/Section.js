export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  //метод, который отвечает за отрисовку всех элементов из масива
  renderItems(dataCard) {
    dataCard.forEach(element => {
      this._renderer(element)
    })
  }

  //метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(item) {
    this._containerSelector.prepend(item);
  }
}
