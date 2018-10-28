import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSchemaProviderComponent } from './db-schema-provider.component';

describe('DbSchemaProviderComponent', () => {
  let component: DbSchemaProviderComponent;
  let fixture: ComponentFixture<DbSchemaProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbSchemaProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbSchemaProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
