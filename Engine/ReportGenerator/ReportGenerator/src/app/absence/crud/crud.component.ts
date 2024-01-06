import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";
import {ApiResult, CustomResultType} from "../../database/tables.service";

export interface IService{

  get(): Observable<ApiResult<any[]>>;

  save(model: any): Observable<ApiResult<any>>;

  delete(model: any): Observable<ApiResult<any>>;
}

export interface IFieldOption {
  label: string, value: any
}
export interface IField{

  label;
  name;
  type;
  value:any;
  controlType;
  required;
  validationMessage;
  options?:IFieldOption []
}
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  @ContentChild('columnHeaderContent') columnHeaderContent: TemplateRef<any>;
  @ContentChild('columnContent') columnContent: TemplateRef<any>;

  @Input()
  header;
  displayDialog: boolean;

  model: any = {};

  selectedModel: any;

  newModel: boolean;

  models: any[];

  @Input()
  service: IService;

  @Input()
  cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
  ];


  // ----------------------------- form builder
  @Input() formFields: IField[]  = [ ];
  @Input()
  form!: FormGroup;

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      // Handle form submission logic here
    } else {
      console.error('Form is invalid');
    }
  }
  // ----------------------------- form builder
  @Input()
  newFormHeader: any ='ثبت رکورد جدید';
@Input()
  editFormHeader: any = 'ویرایش رکورد';
  AddButtonTitle: any ='رکورد جدید';


  constructor() {}

  reload(){
    this.service.get().toPromise().then(res => {

      if (res.Status == CustomResultType.success){
        this.models = res.result
      }
    });

  }
  ngOnInit() {

    this.reload();
  }

  showDialogToAdd() {
    this.newModel = true;
    this.model = {};
    this.displayDialog = true;
  }

  save() {


    console.trace(this.selectedModel , this.form.value)
    this.synchronizeObjects(this.selectedModel,this.form.value);
    console.trace(this.selectedModel)


    this.service.save(this.selectedModel).toPromise()
      .then(s=>{

        this.model = null;
        this.displayDialog = false;

        this.reload();

      });

  }

  delete() {
    let index = this.models.indexOf(this.selectedModel);

    this.service.delete(this.models[index]).toPromise()
      .then(s=>{

        this.model = null;
        this.displayDialog = false;
        this.reload();

      });

  }



  cloneModel(c: any): any {
    let model = {};
    for (let prop in c) {
      model[prop] = c[prop];
    }
    return model;
  }


  selectCarWithButton(car: any) {
    this.selectedModel = car;

    this.newModel = false;
    this.model = this.cloneModel(car);
    console.trace(this.form.value);
    this.form.patchValue(this.model)
    this.displayDialog = true;
  }

  getType(value: any): string {
    return typeof value;
  }
  synchronizeObjects(source: any, newValues: any): void {
    for (const key in source) {
      if (source.hasOwnProperty(key) && newValues.hasOwnProperty(key)) {
        source[key] = newValues[key];
      }
    }
  }
}
