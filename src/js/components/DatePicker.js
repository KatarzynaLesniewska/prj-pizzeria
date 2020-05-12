import BaseWidget from './BaseWidget.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    // której przypisujemy pojedynczy element znaleziony w
    // thisWidget.dom.wrapper za pomocą selektora zapisanego
    // w select.widgets.datePicker.input
    thisWidget.dom.input

    initPlugin();
  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);

    // która ma być datą późniejszą od thisWidget.minDate o
    // ilość dni zdefiniowaną w settings.datePicker.maxDaysInFuture
    thisWidget.maxDate = ;

    /// zainicjować plugin flatpickr z odpowiednimi opcjami

  }

  parseValue() {
    const thisWidget = this;

    return parseValue();
  }

  isValid() {
    const thisWidget = this;

    return true;
  }

  // możesz ją stworzyć z pustą wartością, tylko po to,
  // aby nadpisać domyślną metodę w BaseWidget
  renderValue() {
    const thisWidget = this;
  }
}

export default DatePicker;
