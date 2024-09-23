import { AuthUser } from './../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { ChatActionsService } from '../actions/chat-actions.service';
import { Chat } from './../../../core/interfaces/chat';
import { ChatStateService } from './chats-state.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/interfaces/user';




@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // gerencia as comunicações com o backend e o estado do chat.
  // o serviço HttpClient para fazer requisições HTTP ao backend e atualizar o estado minimiza o trabalho de ficar dando subscribe em componente o tempo todo.
  // as requisições ficam no serviço que comunica com o componente e pra não fazer novas requisições desnecessárias ao backend apenas atualiza os estados e devolve ao componente.

  private readonly jsonUrl = 'db.json';

  private chatActions = inject(ChatActionsService);
  private http = inject(HttpClient);
  private chatState = inject(ChatStateService);

  constructor() {
    this.loadChats();
  }

  loadChats(): void {
    this.chatActions.getChat$.pipe(
      filter(id => id > 0),
      switchMap(id => this.getChatsByPostId(id))
    ).subscribe(chats => {
      this.chatState.changeState(chats);
    });
  }

  getChatsByPostId(postId: number): Observable<Chat[]> {
    const url = `${environment.apiUrl}/chats?post_id=${postId}`;
    console.log(`Fetching chats from URL: ${url}`);
    return this.http.get<Chat[]>(url).pipe(
      tap(chats => {
        this.chatState.changeState(chats);
      })
    );
  }

  sendMessage(text: string, user: AuthUser, postId: number): Observable<Chat> {
    const newMessage: Omit<Chat, 'id'> = {
      text: text,
      sender: { user_id: user!.id, name: user!.firstName },
      post_id: postId,
      timestamp: new Date().toISOString(),
    };

    return this.http.post<Chat>(`${environment.apiUrl}/chats`, newMessage);
  }

  getChatState(): Observable<Chat[]> {
    return this.chatState.state$;
  }
}
