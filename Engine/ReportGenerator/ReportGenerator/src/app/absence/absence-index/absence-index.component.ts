import {Component, OnInit} from '@angular/core';
import {AbsenceDataProviderService} from "./absence.DataProviderService";
import {ActivatedRoute} from "@angular/router";
import {CustomResultType} from "../../database/tables.service";
import {ObligatedRange, ObligatedRangeDayTimes, ObligatedRangeWeeks, RangeType, System} from "./absence.models";
import {AppComponent} from "../../app.component";
import DayOfWeek = System.DayOfWeek;
import {MacroService} from "../macro-service";

@Component({
  selector: 'app-absence-index',
  templateUrl: './absence-index.component.html',
  styleUrls: ['./absence-index.component.css'],
  providers: [AbsenceDataProviderService]
})
export class AbsenceIndexComponent implements OnInit {

  weekNumNames = [
    'اول',
    'دوم',
    'سوم',
    'چهارم',
    'پنجم',
    'ششم',
    'هفتم',
    'هشتم',
    'نهم',
    'دهم',
  ]
  ObligatedRange: ObligatedRange;
  selectedWeek: ObligatedRangeWeeks;
  rangeTypes: { name: string, type: RangeType }[];

  getRangeTypeName(type) {
    let item = this.rangeTypes.find(f => f.type == type);
    if (item)
      return item.name;
    else return '';
  }

  constructor(public absenceDataProviderService: AbsenceDataProviderService,
              public router: ActivatedRoute) {

  }

  decreaseWeek() {

// آنهای که حذف نشده اند
    if (this.ObligatedRange.ObligatedRangeWeeks.filter(o => !o.IsRemoved).length > 7) {
      var isYes = confirm("آیا از حذف هفته آخر مطمئن هستید ؟");
      if (isYes) {

        // آخرین هفته را پیدا کن که حذف نشده است
        let notFirstWeek = this.ObligatedRange.ObligatedRangeWeeks.slice(7, this.ObligatedRange.ObligatedRangeWeeks.length - 1);

        if (!notFirstWeek.length || !notFirstWeek[0]) {
          throw new Error("خطا در سیستم : هفته آخری برای حذف نال است");
        }

        // برعکس کن و اولین حذف نشده را بردار تا با شماره هفته آن ایتم ، آن هفته حذف شود
        var last = notFirstWeek.reverse().find(n => !n.IsRemoved);

        // اگر از نوع جدید باشد یعنی قبلا در دیتابیس ذخیره نشده است
        if (!last.Id) {
          this.ObligatedRange.ObligatedRangeWeeks = this.ObligatedRange.ObligatedRangeWeeks.filter(wk => wk.WeekNumber != last.WeekNumber);
        } else {

          // فیلتر کن و با شماره آن هفته ، حذف کن
          this.ObligatedRange.ObligatedRangeWeeks
            .filter(wk => wk.WeekNumber == last.WeekNumber)
            .forEach(wk2 => {
              if (wk2.IsRemoved) {
                throw new Error("خطا در سیستم عملیات اشتباه ، این مورد قبلا حذف شده است");
              }
              wk2.IsRemoved = true;
            });
        }

      }
    }

    this.reorder();

  }

  increaseWeek() {
    var lastweeknumber = this.ObligatedRange.ObligatedRangeWeeks[0].WeekNumber;

    let week: ObligatedRangeWeeks[] = this.absenceDataProviderService.getWeek(lastweeknumber++);
    for (let i = 0; i < week.length; i++) {
      this.ObligatedRange.ObligatedRangeWeeks.push(week[i]);
    }

    this.reorder();

  }

  display = false;

  select(week: ObligatedRangeWeeks) {
    if (week.IsSelected == null) {
      week.IsSelected = false;
    }
    week.IsSelected = !week.IsSelected;

  }

  newNewObligatedRangeDayTime: ObligatedRangeDayTimes;

  NewObligatedRangeDayTime() {
    this.newNewObligatedRangeDayTime = new ObligatedRangeDayTimes();
    if (!this.selectedWeek.ObligatedRangeDayTimes) {
      this.selectedWeek.ObligatedRangeDayTimes = [];
    }
    this.newNewObligatedRangeDayTime.Start = '08:00';
    this.newNewObligatedRangeDayTime.End = '16:00';
    ;

    this.selectedWeek.ObligatedRangeDayTimes.push(this.newNewObligatedRangeDayTime);
  }

