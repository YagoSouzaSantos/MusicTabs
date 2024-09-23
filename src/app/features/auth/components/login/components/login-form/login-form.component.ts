import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MATERIAL } from '../../../../config/imports';
import { createLoginForm } from '../../../../config/forms';
import { LoginStatus } from '../../../../data-access/login.service';
import { Credentials } from '../../../../../../core/interfaces/credentials';
import { SnackbarService } from '../../../../../../core/services/snackbar.service';
import { FormValidation } from '../../../../../../shared/utils/form-validation';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<Credentials>()

  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder)

  loginStatus = input.required<LoginStatus>()
  loginForm!: FormGroup

  ngOnInit(): void {
    this.loginForm = createLoginForm(this.fb);
  }

  hide = true;
  loginFailed!: boolean;

  constructor() {
    effect(() => {
      if(this.loginStatus() === 'error'){
        this.snackbarService.showError('Não foi possível autenticar usuário.')
      }
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const credentials: Credentials = this.loginForm.getRawValue();
    this.login.emit(credentials);
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    return FormValidation.getErrorMessage(control);
  }

  alert(): void {
    this.snackbarService.showAlert('Método não implementado!');
  }


}
