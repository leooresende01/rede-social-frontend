import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFotosComponent } from './card-fotos.component';

describe('CardFotosComponent', () => {
  let component: CardFotosComponent;
  let fixture: ComponentFixture<CardFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