  setTimes(week: ObligatedRangeWeeks) {
    this.display = true;

    this.selectedWeek = week;
  }

  loadById(id) {
    this.absenceDataProviderService.GetById(id).toPromise().then(res => {

      if (res.Status == CustomResultType.success) {
        this.ObligatedRange = res.result;

        for (let i = 0; i < this.ObligatedRange.ObligatedRangeWeeks.length; i++) {
          for (let j = 0; j < this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes.length; j++) {
            //Start
            let temp: any = this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].End;

            var milli = temp.replace(/\/Date\((-?\d+)\)\//, '$1');
            this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].End = new Date(parseInt(milli)).toTimeString().slice(0, 5);;

            //End
            let temp2: any = this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].Start;

            var milli = temp2.replace(/\/Date\((-?\d+)\)\//, '$1');
            this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].Start = new Date(parseInt(milli)).toTimeString().slice(0, 5);

          }
        }
        this.reorder();

      } else {
        alert(res.Message);
      }
    })
  }

  ngOnInit() {
    this.ObligatedRange = new ObligatedRange();
    this.ObligatedRange.ObligatedRangeWeeks = this.absenceDataProviderService.getWeek(1);
    var id = this.router.snapshot.queryParams["recordId"];
    if (id) {
      this.loadById(id);
    } else {
      this.reorder();

      //this.ObligatedRange.OffDay=this.ObligatedRange.ObligatedRangeWeeks.find(f=>f.DayOfWeek==DayOfWeek.Friday).DayOfWeek;

    }

    this.initRangeTypes();


    this.macroList= MacroService.getMacroList();
  }

  remove(time: ObligatedRangeDayTimes) {
    time.IsRemoved = true;
  }

  save() {
    this.absenceDataProviderService.Save(this.ObligatedRange).toPromise().then(res => {
      AppComponent.ShowMsgByType('توجه', res.Status, res.Message);

      if (res.Status == CustomResultType.success) {
        this.loadById(res.result);
      }


    })
  }

  getWeekByNumber(num) {
    num++;
    return this.ObligatedRange.ObligatedRangeWeeks.filter(o => o.WeekNumber == num).reverse()
  }

  iterates: number[] = [];

  reorder() {

    let counter = 0;
    for (let i = 0; i < this.ObligatedRange.ObligatedRangeWeeks.length; i += 7) {
      counter++;
      let week = this.ObligatedRange.ObligatedRangeWeeks.slice(i, i + 7);
      for (let j = 0; j < week.length; j++) {
        week[j].WeekNumber = counter;
      }
    }
    this.iterates = [];
    for (let i = 0; i < counter; i++) {
      this.iterates.push(i);
    }

  }

  private initRangeTypes() {
    this.rangeTypes = [];
    this.rangeTypes.push({name: 'فاصله زمانی مجاز برای تأخیر', type: RangeType.Authorized_Delay_Gap})
    this.rangeTypes.push({name: 'شب کاری', type: RangeType.NightWork})
    this.rangeTypes.push({name: 'تعطیل کاری', type: RangeType.NightWork})
    this.rangeTypes.push({name: 'استراحت', type: RangeType.Interrupion})
    this.rangeTypes.push({name: 'معمولی', type: RangeType.Normal})
    this.rangeTypes.push({name: 'اضافه کاری', type: RangeType.Overtime})
    this.rangeTypes.push({name: ' نوبت کاری : صبح و عصر', type: RangeType.ShiftWorkMorningAndAfternoon})
    this.rangeTypes.push({name: ' نوبت کاری : صبح و عصر و شب', type: RangeType.ShiftWorkMorningAndAfternoonAndNight})
    this.rangeTypes.push({name: ' نوبت کاری : صبح و شب یا عصر و شب', type: RangeType.ShiftWorkMorningAndAfternoon})
  }

  selectWeekDays(weekDay: number, event: any) {


    weekDay++;

    let checkBoxStatus = event.srcElement.checked;


    for (let i = 1; i <= this.ObligatedRange.ObligatedRangeWeeks.length / 7; i++) {

      if (weekDay == i) {
        for (let j = i * 7 - 7; j < i * 7; j++) {


          if (checkBoxStatus == undefined) {
            checkBoxStatus = this.ObligatedRange.ObligatedRangeWeeks[j].IsSelected
          }

          this.ObligatedRange.ObligatedRangeWeeks[j].IsSelected = checkBoxStatus;
        }
      }
    }
  }

  copyTimeToWholeWeekDays() {
    this.copyTimeToWholeWeekDaysHelp(true)
  }

  copyTimeToWeekends() {

    this.copyTimeToWholeWeekDaysHelp(false)
  }

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  private copyTimeToWholeWeekDaysHelp(skipOffDays) {
    if (!this.selectedWeek.ObligatedRangeDayTimes || !this.selectedWeek.ObligatedRangeDayTimes.length) {
      return;
    }




    //for every week
    for (let i = 1; i <= this.ObligatedRange.ObligatedRangeWeeks.length / 7; i++) {

      // find particular week
      if (this.selectedWeek.WeekNumber == i) {

        // that week inside array
        for (let j = i * 7 - 7; j < i * 7; j++) {

          let length = this.selectedWeek.ObligatedRangeDayTimes;

          // make all empty
          for (let k = 0; k < length.length; k++) {

            // skip itself
            if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[j]) {
              continue;
            }

            // skip these days
            if (this.ObligatedRange.ObligatedRangeWeeks[i].IsOffDay == skipOffDays) {
              continue;
            }

           // if (!this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes) {
              this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes = [];
           // }


          }
          // add every time defined in this selected week
          for (let k = 0; k < length.length; k++) {

            // maybe array is null
            if (!this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes) {
              this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes = [];
            }

            // skip itself
            if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[j]) {
              continue;
            }

            // skip these days
            if (this.ObligatedRange.ObligatedRangeWeeks[j].IsOffDay == skipOffDays) {
              continue;
            }
            let clone1 = this.clone(this.selectedWeek.ObligatedRangeDayTimes[k]);
            this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes.push(
              // copy and paste
              clone1
            );
          }
        }
      }
    }
  }

  /*offDayChanged() {
    for (let i = 0; i < this.ObligatedRange.ObligatedRangeWeeks.length; i++) {
      this.ObligatedRange.ObligatedRangeWeeks[i]
    }
  }*/
  macroDisplay: any;
  cols = [
    { field: 'title', header: 'عنوان' },
    { field: 'description', header: 'توضیحات' },
    { field: 'select', header: 'انتخاب' }
  ];
  macroList: any;
  toggleOffday(weekDay: ObligatedRangeWeeks) {
    debugger;
    weekDay.IsOffDay = !weekDay.IsOffDay;

  }

  copyTimeToAllDays_help(skipOffDays) {
    if (!this.selectedWeek.ObligatedRangeDayTimes || !this.selectedWeek.ObligatedRangeDayTimes.length) {
      return;
    }




    //for every week
    for (let i =0; i < this.ObligatedRange.ObligatedRangeWeeks.length ; i++) {

      // find particular week
     // if (this.selectedWeek.WeekNumber == i) {

        // that week inside array
       // for (let j = i * 7 - 7; j < i * 7; j++) {

          let length = this.selectedWeek.ObligatedRangeDayTimes;

          // make all empty
          for (let k = 0; k < length.length; k++) {

            // skip itself
            if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[i]) {
              continue;
            }

            // skip these days
            if (this.ObligatedRange.ObligatedRangeWeeks[i].IsOffDay == skipOffDays) {
              continue;
            }

            // if (!this.ObligatedRange.ObligatedRangeWeeks[j].ObligatedRangeDayTimes) {
            this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes = [];
            // }


          }
          // add every time defined in this selected week
          for (let k = 0; k < length.length; k++) {

            // maybe array is null
            if (!this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes) {
              this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes = [];
            }

            // skip itself
            if (this.selectedWeek == this.ObligatedRange.ObligatedRangeWeeks[i]) {
              continue;
            }

            // skip these days
            if (this.ObligatedRange.ObligatedRangeWeeks[i].IsOffDay == skipOffDays) {
              continue;
            }
            let clone1 = this.clone(this.selectedWeek.ObligatedRangeDayTimes[k]);
            this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes.push(
              // copy and paste
              clone1
            );
          }
      //  }
      //}
    }
  }

  copyTimeToAllWeeksNormalDays() {
    this.copyTimeToAllDays_help(true);
  }

  copyTimeToAllWeeksNormalHolidays() {
    this.copyTimeToAllDays_help(false);

  }

  exportMacro() {
    console.log(JSON.stringify(this.ObligatedRange));

  }

  import(macro: any) {
    this.ObligatedRange= JSON.parse(macro.json);
  }
}
