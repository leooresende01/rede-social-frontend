import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasQueCurtiramComponent } from './pessoas-que-curtiram.component';

describe('PessoasQueCurtiramComponent', () => {
  let component: PessoasQueCurtiramComponent;
  let fixture: ComponentFixture<PessoasQueCurtiramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PessoasQueCurtiramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PessoasQueCurtiramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
