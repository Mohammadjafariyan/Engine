import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Model, QueryModel} from "../../model/model";
import {TableService} from "primeng/table";
import {TablesService} from "../tables.service";
import {Field, generateDynamicFormFields} from "../../form-generator/models";
import {DataComponent} from "../../query-generator/data/data.component";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TableService]
})
export class TablesComponent implements OnInit {

  fields: Field[];
  models: Model[];
  selected: Model;

  @Input()
  display;

  @Output()
  selectedEv = new EventEmitter();

  constructor(public  tableService: TablesService,
              public DataComponent: DataComponent) {
  }

  selectedEvent(ev) {
    this.selected = ev;

    console.log(ev);
    var qm = new QueryModel();
    qm.Model = ev;
    qm.Query = this.DataComponent.currentQuery;
    this.DataComponent.models.push(qm);
  }


  select() {
    this.selectedEv.emit(this.selected);
  }

  ngOnInit() {
    this.tableService.getAllNames().toPromise().then(r => {
      this.models = r;
    })

    this.fields = generateDynamicFormFields(new Model());

  }

}
