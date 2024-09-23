import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { PostActionsService } from '../actions/post-actions.service';
import { PostStateService } from './post-state.service';
import { Post } from '../../../core/interfaces/post';
import { PostFilter } from '../../../core/interfaces/post-filter';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  // gerencia as comunicações com o backend e o estado dos posts.
  // o serviço HttpClient para fazer requisições HTTP ao backend e atualizar o estado minimiza o trabalho de ficar dando subscribe em componente o tempo todo.
  // as requisições ficam no serviço que comunica com o componente e pra não fazer novas requisições desnecessárias ao backend apenas atualiza os estados e devolve ao componente.
  // aqui também estão os filtros e pode ter tudo mais que meus componentes precisarem

  private readonly jsonUrl = 'db.json';

  public postActions = inject(PostActionsService)
  private http = inject(HttpClient)
  private postState = inject(PostStateService)

  constructor() {
    this.getAll()
  }

  getPost$ = this.postActions.getPost$.pipe(
    filter(id => id > 0),
    map(id => this.postState.getValueState().find(x => x.id == id))
  );

  getFilteredList$ = this.postActions.filter$.pipe(
    switchMap(filter => this.getStoreFilter(filter)),
    shareReplay(1)
  )

  getAll(): void {
    this.http.get<{ posts: Post[] }>(this.jsonUrl).pipe(
      tap(response => this.postState.changeState(response.posts))
    ).subscribe()
  }

  getItemListToObservable(): Observable<Post[]> {
    return this.postState.state$
  }

  private getStoreFilter(filter: PostFilter): Observable<Post[]> {
    window.scrollTo({ top: 0, behavior: undefined });

    return this.http.get<{ posts: Post[] }>(this.jsonUrl).pipe(
      map(response => {
        if (filter.description === '' && filter.tag === 0) {
          return response.posts;
        }

        return response.posts.filter(post => {
          const itemArticleText = post.description
            ? post.description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            : '';
          const itemTitle = post.title
            ? post.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            : '';
          const filterDescription = filter.description
            ? filter.description.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
            : '';

          const matchesArticleText = filterDescription === '' || itemArticleText.includes(filterDescription);
          const matchesTitle = filterDescription === '' || itemTitle.includes(filterDescription);
          const matchesType = filter.tag === 0 || post.tag === filter.tag;

          return (matchesArticleText || matchesTitle) && matchesType;
        });
      })
    );
  }
}
