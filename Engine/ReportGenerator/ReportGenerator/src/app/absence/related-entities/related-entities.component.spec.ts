import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedEntitiesComponent } from './related-entities.component';

describe('RelatedEntitiesComponent', () => {
  let component: RelatedEntitiesComponent;
  let fixture: ComponentFixture<RelatedEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
