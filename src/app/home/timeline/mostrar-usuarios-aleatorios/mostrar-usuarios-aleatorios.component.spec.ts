import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarUsuariosAleatoriosComponent } from './mostrar-usuarios-aleatorios.component';

describe('MostrarUsuariosAleatoriosComponent', () => {
  let component: MostrarUsuariosAleatoriosComponent;
  let fixture: ComponentFixture<MostrarUsuariosAleatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarUsuariosAleatoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarUsuariosAleatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
