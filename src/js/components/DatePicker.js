import BaseWidget from './BaseWidget.js';
import {utils} from '../utils.js';
import {settings, select} from '../settings.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;

    // której przypisujemy pojedynczy element znaleziony w
    // thisWidget.dom.wrapper za pomocą selektora zapisanego
    // w select.widgets.datePicker.input
    //thisWidget.singleElem = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    // initPlugin();
    thisWidget.initPlugin();

    /*
    thisWidget.parseValue();
    thisWidget.isValid();
    thisWidget.renderValue();
    */
  }

  initPlugin() {
    const thisWidget = this;

    // data początku zakresu
    // data początkowa ustawiona dla DatePickera
    // tu się znajduje OBIEKT daty
    // tego/ takiego czegoś podobno nie ma
    // thisBooking.datePicker.minDate

    thisWidget.minDate = new Date(thisWidget.value);

    // która ma być datą późniejszą od thisWidget.minDate o
    // ilość dni zdefiniowaną w settings.datePicker.maxDaysInFuture utils.addDays
    // thisWidget.maxDate = thisWidget.minDate + settings.datePicker.maxDaysInFuture;
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);


    // data końcowa zakresu
    // tego tez podobno nie ma ...
    // thisBooking.datePicker.maxDate

    const options = {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
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

      // w momencie wykrycia zmiany wartości przez plugin, chcemy ustawiać wartość
      // właściwości thisWidget.value na dateStr widoczne w dokumentacji pluginu.
      // lnijkę poniżej niby mozna wywalić
      // instance.config.onChange.push(function() {} );

      onChange: function (dateStr) {
        // dateStr = thisWidget.value;
        thisWidget.value = dateStr;
      },

      // zainicjować plugin flatpickr z odpowiednimi opcjami
      // flatpickr(thisWidget.dom.input, {altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d",});
      // flatpickr(thisWidget.dom.input, options);
    }

    // zainicjować plugin flatpickr z odpowiednimi opcjami
    // flatpickr(thisWidget.dom.input, {altInput: true, altFormat: "F j, Y", dateFormat: "Y-m-d",});
    // ?????? czy tak  ma być????
    thisWidget.flatpickr(thisWidget.dom.input, options);
  }

  // ma jedynie zwracać argument
  parseValue() {
    const thisWidget = this;

    // return parseValue(thisWidget.value);
    // return parseValue();
    return true;
  }

  // ma zwracać true
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
