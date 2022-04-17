import { Pipe, PipeTransform } from '@angular/core';
import * as wc from 'world-calendars';

@Pipe({
  name: 'date'
})

export class DateMomentPipe implements PipeTransform {
  dates;
  fromInstance;
  fromDate;
  fromDateObj;
  toInstance;
  toDate;
  toDateObj;

  transform(
    date: string | Date,
    from: 'gregorian' | 'jalali' | 'hebrew' | 'nepali' | string,
    to: 'gregorian' | 'jalali' | 'hebrew' | 'nepali' | string,
    outPut: 'string' | 'object' = 'string'
    ): any {

    date = date.toString();

    if (date.includes('-')) {
      this.dates = date.split('-');
    }

    if (date.includes('/')) {
      this.dates = date.split('/');
    }

    switch (from) {
      case 'gregorian':
        this.fromInstance = wc.instance();
        break;
      case 'jalali':
        this.fromInstance = wc.instance('persian', 'fa');
        break;
      case 'hebrew':
        this.fromInstance = wc.instance('hebrew', 'he');
        break;
      case 'nepali':
        this.fromInstance = wc.instance('nepali', 'ne');
        break;
    }

    this.prepareFrom();

    switch (to) {
      case 'gregorian':
        this.toInstance = wc.instance();
        break;
      case 'jalali':
        this.toInstance = wc.instance('persian', 'fa');
        break;
      case 'hebrew':
        this.toInstance = wc.instance('hebrew', 'he');
        break;
      case 'nepali':
        this.toInstance = wc.instance('nepali', 'ne');
        break;
    }

    this.prepareTo();

    if (outPut === 'string') {
      return `${this.toDateObj.year}/${this.toDateObj.month}/${this.toDateObj.day}`;
    } else {
      return this.toDateObj;
    }
  }

  prepareFrom() {
    this.fromDate = this.fromInstance.newDate(this.dates[0], this.dates[1], this.dates[2]);
    this.fromDateObj = this.retrieve(this.fromDate);
  }

  prepareTo() {
    const jD = (this.fromInstance.newDate(+this.fromDateObj.year, +this.fromDateObj.month, +this.fromDateObj.day)).toJD();
    this.toDate = this.toInstance.fromJD(jD);
    this.toDateObj = this.retrieve(this.toDate);
  }

  retrieve(date: any): {year: number; month: number; day:  number} {
    // eslint-disable-next-line no-underscore-dangle
    return {year: +date._year, month: +date._month, day: +date._day};
  }
}


// https://fullcalendar.io/demos
// https://www.npmjs.com/package/world-calendars
// https://github.com/kbwood/calendars
// http://keith-wood.name/calendars.html
// epoch


// import * as moment from 'jalali-moment';
// const momentDate = moment(date);
// return momentDate.format('jYYYY/jM/jD');
