import { Component, effect, EventEmitter, inject, input, Output } from '@angular/core';
import { MATERIAL } from '../../../../config/imports';
import { SnackbarService } from '../../../../../../core/services/snackbar.service';
import { createRegisterForm } from '../../../../config/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Credentials } from '../../../../../../core/interfaces/credentials';
import { FormValidation } from '../../../../../../shared/utils/form-validation';
import { LoginStatus } from '../../../../data-access/login.service';
import { User } from '../../../../../../core/interfaces/user';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MATERIAL],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  @Output() register = new EventEmitter<User>()

  private snackbarService = inject(SnackbarService);
  private fb = inject(FormBuilder)

  loginStatus = input.required<LoginStatus>()
  registerForm!: FormGroup

  ngOnInit(): void {
    this.registerForm = createRegisterForm(this.fb);
  }

  constructor() {
    effect(() => {
      if(this.loginStatus() === 'error'){
        this.snackbarService.showError('Não foi possível autenticar usuário.')
      }
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const registerUser: User = this.registerForm.getRawValue();
    this.register.emit(registerUser);
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    return FormValidation.getErrorMessage(control);
  }
}
