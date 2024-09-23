import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, delay, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { SnackbarService } from './snackbar.service';
import { environment } from '../../../environments/environment';
import { Credentials } from '../interfaces/credentials';


export type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Classe responsável pela autenticação de usuários. Aqui eu utilizo gerenciamento de estado que é reativo.
  //A ideia é utilizar ele para autenticação e registro, é aqui que eu comunico com o banco para poder realizar o login e cadastro.
  //A classe pode ser utilizada quando eu preciso saber se um usuário está logado ou não (quando me retorna null ou undefined).
  //Ela também é utilizada por outros serviços e não apenas componentes (LoginService usa ela para autenticação de usuários e gerenciamento de estado do login também).

  private http = inject(HttpClient)
  private snackbarService = inject(SnackbarService);
  private router = inject(Router)

  private userSignal: WritableSignal<AuthUser> = signal<AuthUser>(null);

  user() {
    return this.userSignal.asReadonly();
  }

  login(credentials: Credentials): Observable<AuthUser> {
    const { email, password } = credentials;

    return this.http.get<AuthUser[]>(`${environment.apiUrl}/users`, {
      params: { email, password }
    }).pipe(
      map((users) => {
        const user = users.length ? users[0] : null;

        if (user) {
          this.userSignal.set(user);
          this.snackbarService.showSuccess('Usuário autenticado com sucesso.')
          return user;
        } else {
          throw new Error('Usuário ou senha inválidos');
        }
      }),
      catchError((error) => {
        this.userSignal.set(null);
        if (error.message === 'Usuário ou senha inválidos') {
          return throwError(() => new Error('Usuário ou senha inválidos'));
        }
        return throwError(() => new Error('Erro no servidor. Tente novamente mais tarde.'));
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      map(users => users.some(user => user.email === email)),
      catchError(() => of(false))
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, user);
  }

  logout(): void {
    this.userSignal.set(null);
    this.router.navigate(['auth/login'])
  }

  isLoggedIn(): boolean {
    return this.userSignal() != null;
  }

}
