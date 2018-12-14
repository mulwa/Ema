import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixteenSeaterComponent } from './sixteen-seater.component';

describe('SixteenSeaterComponent', () => {
  let component: SixteenSeaterComponent;
  let fixture: ComponentFixture<SixteenSeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixteenSeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixteenSeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
