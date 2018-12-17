import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickettoprintComponent } from './tickettoprint.component';

describe('TickettoprintComponent', () => {
  let component: TickettoprintComponent;
  let fixture: ComponentFixture<TickettoprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickettoprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickettoprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
