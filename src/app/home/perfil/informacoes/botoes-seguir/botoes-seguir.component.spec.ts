import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoTopComponent } from './botoes-seguir.component';

describe('BotaoTopComponent', () => {
  let component: BotaoTopComponent;
  let fixture: ComponentFixture<BotaoTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotaoTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
