import {select, templates} from '../settings.js';
import AmountWidget from './amountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

// import app from '../app.js';
// import thisApp from '../app.js';
// import thisWidget from './DatePicker.js';

class Booking {
  constructor(wrapper) {
    const thisBooking = this;

    // ??? wywoływać metodę render, przekazując jej argument, który otrzymuje z app.initBooking
    // thisBooking.render(app.initBooking);
    thisBooking.render(wrapper);
    thisBooking.initWidget();
    thisBooking.getData();
  }

  getData() {
    const thisBooking = this;

  }

  render(wrapper) {
    const thisBooking = this;

    // stwórz właściwość thisBooking.dom.datePicker
    // i zapisz w niej element pasujący do selektora
    // zapisanego w select.widgets.datePicker.wrapper,
    // wyszukany we wrapperze zapisanym w tej klasie.
    thisBooking.dom.datePicker = thisWidget.dom.input;

    // generowanie kogu html za pomoca szablonu
    const generatedHTML = templates.bookingWidget();

    // pusty obiekt
    thisBooking.dom = {};

    // ??? zapisywać do tego obiektu właściwość wrapper równą otrzymanemu argumentowi,
    thisBooking.dom.push(thisApp.bookingElem == app.initBooking);

    // ??? zawartość wrappera zamieniać na kod HTML wygenerowany z szablonu
    generatedHTML;

    // ??? zapisywać pojedynczy element znaleziony we wrapperze i pasujący do selektora
    // thisBooking.dom.peopleAmount = == select.booking.peopleAmount;

    // ??? analogicznie do peopleAmount znaleźć i zapisać element dla hoursAmount
    // thisBooking.dom.hoursAmount = == select.booking.hoursAmount;
  }

  initWidget() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);

    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);

    thisBooking.HourPicker = new HourPicker(thisBooking.dom.datePicker);
  }
}

export default Booking;
