import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { PostFilter } from "../../../core/interfaces/post-filter"

@Injectable({
  providedIn: 'root'
})
export class PostActionsService {
// gerencia ações relacionadas a posts, como busca e filtro.
// getPost$$ armazena um ID de post e getPost$ expõe ele como um Observable para que outras partes do app possam se inscrever.
// filter$$ é guarda o filtro padrão para os posts, pra eu poder pesquisar todos de vez. Uso pra filtrar todo mundo de ver quando carrego a home

  private getPost$$ = new BehaviorSubject<number>(0)
  getPost$ = this.getPost$$.asObservable()

  getPostById(param: number): void {
    this.getPost$$.next(param)
  }

  filter$$ = new BehaviorSubject<PostFilter>({
    description: '',
    tag: 0
  })
  filter$ = this.filter$$.asObservable()

  // atualiza o filtro de posts.
  filter(param: PostFilter): void {
    this.filter$$.next(param)
  }
}
