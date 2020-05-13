import BaseWidget from './BaseWidget.js';

// kolejna próba "debugging" lol
import utils from '../utils.js';


class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    // której przypisujemy pojedynczy element znaleziony w
    // thisWidget.dom.wrapper za pomocą selektora zapisanego
    // w select.widgets.datePicker.input
    thisWidget.dom.input;

    initPlugin();
  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);

    // która ma być datą późniejszą od thisWidget.minDate o
    // ilość dni zdefiniowaną w settings.datePicker.maxDaysInFuture
    // thisWidget.maxDate

    /// zainicjować plugin flatpickr z odpowiednimi opcjami
    flatpickr(thisWidget.dom.input, options);

    const options = {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
    },


    //  aby domyślna data była ustawiona na wartość thisWidget.minDate

    // najwcześniejsza data równa thisWidget.minDate

    // najpóźniejsza data do wybrania ma być równa thisWidget.maxDate

    // pierwszym dniem tygodnia zawsze był poniedziałek
    // (wzoruj się na przykładzie z dokumentacji, zawierającym firstDayOfWeek

    // restauracja nieczynna w pon, funkcję do ustawiania dat niedostępnych w
    // kalendarzu (zmodyfikuj przykład z dokumentacji

    // w momencie wykrycia zmiany wartości przez plugin, chcemy ustawiać wartość
    // właściwości thisWidget.value na dateStr widoczne w dokumentacji pluginu.
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
