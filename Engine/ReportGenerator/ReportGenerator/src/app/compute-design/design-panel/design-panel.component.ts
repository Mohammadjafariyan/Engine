import {Component, Input, OnInit} from '@angular/core';
import {
  BetweenButtonType,
  ComputeButton,
  ComputedButtonType, ConstButtonType,
  InputButtonType,
  SelectButton,
  SelectButtonType
} from "../models";
import {cloneAll} from "../../query-generator/utility";

@Component({
  moduleId: 'DesignPanelComponent',
  selector: 'app-design-panel',
  templateUrl: './design-panel.component.html',
  styleUrls: ['./design-panel.component.css']
})
export class DesignPanelComponent implements OnInit {
  positionA = {x: 0, y: 0};
  positionB = {x: 160, y: 0};
  @Input()
  computeButtonsInDesign: ComputeButton[] = [];

  @Input()
  computeButtonsInTools: ComputeButton[] = [];

  dragOverButton: ComputeButton;
  inBounds = true;

  BetweenButtonType = BetweenButtonType;
  ComputedButtonType = ComputedButtonType;
  InputButtonType = InputButtonType;
  SelectButtonType = SelectButtonType;
  constButtonType=ConstButtonType;
  constructor() {
  }

  ngOnInit() {
  }

  buttonSelected(event: ComputeButton) {
    const copy:ComputeButton = cloneAll(event);

    let last = this.computeButtonsInDesign[this.computeButtonsInDesign.length - 1];
    if (last) {
      copy.position.x = last.position.x + 160;
    }

    copy.order=this.computeButtonsInDesign.length;

    this.fillPossibleValues(copy);
    this.computeButtonsInDesign.push(copy);
  }


  dragOver(event: ComputeButton) {
    this.dragOverButton = event;
  }

  onMoving(event) {
    if (!this.dragOverButton)
      return;

    const boxWidth = this.dragOverButton.position.x;
    const boxHeight = this.dragOverButton.position.y;

    if (this.positionA.x < this.positionB.x &&
      event.x + boxWidth >= this.positionB.x + boxWidth / 2 &&
      event.x <= this.positionB.x + boxWidth &&
      event.y + boxHeight >= this.positionA.y &&
      event.y <= this.positionA.y + boxHeight) {
      let tmp = this.positionB;
      this.positionB = this.positionA;
      this.positionA = tmp;
    } else if (this.positionA.x >= this.positionB.x &&
      event.x <= this.positionB.x + boxWidth / 2 &&
      event.x + boxWidth >= this.positionB.x &&
      event.y + boxHeight >= this.positionA.y &&
      event.y <= this.positionA.y + boxHeight) {
      let tmp = this.positionB;
      this.positionB = this.positionA;
      this.positionA = tmp;
    }
  }

  remove() {
    this.computeButtonsInDesign = this.computeButtonsInDesign.filter(a => !a.isSelected);
  }

  showRemoveConfirm() {
    this.toRemoveCount = this.computeButtonsInDesign.filter(a => a.isSelected).length;
  }

  display;
  toRemoveCount;

  select(event: ComputeButton) {
    event.isSelected = !event.isSelected;
  }

  refresh() {
    this.computeButtonsInDesign.forEach(a => {
      this.fillPossibleValues(a);
    })
  }

  fillPossibleValues(copy: any) {
    var isSelect = copy.type == SelectButtonType.multi ||
      copy.type == SelectButtonType.one ||
      copy.type == SelectButtonType.many

    if (isSelect) {
      var but = copy as SelectButton
      if (but.fillContent) {
        but.possibleValue = but.fillContent();
      }
    }
  }

  exportSQL(){

  }
}
