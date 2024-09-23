import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { PostFilter } from "../../../core/interfaces/post-filter"

@Injectable({
  providedIn: 'root'
})
export class ChatActionsService {

  // define as as acções do que eu vou usar no meu gerenciamento de estado.
  // basicamente eu tenho essa classe com observables que vão ser utilizados no gerenciamento e estado, e este pelo serviço que o componente se comunica.
  // Se a aplicação ficar grande pode ser melhor dividir tudo nessas 3 camadas.

  private getChat$$ = new BehaviorSubject<number>(0);
  getChat$ = this.getChat$$.asObservable();

  getChatByPostId(param: number): void {
    this.getChat$$.next(param);
  }
}
