const qs = (selector) => {
  return document.querySelectorAll(selector);
};

let index = 0;

document.onclick = () => {
  const elems = qs('.range__slider');
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", () => index = i, true);
  }

  console.log(index);
  const sliderElem = qs('.range__slider')[index];
  slide(sliderElem);
};

function slide(sl) {
  
  const thumbElem = sl.children[0];

  thumbElem.onmousedown = (e) => {

    const thumbCoords = getCoords(thumbElem);
    const shiftX = e.pageX - thumbCoords.left;
    // shiftY здесь не нужен, слайдер двигается только по горизонтали

    const sliderCoords = getCoords(sl);

    document.onmousemove = (e) => {
      //  вычесть координату родителя, т.к. position: relative
      let newLeft = e.pageX - shiftX - sliderCoords.left;

      // курсор ушёл вне слайдера
      if (newLeft < 0) {
        newLeft = 0;
      }
      const rightEdge = sl.offsetWidth - thumbElem.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumbElem.style.left = newLeft + 'px';
    }

    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = null;
    };

    return false; // disable selection start (cursor change)
  };

  thumbElem.ondragstart = () => {
    return false;
  };

  const getCoords = (elem) => { // кроме IE8-
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };
};