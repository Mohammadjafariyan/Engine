import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlQueryGeneratorComponent } from './sql-query-generator.component';
import {DataComponent} from "../../data/data.component";
import {DbSchemaProviderComponent} from "../../db-schema-provider/db-schema-provider.component";

describe('SqlQueryGeneratorComponent', () => {
  let component: SqlQueryGeneratorComponent;
  let fixture: ComponentFixture<SqlQueryGeneratorComponent>;
  let dataComponent: DataComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlQueryGeneratorComponent ]
      ,providers:[DataComponent,DbSchemaProviderComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlQueryGeneratorComponent);
    dataComponent = TestBed.createComponent(DataComponent).componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    //component.Generate(dataComponent.selectedProperties)
    expect(component).toBeTruthy();
  });
});
