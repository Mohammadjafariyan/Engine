import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAppComponent } from './form-app/form-app.component';
import { SaveComponent } from './save/save.component';
import {FormsModule} from "@angular/forms";
import {InputField} from "./models";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [FormAppComponent, SaveComponent],
  exports:[SaveComponent]
})
export class FormGeneratorModule { }
