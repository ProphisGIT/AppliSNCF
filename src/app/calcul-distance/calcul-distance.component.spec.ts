import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculDistanceComponent } from './calcul-distance.component';

describe('CalculDistanceComponent', () => {
  let component: CalculDistanceComponent;
  let fixture: ComponentFixture<CalculDistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculDistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
