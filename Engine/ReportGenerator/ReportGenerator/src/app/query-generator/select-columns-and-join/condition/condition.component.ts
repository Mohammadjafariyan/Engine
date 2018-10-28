import {Component, OnInit, ViewChild} from '@angular/core';
import {Field} from "../../../form-generator/models";
import {Property, WhereType, WhereValueType} from "../../../model/model";
import {AddParameterForm} from "../column-setting/column-setting.component";
import {ComputeButton} from "../../../compute-design/models";
import {ComputeDesignToolsButtonProviderService} from "./compute-design-tools-button-provider.service";
import {SQLExporterService} from "./sqlexporter.service";
import {DataComponent} from "../../data/data.component";
import {DesignPanelComponent} from "../../../compute-design/design-panel/design-panel.component";

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css'],
  providers: [ComputeDesignToolsButtonProviderService]
})
export class ConditionComponent implements OnInit {
  computeButtonsInTools: ComputeButton[];
  computeButtonsInDesign: ComputeButton[] = [];
  display: boolean;

  @ViewChild('appDesignPanel')
  appDesignPanel: DesignPanelComponent;

  constructor(public  ComputeDesignToolsButtonProviderService: ComputeDesignToolsButtonProviderService,
              public SQLExportservice: SQLExporterService,
              public DataComponent: DataComponent) {
  }

  export() {
    this.DataComponent.WhereComputeButtons = this.appDesignPanel.computeButtonsInDesign;
    this.DataComponent.WhereStatement = this.SQLExportservice.export(this.appDesignPanel.computeButtonsInDesign);
  }

  ngOnInit() {
    if (!this.computeButtonsInTools) {
      //INIT
      this.computeButtonsInTools =
        this.ComputeDesignToolsButtonProviderService.getWhereDesignTools();
    }
  }

}


