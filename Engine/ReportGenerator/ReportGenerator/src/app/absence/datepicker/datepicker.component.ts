import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css'

})
export class DatepickerComponent implements OnInit {

  years: any[];
  year: any;

  months: any[];
  month: any;

  days: any[];
  day: any;
  dateValue: any;

  @Input()
  label;

  @Output()
  dateValueChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {

    let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    console.log(today);

    this.dateValue = today;
    this.dateValueChanged.emit(this.dateValue)


    this.year = this.getYear(today)
    this.month = this.getMonth(today)
    this.day = this.getDay(today)


    this.years = []
    let currentYear = parseInt(this.year);
    for (let i = currentYear - 10; i < currentYear + 10; i++) {
      let value = "";
      if (i < 10) {
        value = "0" + i.toString()
      } else {
        value = i.toString();
      }
      this.years.push({name: i.toString(), value: value});
    }
    this.years = this.years.reverse();
    this.year = this.years.find(f => f.value === this.year.toString())

    this.months = []
    for (let i = 1; i <= 12; i++) {
      let value = "";
      if (i < 10) {
        value = "0" + i.toString();
      } else {
        value = i.toString();
      }
      this.months.push({name: i.toString(), value: value});
    }
    this.month = this.months.find(f => f.name === this.month.toString())

    this.days = []
    for (let i = 1; i < 31; i++) {
      let value = "";
      if (i < 10) {
        value = "0" + i.toString();
      } else {
        value = i.toString();
      }
      this.days.push({name: i.toString(), value: value});
    }

    this.day = this.days.find(f => f.name === this.day.toString())

  }


  dateChange() {

    /*if (moment(`${this.year}/${this.month}/${this.day}`, 'jYYYY/jM/jD').isValid() == false) {

      this.dateValue = 'تاریخ انتخاب شده اشتباه است'
      return
    }*/


    this.dateValue = `${this.year.value}/${this.month.value}/${this.day.value}`;
    this.dateValueChanged.emit(this.dateValue)

  }

  getYear(today) {
    return today.toString().split('/')[0]
  }

  getMonth(today) {
    return today.toString().split('/')[1]
  }

  getDay(today) {
    return today.toString().split('/')[2]
  }

  monthChange() {

    if (parseInt(this.month.value) <= 6) {
      this.days.push({name: "31", value: "31"})
    } else {
      this.days = this.days.filter(f => f.name != "31")

    }

    if (parseInt(this.day.value) == 31) {

      this.day = this.days.find(f=>f.value ==="30")
    }
  }


}
