import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SQLServerSchemaProviderComponent } from './sqlserver-schema-provider.component';

describe('SQLServerSchemaProviderComponent', () => {
  let component: SQLServerSchemaProviderComponent;
  let fixture: ComponentFixture<SQLServerSchemaProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SQLServerSchemaProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SQLServerSchemaProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
