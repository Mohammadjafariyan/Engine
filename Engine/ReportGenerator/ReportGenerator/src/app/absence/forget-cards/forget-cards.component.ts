import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ForgetCardsService} from "../services/forget-cards.service";

@Component({
  selector: 'app-forget-cards',
  templateUrl: './forget-cards.component.html',
  styleUrl: './forget-cards.component.css'
})
export class ForgetCardsComponent implements OnInit {
  users: any[];
  selectedUser: any;
  onlyNotAccepted: any = true;
  from: any;
  to: any;

  clocksDataTable: any[];

  constructor(private forgetCardsService: ForgetCardsService) {
  }

  ngOnInit(): void {



  }


  dateFromChanged(value: any) {
    this.from = value;
  }

  dateToChanged(value: any) {
    this.to = value;

  }

  filter() {
    console.trace(this.from, this.to, this.selectedUser?.Id, this.onlyNotAccepted)
    this.forgetCardsService.get(this.from, this.to, this.selectedUser?.Id, this.onlyNotAccepted).subscribe(s => {

      console.trace(s)
      this.clocksDataTable = s.result;

    })
  }
}
