import {Component, OnInit} from '@angular/core';
import {AbsenceDataProviderService} from "./absence.DataProviderService";
import {ActivatedRoute} from "@angular/router";
import {CustomResultType} from "../../database/tables.service";
import {ObligatedRange, ObligatedRangeDayTimes, ObligatedRangeWeeks, RangeType} from "./absence.models";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-absence-index',
  templateUrl: './absence-index.component.html',
  styleUrls: ['./absence-index.component.css'],
  providers: [AbsenceDataProviderService]
})
export class AbsenceIndexComponent implements OnInit {


  ObligatedRange: ObligatedRange;
  selectedWeek: ObligatedRangeWeeks;
  rangeTypes: { name: string, type: RangeType }[];


  constructor(public absenceDataProviderService: AbsenceDataProviderService,
              public  router: ActivatedRoute) {

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
    this.newNewObligatedRangeDayTime.Start = new Date();
    this.newNewObligatedRangeDayTime.End = new Date();

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
            this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].End = new Date(parseInt(milli));

            //End
            let temp2: any = this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].Start;

            var milli = temp2.replace(/\/Date\((-?\d+)\)\//, '$1');
            this.ObligatedRange.ObligatedRangeWeeks[i].ObligatedRangeDayTimes[j].Start = new Date(parseInt(milli));

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
    var id = this.router.snapshot.queryParams["id"];
    if (id) {
      this.loadById(id);
    } else {
      this.reorder();

    }

    this.initRangeTypes();


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
    return this.ObligatedRange.ObligatedRangeWeeks.filter(o => o.WeekNumber == num)
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
    this.rangeTypes.push({name: 'شب کاری', type: RangeType.NightWork})
    this.rangeTypes.push({name: 'تعطیل کاری', type: RangeType.NightWork})
    this.rangeTypes.push({name: 'استراحت', type: RangeType.Interrupion})
    this.rangeTypes.push({name: 'معمولی', type: RangeType.Normal})
    this.rangeTypes.push({name: 'اضافه کاری', type: RangeType.Overtime})
    this.rangeTypes.push({name: ' نوبت کاری : صبح و عصر', type: RangeType.ShiftWorkMorningAndAfternoon})
    this.rangeTypes.push({name: ' نوبت کاری : صبح و عصر و شب', type: RangeType.ShiftWorkMorningAndAfternoonAndNight})
    this.rangeTypes.push({name: ' نوبت کاری : صبح و شب یا عصر و شب', type: RangeType.ShiftWorkMorningAndAfternoon})
  }
}
