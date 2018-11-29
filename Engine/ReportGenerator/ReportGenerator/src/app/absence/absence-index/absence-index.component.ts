import {Component, OnInit} from '@angular/core';
import {AbsenceDataProviderService} from "./absence.DataProviderService";
import {ActivatedRoute} from "@angular/router";
import {CustomResultType} from "../../database/tables.service";
import {ObligatedRange, ObligatedRangeDayTimes, ObligatedRangeWeeks} from "./absence.models";
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


  constructor(public absenceDataProviderService: AbsenceDataProviderService,
              public  router: ActivatedRoute) {

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

  loadById(id){
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

      } else {
        alert(res.Message);
      }
    })
  }

  ngOnInit() {
    this.ObligatedRange = new ObligatedRange();
    this.ObligatedRange.ObligatedRangeWeeks = this.absenceDataProviderService.getWeek();
    var id = this.router.snapshot.queryParams["id"];
    if (id) {
      this.loadById(id);
    }


  }

  remove(time: ObligatedRangeDayTimes) {
    time.IsRemoved = true;
  }

  save() {
    this.absenceDataProviderService.Save(this.ObligatedRange).toPromise().then(res => {
      AppComponent.ShowMsgByType('توجه', res.Status, res.Message);

      if(res.Status==CustomResultType.success){
        this.loadById(res.result);
      }

    })
  }

}
