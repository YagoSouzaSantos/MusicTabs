import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Post } from '../../../core/interfaces/post';


@Injectable({
  providedIn: 'root'
})
export class PostStateService {

  // uso pra gerenciar o estado global dos posts que tem nos posts.
  // Porque? pra manter o estado dos posts em um único local, facilitando o acesso de diferentes componentes.
  // Como eu usei signal em varios lugares, a melhor opção foi gerenciar estado pra economizar código

  private postActions$$ = new BehaviorSubject<Post[]>([]);
  state$ = this.postActions$$.asObservable().pipe(
    shareReplay(1),
  );

  getValueState(): Post[] {
    return this.postActions$$.getValue()
  }

  changeState(action: Post[]): void {
    this.postActions$$.next(action);
  }

  cleanState(): void {
    this.postActions$$.next([])
  }
}
