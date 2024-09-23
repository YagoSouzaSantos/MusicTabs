import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ChangeDetectionStrategy, Component, inject, input, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { Chat } from '../../../../../core/interfaces/chat';
import { AuthService } from '../../../../../core/services/auth.service';
import { ChatService } from '../../../data-access/chats.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }], // Define o locale padrão
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {

  // postId é recebe um input do componente pai com o id do post que está sendo exibido
  // authService é injetado para acessar o usuário autenticado, caso não esteja o chat é bloqueado.
  // chatService é injetado para lidar com as operações de chat (enviar e receber mensagens)
  // Os chats e usuários são controlados por observables.

  postId = input.required<number>({ alias: 'r_postId' })
  protected authService = inject(AuthService)
  protected chatService = inject(ChatService)
  user$ = this.authService.user();

  chats$: Observable<Chat[]>;
  newChatText: string = '';

  constructor() {
    this.chats$ = this.chatService.getChatState();
  }

  ngOnInit(): void {
    this.chatService.getChatsByPostId(this.postId()).subscribe();
  }

  sendMessage() {
    this.chatService.sendMessage(this.newChatText, this.user$(), this.postId()).subscribe(response => {
      console.log('Mensagem enviada', response);
      this.newChatText = '';

      this.chatService.getChatsByPostId(this.postId()).subscribe();
    });
  }

}
