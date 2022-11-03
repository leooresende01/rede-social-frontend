import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPessoasQueCurtiramComponent } from './mostrar-pessoas-que-curtiram.component';

describe('MostrarPessoasQueCurtiramComponent', () => {
  let component: MostrarPessoasQueCurtiramComponent;
  let fixture: ComponentFixture<MostrarPessoasQueCurtiramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarPessoasQueCurtiramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPessoasQueCurtiramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
