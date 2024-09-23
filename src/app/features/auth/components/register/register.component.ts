import { SnackbarService } from './../../../../core/services/snackbar.service';
import { Component, effect, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { User } from '../../../../core/interfaces/user';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginService } from '../../data-access/login.service';
import { Credentials } from './../../../../core/interfaces/credentials';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatProgressSpinner, MatCard, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // parecido com o login posso gerenciar loading e botões através do loginService que me retorna o estado da autenticação.
  // uso o authService pra redirecionar o usuário para a home quando logado.

  protected loginService = inject(LoginService);
  protected authService = inject(AuthService);
  protected snackbarService = inject(SnackbarService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const user = this.authService.user()();
      console.log('user: ', user);
      if (user !== null && user !== undefined) {
        this.router.navigate(['']);
      }
    });
  }

  // Verifica se há duplicidade de e-mail e caso não tenta fazer login assim que cadastra o usuário.
  onRegisterLogin(registerUser: User) {
    this.authService.checkEmailExists(registerUser.email).subscribe(exists => {
      if (exists) {
        this.snackbarService.showError('Esse e-mail já está cadastrado!');
      } else {
        this.authService.registerUser(registerUser).subscribe(response => {
          const credencials: Credentials = response;
          this.loginService.authenticate(credencials)
        });
      }
    });





  }
}
