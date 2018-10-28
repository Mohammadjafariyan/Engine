import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Model} from "../../model/model";
import {TablesService} from "../../database/tables.service";
import {Field} from "../../form-generator/models";

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class JDynamicTableComponent implements OnInit {
  @Input()
  models: any[];
  @Input()
  fields: Field[];

  @Output()
  selected: any;

  @Input()
  display;

  @Output()
  selectedEv = new EventEmitter();

  select() {
    this.selectedEv.emit(this.selected);
  }

  ngOnInit() {
  }

}
