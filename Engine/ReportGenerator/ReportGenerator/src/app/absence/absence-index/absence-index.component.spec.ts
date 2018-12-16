import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AbsenceIndexComponent} from './absence-index.component';
import {By} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {absenceroutes, AbsenceRoutingModule} from "../abscence-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {FormGeneratorModule} from "../../form-generator/form-generator.module";
import {DialogModule} from "primeng/dialog";
import {CalendarModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('AbsenceIndexComponent', () => {
  let component: AbsenceIndexComponent;
  let fixture: ComponentFixture<AbsenceIndexComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceIndexComponent],
      imports: [
        CommonModule,
        AbsenceRoutingModule,
        RouterTestingModule.withRoutes(absenceroutes),
        HttpClientModule,
        FormGeneratorModule, DialogModule,
        CalendarModule,
        FormsModule,


      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('reorder teset', () => {
    component.reorder();
    component.ObligatedRange.ObligatedRangeWeeks.forEach(o => {
      expect(o.WeekNumber).toBe(1);
    })
  });

  it('increaseWeek', () => {

    var el = fixture.debugElement.nativeElement.querySelector('#increaseWeek');
    el.click();

    expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBe(14);

    fixture.detectChanges();
    var cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(15);


    el.click();
    expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBe(21);


  });

  it('initial Week numbers', () => {
    component.ObligatedRange.ObligatedRangeWeeks.forEach(w => {
      expect(w.WeekNumber).toBe(1);
    })
  });


  it('decrease Week with 0 ids', () => {
    var increase = fixture.debugElement.nativeElement.querySelector('#increaseWeek');
    increase.click();
    increase.click();

    var l = component.ObligatedRange.ObligatedRangeWeeks.length;

    var el = fixture.debugElement.nativeElement.querySelector('#decreaseWeek');
    el.click();
    el.click();
    debugger;

    expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBe(7);


  });


  it('decrease Week with fake database ids', () => {
    var increase = fixture.debugElement.nativeElement.querySelector('#increaseWeek');
    increase.click();
    increase.click();

    // fake ids
    component.ObligatedRange.ObligatedRangeWeeks.forEach(o=>{
      o.Id=Math.random()*10*Math.random()*10;
    });

    var l = component.ObligatedRange.ObligatedRangeWeeks.length;

    var el = fixture.debugElement.nativeElement.querySelector('#decreaseWeek');
    el.click();
    el.click();
debugger;

    //expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBe(21);

    var items = component.ObligatedRange.ObligatedRangeWeeks.filter(o => o.IsRemoved);
    var removedItemsLenght;
    if (items)
    {
      removedItemsLenght = items.length;
    }
    expect(removedItemsLenght).toBe(14);


    var cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(8);

  });

/*
  it('test decrease Week alone', () => {
    var l = component.ObligatedRange.ObligatedRangeWeeks.length;
    component.increaseWeek();
    expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBeLessThan(l);


    var removedItemsLenght = component.ObligatedRange.ObligatedRangeWeeks.filter(o => o.IsRemoved).length;
    expect(removedItemsLenght).toBe(8);


    var cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(8);

  });*/


  it('reorder Week numbers', () => {
    component.increaseWeek();
    component.increaseWeek();
    component.increaseWeek();

    expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBe(28);

    component.ObligatedRange.ObligatedRangeWeeks.slice(0, 7).forEach(w => {
      expect(w.WeekNumber).toBe(1);
    })
    component.ObligatedRange.ObligatedRangeWeeks.slice(7, 14).forEach(w => {
      expect(w.WeekNumber).toBe(2);
    })
    component.ObligatedRange.ObligatedRangeWeeks.slice(14, 21).forEach(w => {
      expect(w.WeekNumber).toBe(3);
    })

    component.ObligatedRange.ObligatedRangeWeeks.slice(21, 28).forEach(w => {
      expect(w.WeekNumber).toBe(4);
    })
  });

/*
  it('reorder Week numbers', () => {
    component.increaseWeek();
    component.increaseWeek();

    component.save();

    expect(component.ObligatedRange.ObligatedRangeWeeks.length).toBe(28);

    component.ObligatedRange.ObligatedRangeWeeks.slice(0, 7).forEach(w => {
      expect(w.WeekNumber).toBe(1);
    })
    component.ObligatedRange.ObligatedRangeWeeks.slice(7, 14).forEach(w => {
      expect(w.WeekNumber).toBe(2);
    })
    component.ObligatedRange.ObligatedRangeWeeks.slice(14, 21).forEach(w => {
      expect(w.WeekNumber).toBe(3);
    })

    component.ObligatedRange.ObligatedRangeWeeks.slice(21, 28).forEach(w => {
      expect(w.WeekNumber).toBe(4);
    })
  });*/
});
