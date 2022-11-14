import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMensagemComponent } from './chat-mensagem.component';

describe('ChatMensagemComponent', () => {
  let component: ChatMensagemComponent;
  let fixture: ComponentFixture<ChatMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMensagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
