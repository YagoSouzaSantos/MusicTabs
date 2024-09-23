import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { LoginService } from '../../data-access/login.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Credentials } from '../../../../core/interfaces/credentials';
import { MatCard } from '@angular/material/card';
import { LoginFormComponent } from './components/login-form/login-form.component';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatProgressSpinner, MatCard, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // Aqui eu tenho todo o comportamento do longin. Injeto o servico de login para saber o estado atual da autenticação. Posso usar isso pra bloquer botões e exibir loading.
  // O serviço de autenticação é injetado para que assim que o estado de login tenha sucesso eu possar usar o effect para direcionar o usuário para home.

  public loginService = inject(LoginService);
  public authService = inject(AuthService);
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

  onLogin(credentials: Credentials) {
    this.loginService.authenticate(credentials);
  }
}

