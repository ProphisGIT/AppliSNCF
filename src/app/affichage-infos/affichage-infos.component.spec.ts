import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageInfosComponent } from './affichage-infos.component';

describe('AffichageInfosComponent', () => {
  let component: AffichageInfosComponent;
  let fixture: ComponentFixture<AffichageInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichageInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
