import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtirDescurtirComponent } from './curtir-descurtir.component';

describe('CurtirDescurtirComponent', () => {
  let component: CurtirDescurtirComponent;
  let fixture: ComponentFixture<CurtirDescurtirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurtirDescurtirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurtirDescurtirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
