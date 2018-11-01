import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Model, QueryModel} from "../../model/model";
import {TableService} from "primeng/table";
import {TablesService} from "../tables.service";
import {Field, generateDynamicFormFields} from "../../form-generator/models";
import {DataComponent} from "../../query-generator/data/data.component";
import {JDynamicTableComponent} from "../dynamic-table/dynamic-table.component";

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TableService]
})
export class TablesComponent implements OnInit {
  get display() {
    return this._display;
  }

  @ViewChild('dynaTable')
  dynaTable:JDynamicTableComponent;

  @Input()
  set display(value) {
    this._display = value;
    this.dynaTable.display=value;
  }

  fields: Field[];
  models: Model[];
  selected: Model;

   private _display;

  @Output()
  selectedEv = new EventEmitter();

  constructor(public  tableService: TablesService,
              public DataComponent: DataComponent,
              public chd:ChangeDetectorRef) {
  }

  selectedEvent(ev) {
    this.selected = ev;

    console.log(ev);
    var qm = new QueryModel();
    qm.Model = ev;
    qm.Query = this.DataComponent.currentQuery;
    this.DataComponent.models.push(qm);

    this.tableService.GetWithProperties(qm.Model.Id).toPromise().then(r => {
      qm.Model.Properties = r.result;
      qm.Model.AsName = qm.Model.Name;
      qm.Model.JoinTables=[];
    });

  }


  select() {
    this.selectedEv.emit(this.selected);
  }

  ngOnInit() {
    this.tableService.getAllNames().toPromise().then(r => {
      this.models = r.result;
    });

    this.fields = generateDynamicFormFields(new Model());

  }

}
