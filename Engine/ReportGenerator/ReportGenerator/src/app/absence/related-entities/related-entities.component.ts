import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {Message, MessageService} from "primeng/api";
import {ApiResult, CustomResultType} from "../services/models";


export interface IRelatedService {
  get(oneId: any): Observable<ApiResult<IRelatedModel>>;

  save(model: any): Observable<ApiResult<any>>;

  delete(model: any): Observable<ApiResult<any>>;
}

export interface IRelatedModel {

  oneId: any;
  sourceModels: any;
  targetModels: any[];
}

@Component({
  selector: 'app-related-entities',
  templateUrl: './related-entities.component.html',
  styleUrls: ['./related-entities.component.css'],
  providers: [MessageService]
})
export class RelatedEntitiesComponent implements OnInit {


  sourceModels: any[];

  targetModels: any[];

  @Input()
  service: IRelatedService;

  @Input()
  sourceHeader: any;
  @Input()
  targetHeader: any;

  @Input()
  targetFilterPlaceholder: any;
  @Input()
  sourceFilterPlaceholder: any;

  @Input()
  oneId: any;

  loading: boolean = false;

  @ContentChild('itemTemplate') itemTemplate: TemplateRef<any>;
  @Input()
  oneTitle: any;
  @Input()
  manyTitle: any;
  @Input()
  filterBy: any;

  msgs: Message[] = [];
/*
  @Output()
  onSubmitEnd: EventEmitter<any> = new EventEmitter<any>();*/

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {

    this.sourceModels = [];
    this.targetModels = [];

    this.reload();
  }


  save() {
    this.loading = true;

    this.service.save({
      oneId: this.oneId,
      sourceModels: this.sourceModels,
      targetModels: this.targetModels,
    }).toPromise().then(result => {
      this.loading = false;
      if (result.Status == CustomResultType.success) {

       this.reload();

        this.msgs = [];
        this.msgs.push({severity:'success', summary:'پیغام', detail:'با موفقیت ثبت شد'});

        //this.messageService.add({severity:'success', summary: 'پیغام', detail: 'با موفقیت ثبت شد' , sticky:true});

      }
    }).catch(s => {

      this.loading = false;

    });
  }

  reload() {
    this.loading = true;
    this.service.get(this.oneId).toPromise().then(result => {
      this.loading = false;
      if (result.Status == CustomResultType.success) {

        this.sourceModels = result.result.sourceModels;
        this.targetModels = result.result.targetModels;
      }
    }).catch(s => {

      this.loading = false;

    });
  }

  submit() {
    this.save();
  }
}
