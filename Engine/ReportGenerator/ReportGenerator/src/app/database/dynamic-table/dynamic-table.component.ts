import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Model} from "../../model/model";
import {Field} from "../../form-generator/models";

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class JDynamicTableComponent implements OnInit {
  get display(): boolean {
    return this._display;
  }

  @Input()
  set display(value: boolean) {
    this._display = value;
  }
  @Input()
  models: any[];
  @Input()
  fields: Field[];

  @Input()
  selected: any;

   private _display=false;

  @Output()
  selectedEv:EventEmitter<any> = new EventEmitter<any>();

  select() {
    this.selectedEv.emit(this.selected);
  }

  ngOnInit() {
  }


  onHide(ev){
    this._display=false;
  }


  cancel(){
    this._display=false;
  }
}
