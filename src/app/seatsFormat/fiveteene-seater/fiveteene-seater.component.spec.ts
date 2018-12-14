import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveteeneSeaterComponent } from './fiveteene-seater.component';

describe('FiveteeneSeaterComponent', () => {
  let component: FiveteeneSeaterComponent;
  let fixture: ComponentFixture<FiveteeneSeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiveteeneSeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveteeneSeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
