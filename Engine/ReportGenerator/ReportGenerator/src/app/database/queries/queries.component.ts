import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Field, generateDynamicFormFields} from "../../form-generator/models";
import {Model, Query} from "../../model/model";
import {TablesService} from "../tables.service";
import {QueriesService} from "../queries.service";
import {DynaButton, JDynamicTableComponent} from "../dynamic-table/dynamic-table.component";

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css'],
  providers:[QueriesService]
})
export class QueriesComponent implements OnInit {

  private _display;
   buttons: any[];
  get display() {
    return this._display;
  }

  @ViewChild('dynaTable')
  dynaTable:JDynamicTableComponent;

  @Input()
  set display(value) {
    this._display = value;
    this.dynaTable.display=value;
    this.ngOnInit();
  }

  fields: Field[];
  queries: Query[];
  selected: Query;


  @Output()
  selectedEv = new EventEmitter();

  constructor(public  queriesService: QueriesService) {
  }

  selectedEvent(e) {
    this.selected = e;
    this.selectedEv.emit(this.selected);
  }


  select() {
    this.selectedEv.emit(this.selected);
  }

  ngOnInit() {
    this.queriesService.getAllQueries().toPromise().then(r => {
      this.queries = r.result;
    });

    var b=new DynaButton();
    b.Name="حذف";
    b.onclick=(el:Query)=>{
      this.queriesService.deleteById(el.Id).toPromise().then(r => {
        alert(r.Message);
        this.queriesService.getAllQueries().toPromise().then(r => {
          this.queries = r.result;
        });
      });
    };
    this.buttons=[];
    this.buttons.push(b);


    this.fields = generateDynamicFormFields(new Query());
  }
}
