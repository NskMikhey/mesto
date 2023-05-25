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

  //Добавляет созданный элемент в начало контейнера
  addItem(item) {
    this._containerSelector.prepend(item);
  }

  //Добавляет элемент в конец контейнера
  addItem(item) {
    this._containerSelector.append(item);
  }
}
