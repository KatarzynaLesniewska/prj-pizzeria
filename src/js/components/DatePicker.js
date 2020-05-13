import BaseWidget from './BaseWidget.js';

// kolejna próba "debugging" lol
import utils from '../utils.js';


class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    //const thisWidget = this;

    // której przypisujemy pojedynczy element znaleziony w
    // thisWidget.dom.wrapper za pomocą selektora zapisanego
    // w select.widgets.datePicker.input
    //thisWidget.singleElem = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    initPlugin();
  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);

    // która ma być datą późniejszą od thisWidget.minDate o
    // ilość dni zdefiniowaną w settings.datePicker.maxDaysInFuture
    thisWidget.maxDate = thisWidget.minDate + settings.datePicker.maxDaysInFuture;

    // zainicjować plugin flatpickr z odpowiednimi opcjami
    // flatpickr(thisWidget.dom.input, {altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d",});
    flatpickr(thisWidget.dom.input, options);

    const options = {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y- m - d",
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      disable: [
        function (date) {
          // return true to disable
          return (date.getDay() === 1);
        }
      ],
      locale: {
        firstDayOfWeek: 1 // start week on Monday
      },
    }

    // w momencie wykrycia zmiany wartości przez plugin, chcemy ustawiać wartość
    // właściwości thisWidget.value na dateStr widoczne w dokumentacji pluginu.
    instance.config.onChange.push(function() { thisWidget.value} );

    onChange: function(dateStr) {
      //...
    },
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
