import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarSeguidoresSeguindoComponent } from './mostrar-seguidores-seguindo.component';

describe('MostrarSeguidoresSeguindoComponent', () => {
  let component: MostrarSeguidoresSeguindoComponent;
  let fixture: ComponentFixture<MostrarSeguidoresSeguindoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarSeguidoresSeguindoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarSeguidoresSeguindoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
