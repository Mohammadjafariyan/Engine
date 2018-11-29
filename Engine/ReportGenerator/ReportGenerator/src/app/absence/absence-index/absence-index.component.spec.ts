import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceIndexComponent } from './absence-index.component';

describe('AbsenceIndexComponent', () => {
  let component: AbsenceIndexComponent;
  let fixture: ComponentFixture<AbsenceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
