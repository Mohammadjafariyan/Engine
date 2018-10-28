import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Field, generateDynamicFormFields} from "../../form-generator/models";
import {Model, Query} from "../../model/model";
import {TablesService} from "../tables.service";
import {QueriesService} from "../queries.service";

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
  providers:[QueriesService]
})
export class QueriesComponent implements OnInit {

  fields: Field[];
  queries: Query[];
  selected: Query;

  @Input()
  display;

  @Output()
  selectedEv = new EventEmitter();

  constructor(public  queriesService: QueriesService) {
  }

  selectedEvent(e) {
    this.selected = e;
  }


  select() {
    this.selectedEv.emit(this.selected);
  }

  ngOnInit() {
    this.queriesService.getAllQueries().toPromise().then(r => {
      this.queries = r;
    })
    this.fields = generateDynamicFormFields(new Query());
  }
}
