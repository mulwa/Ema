import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoutynineSeaterComponent } from './foutynine-seater.component';

describe('FoutynineSeaterComponent', () => {
  let component: FoutynineSeaterComponent;
  let fixture: ComponentFixture<FoutynineSeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoutynineSeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoutynineSeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
