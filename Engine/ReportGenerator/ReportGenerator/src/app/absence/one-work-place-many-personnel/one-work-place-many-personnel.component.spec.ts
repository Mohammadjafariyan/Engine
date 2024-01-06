import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWorkPlaceManyPersonnelComponent } from './one-work-place-many-personnel.component';

describe('OneWorkPlaceManyPersonnelComponent', () => {
  let component: OneWorkPlaceManyPersonnelComponent;
  let fixture: ComponentFixture<OneWorkPlaceManyPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneWorkPlaceManyPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWorkPlaceManyPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
