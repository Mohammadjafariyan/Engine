import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignQueryComponent } from './design-query.component';

describe('DesignQueryComponent', () => {
  let component: DesignQueryComponent;
  let fixture: ComponentFixture<DesignQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
