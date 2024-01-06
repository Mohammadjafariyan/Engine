import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePersonnelManyWorkplacesComponent } from './one-personnel-many-workplaces.component';

describe('OnePersonnelManyWorkplacesComponent', () => {
  let component: OnePersonnelManyWorkplacesComponent;
  let fixture: ComponentFixture<OnePersonnelManyWorkplacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnePersonnelManyWorkplacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePersonnelManyWorkplacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
