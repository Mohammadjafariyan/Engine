import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetCardsComponent } from './forget-cards.component';

describe('ForgetCardsComponent', () => {
  let component: ForgetCardsComponent;
  let fixture: ComponentFixture<ForgetCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForgetCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
