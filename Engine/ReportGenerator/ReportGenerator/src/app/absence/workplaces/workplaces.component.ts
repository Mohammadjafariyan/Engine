import {Component, OnInit, ViewChild} from '@angular/core';
import {Workplace, WorkplacesService} from "../services/workplaces.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudComponent, IField} from "../crud/crud.component";
import {
  OneWorkPlaceManyPersonnelComponent
} from "../one-work-place-many-personnel/one-work-place-many-personnel.component";

@Component({
  selector: 'app-workplaces',
  templateUrl: './workplaces.component.html',
  styleUrls: ['./workplaces.component.css']
})
export class WorkplacesComponent implements OnInit {


  cols = [
    { field: 'Name', header: 'نام مکان' },
    { field: 'IsNotificationsEnabled', header: 'اطلاع رسانی' },
    { field: 'IsFaceRecognationEnabled', header: 'تشخیص چهره' },
    { field: 'oneDeviceEnabled', header: 'استفاده از یک دستگاه برای ورود برای این گروه کاری' },
    { field: 'UserClockTypesarr', header: 'انواع ساعت زنی' , display:(row:Workplace)=>{

      let str="<ul>";
      if(row.UserClockTypesarr)
        for (let i = 0; i < row.UserClockTypesarr.length; i++) {
            str+= '<li>'+ row.UserClockTypesarr[i].label +'</li>';
        }

      return str + '</ul>';

}},

  ];

  formFields: any[] = [];

  fields:IField[] = [

    {
      label: 'اطلاع رسانی فعال باشد',
      name: 'IsNotificationsEnabled',
      type: 'checkbox',
      value: true,
      controlType: 'textbox',
      required: false,
      validationMessage: 'Message is required',
    },
    {
      label: 'تشخیص چهره فعال باشد',
      name: 'IsFaceRecognationEnabled',
      type: 'checkbox',
      value:true,
      controlType: 'textbox',
      required: false,
      validationMessage: 'Message is required',
    },

    {
      label: 'استفاده از یک دستگاه برای ورود برای این گروه کاری',
      name: 'oneDeviceEnabled',
      type: 'checkbox',
      value: true,
      controlType: 'textbox',
      required: false,
      validationMessage: 'Email is required',
    },
    {
      label: 'نام مکان',
      name: 'Name',
      type: 'text',
      value: '',
      controlType: 'textbox',
      required: true,
      validationMessage: 'Name is required',
    },

    {
      label: 'انواع ساعت زنی',
      name: 'UserClockTypesarr',
      type:'listbox',
      value:null,
      options: [
        { label: 'GPS در محدوده مکان شرکت با', value: 0 },
        { label: 'گرفتن سلفی هنگام کارت زنی', value: 1 },
        { label: 'اسکن QRCode', value: 3 },
        { label: 'بعد از ورود به وای فای مکان (Wifi)', value: 4 },
      ],
      controlType: 'listbox',
      required: true,
      validationMessage: 'Category is required',
    }

  ];
  form!: FormGroup;

  constructor(private fb: FormBuilder ,
              public workplacesService:WorkplacesService) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();

  }

  createFormGroup(): FormGroup {
    const group: any = {};

    this.fields.forEach((field) => {
      group[field.name] = field.required
        ? [field.value , Validators.required]
        : [field.value ];
    });


    let fg=this.fb.group(group);
    return fg ;
  }



  display: boolean = false;

  public selectedOneId;
  oneTitle;
  @ViewChild(OneWorkPlaceManyPersonnelComponent) oneToManyForm: OneWorkPlaceManyPersonnelComponent;
  @ViewChild(CrudComponent) crudComponent: CrudComponent;
  shouldRenderOneWorkPlaceManyPersonnel: boolean = false;


  selected;
  showDialog(item: Workplace) {
    this.selectedOneId =item.Id;
    this.oneTitle =item.Name;
    this.display = true;

    this.selected=item;

  }

  submitOneToManyForm() {
    this.oneToManyForm.submit();

  }

  reload(){
    this.crudComponent.reload();
  }
}
