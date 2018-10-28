import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComputeButton} from "../models";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  @Input()
  computeButtons: ComputeButton[];


  @Output()
  buttonSelected: EventEmitter<ComputeButton> = new EventEmitter<ComputeButton>();

  @Output()
  refreshed: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Output()
  removed: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {
  }

  ngOnInit() {
  }
  remove(){
    this.removed.emit(true);
  }
  refresh(){
    this.refreshed.emit(true);
  }
  select(button: ComputeButton) {
    this.buttonSelected.emit(button);
  }


}
