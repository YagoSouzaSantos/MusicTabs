import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Credentials } from '../../../core/interfaces/credentials';
import { User } from '../../../core/interfaces/user';

export type LoginStatus = 'pending' | 'authenticating' | 'success' | 'error';

interface LoginState {
  status: LoginStatus;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Aqui está a lógica reativa, esse serviço injeta o authService para realizar a autenticação de usuários.
  // eu apenas preciso lidar com os status que 'pending' | 'authenticating' | 'success' | 'error'
  // O userAuthenticated$ é um Observable que tenta autenticar o usuário, e se falhar emite o erro pra eu não levar isso para o componente.

  private authService = inject(AuthService);

  error$ = new Subject<any>();
  login$ = new Subject<Credentials>();

  userAuthenticated$ = this.login$.pipe(
    switchMap((credentials) =>
      this.authService.login(credentials).pipe(
        catchError((err) => {
          this.error$.next(err);
          return EMPTY;
        })
      )
    )
  );

  // Controla o estado da autenticação através do status
  private state = signal<LoginState>({
    status: 'pending',
  });

  status = computed(() => this.state().status);

  authenticate(credentials: Credentials) {
    this.login$.next(credentials);
  }

  // atualiza o estado do login
  constructor() {
    this.userAuthenticated$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'success' }))
      );

    this.login$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'authenticating' }))
      );

    this.error$
      .pipe(takeUntilDestroyed())
      .subscribe(() =>
        this.state.update((state) => ({ ...state, status: 'error' }))
      );
  }
}
