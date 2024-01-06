import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CustomResult} from "../../database/tables.service";
import {Global} from "../absence-index/absence.DataProviderService";
import {Workplace, WorkplacesService} from "../services/workplaces.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IField} from "../crud/crud.component";

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
    { field: 'oneDeviceEnabled', header: 'استفاده از یک دستگاه برای ورود برای این گروه کاری' },
    { field: 'UserClockTypesarr', header: 'انواع ساعت زنی' },

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
      value:true,
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




}
