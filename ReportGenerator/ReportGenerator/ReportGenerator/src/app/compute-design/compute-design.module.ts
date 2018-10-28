import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsComponent } from './tools/tools.component';
import { DesignPanelComponent } from './design-panel/design-panel.component';
import {AngularDraggableModule} from "angular2-draggable";
import {FormsModule} from "@angular/forms";
import {DialogModule} from "primeng/dialog";

@NgModule({
  imports: [
    CommonModule,AngularDraggableModule,FormsModule,DialogModule
  ],
  declarations: [ToolsComponent, DesignPanelComponent],
  exports:[DesignPanelComponent]
})
export class ComputeDesignModule { }
