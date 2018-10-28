import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColumnsAndJoinComponent } from './select-columns-and-join.component';

describe('SelectColumnsAndJoinComponent', () => {
  let component: SelectColumnsAndJoinComponent;
  let fixture: ComponentFixture<SelectColumnsAndJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColumnsAndJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColumnsAndJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
