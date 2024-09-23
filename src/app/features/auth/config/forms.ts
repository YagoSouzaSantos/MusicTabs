import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export function createLoginForm(fb: FormBuilder): FormGroup {
  return fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
}

export function createRegisterForm(fb: FormBuilder): FormGroup {
  return fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });
}
