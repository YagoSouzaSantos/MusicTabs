import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Post } from '../../../core/interfaces/post';
import { Chat } from '../../../core/interfaces/chat';


@Injectable({
  providedIn: 'root'
})
export class ChatStateService {

  // uso pra gerenciar o estado global do chat que tem nos posts.
  // Porque? pra manter o estado das mensagens em um único local, facilitando o acesso de diferentes componentes e serviços

  private chatMessages$$ = new BehaviorSubject<Chat[]>([]);
  state$ = this.chatMessages$$.asObservable();

  getValueState(): Chat[] {
    return this.chatMessages$$.getValue();
  }

  changeState(action: Chat[]): void {
    this.chatMessages$$.next(action);
  }

  cleanState(): void {
    this.chatMessages$$.next([]);
  }
}
