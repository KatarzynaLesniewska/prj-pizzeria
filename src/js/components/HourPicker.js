import BaseWidget from './BaseWidget.js';
import {settings, select} from '../settings.js';
import thisWidget from './DatePicker.js';


import utils from '../utils.js';


class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);

    //const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.dom.output

    initPlugin();
    thisWidget.value = thisWidget.dom.input;
  }

  initPlugin() {
    const thisWidget = this;

    rangeSlider.create(thisWidget.dom.input);

    const input = thisWidget.dom.input.addEventListener('change', function {
      thisWidget.value = thisWidget.dom.input;
    });
  }

  // Metoda parseValue ma przekazywać otrzymaną wartość do funkcji utils.numberToHour
  // i zwracać wartość otrzymaną z tej funkcji. Ta funkcja zamienia liczby na zapis
  // godzinowy, czyli np. 12 na '12:00', a 12.5 na '12:30'
  parseValue() {
    const thisWidget = this;

    return parseValue();
  }

  isValid() {
    const thisWidget = this;

    return true;
  }

  // Metoda renderValue ma zamieniać
  // zawartość elementu thisWidget.dom.output na wartość widgetu.
  renderValue() {
    const thisWidget = this;

    thisWidget.dom.output = thisWidget.value;
  }
}

export default HourPicker;
