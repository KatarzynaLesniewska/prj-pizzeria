import { select, templates, settings, classNames } from '../settings.js';
import {utils} from '../utils.js';
import AmountWidget from './amountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

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

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };

    // console.log('getData params', params);

    const urls = {
      booking: settings.db.url + '/' + settings.db.booking
        + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event
        + '?' + params.eventsCurrent.join('&'),
      eventsRepeat: settings.db.url + '/' + settings.db.event
        + '?' + params.eventsRepeat.join('&'),
    };

    // console.log('getData urls', urls);

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function (allResponse) {
        const bookingResponse = allResponse[0];
        const eventsCurrentResponse = allResponse[1];
        const eventsRepeatResponse = allResponse[2];
        return Promise.all([
          bookingResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function ([bookings, eventsCurrent, eventsRepeat]) {
        // console.log(bookings);
        // console.log(eventsCurrent);
        // console.log(eventsRepeat);

        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)) {
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }

    // console.log('thisBooking.booked', thisBooking.booked);

    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
      // console.log('loop', hourBlock);
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }

      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
    ) {
      allAvailable = true;
    }

    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);

      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable
        &&
        typeof thisBooking.booked[thisBooking.date][thisBooking.hour] !== 'undefined'
        &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  render(wrapper) {
    const thisBooking = this;

    // generowanie kodu html za pomocą szablonu
    const generatedHTML = templates.bookingWidget();

    // pusty obiekt
    thisBooking.dom = {};

    thisBooking.dom.wrapper = wrapper;

    // zawartość wrappera zamieniać na kod HTML wygenerowany z szablonu
    thisBooking.dom.wrapper.innerHTML = generatedHTML;

    // zapisywać pojedynczy element znaleziony we wrapperze i pasujący do selektora thisBooking.dom.peopleAmount;
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);

    // analogicznie do peopleAmount znaleźć i zapisać element dla hoursAmount thisBooking.dom.hoursAmount;
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);

    // stwórz właściwość thisBooking.dom.datePicker i zapisz w niej element pasujący do selektora zapisanego w select.widgets.datePicker.wrapper, wyszukany we wrapperze zapisanym w tej klasie.
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);

    // już nie wiem co to
    // thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);

    // ??? to też ??? zapisywać do tego obiektu właściwość wrapper równą otrzymanemu argumentowi,
    // thisBooking.dom.push(thisApp.bookingElem == app.initBooking);
  }

  initWidget() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);

    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function () {
      thisBooking.updateDOM();
    });

    /* czy to ma być tu czy gdzies indziej?
    thisBooking.dom.table.addEventListener('clicked', function (event) {
      event.preventDefault();
      thisBooking.table.classList.add(classNames.booking.tableBooked);
    });
    */

    // odznaczanie stolika kiedy klient zmieni datę lub godzinę
    thisBooking.dom.datePicker.addEventListener('updated', function (event) {
      event.preventDefault();
      thisBooking.table.classList.remove(classNames.booking.tableBooked);
    });

    thisBooking.dom.hourPicker.addEventListener('updated', function (event) {
      event.preventDefault();
      thisBooking.table.classList.remove(classNames.booking.tableBooked);
    });
  }


  /*   to mam przeniesc do initActions, ale w Booking nie ma initActions.....
  clickedTable() {
    const thisBooking = this;

    thisBooking.dom.table.addEventListener('clicked', function (event) {
      event.preventDefault();
      thisBooking.table.classList.add(classNames.booking.tableBooked);
    });
  }
  */


  /*  to mam przenieść do initWidget
  unmarkTable() {
    const thisBooking = this;

    thisBooking.dom.datePicker.addEventListener('updated', function (event) {
      event.preventDefault();
      thisBooking.table.classList.remove(classNames.booking.tableBooked);
    });

    thisBooking.dom.hourPicker.addEventListener('updated', function (event) {
      event.preventDefault();
      thisBooking.table.classList.remove(classNames.booking.tableBooked);
    });
  }
  */


  sendBooking() {
    const thisBooking = this;

    // wysyłanie zamówienia na endpoint booking? metodą POST ???
    const url = settings.db.url + '/' + settings.db.booking;

    const payload = {
      // czy może: thisBooking.booked.date albo thisBooking.item.date ??
      address: 'test',
      date: thisBooking.date,
      hour: thisBooking.hour,
      duration: thisBooking.duration,
      table: thisBooking.table,
      startHour: thisBooking.startHour,
      hourBlock: thisBooking.hourBlock,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function (response) {
        // const sendBookingResponse;
        return response.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse:', parsedResponse);
        // thisBooking.parseData(parsedResponse);

        if (parsedResponse) {
          thisBooking.table.classList.remove(classNames.booking.tableBooked);
        }
      });

    // gdzie wywyołać tą metodę?? w constructorze ???
  }
}

export default Booking;
