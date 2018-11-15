import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevenSeaterComponent } from './eleven-seater.component';

describe('ElevenSeaterComponent', () => {
  let component: ElevenSeaterComponent;
  let fixture: ComponentFixture<ElevenSeaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevenSeaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevenSeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
