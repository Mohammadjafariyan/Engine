import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OneWorkplaceManyPersonnelService} from "../services/one-workplace-many-personnel.service";
import {RelatedEntitiesComponent} from "../related-entities/related-entities.component";

@Component({
  selector: 'app-one-work-place-many-personnel',
  templateUrl: './one-work-place-many-personnel.component.html',
  styleUrls: ['./one-work-place-many-personnel.component.css']
})
export class OneWorkPlaceManyPersonnelComponent implements OnInit {

  @Input()
  oneId: any;

  @Input('oneTitle')
  oneTitle: any;

  constructor(public oneWorkplaceManyPersonnelService:OneWorkplaceManyPersonnelService) { }

  ngOnInit() {
  }


  @ViewChild(RelatedEntitiesComponent) relatedEntitiesComponent: RelatedEntitiesComponent;
  submit() {
    this.relatedEntitiesComponent.submit();
  }


}
