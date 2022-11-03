import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPublicacaoComponent } from './new-publicacao.component';

describe('NewPublicacaoComponent', () => {
  let component: NewPublicacaoComponent;
  let fixture: ComponentFixture<NewPublicacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPublicacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPublicacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
