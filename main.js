const sliderElem = document.querySelectorAll('.slider')[0];
const thumbElem = sliderElem.children[0];

thumbElem.onmousedown = function(e) {
  const thumbCoords = getCoords(thumbElem);
  const shiftX = e.pageX - thumbCoords.left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали

  const sliderCoords = getCoords(sliderElem);

  document.onmousemove = function(e) {
    //  вычесть координату родителя, т.к. position: relative
    let newLeft = e.pageX - shiftX - sliderCoords.left;

    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    }
    const rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumbElem.style.left = newLeft + 'px';
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false; // disable selection start (cursor change)
};

thumbElem.ondragstart = function() {
  return false;
};

function getCoords(elem) { // кроме IE8-
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}