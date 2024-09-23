import { AbstractControl } from "@angular/forms";

export class FormValidation {

    static getErrorMessage(control: AbstractControl | null): string {
      if (!control) {
        return '';
      }

      if (control.hasError('required')) {
        return `O campo é obrigatório`;
      }
      if (control.hasError('minlength')) {
        const minLength = control.errors?.['minlength'].requiredLength;
        return `O campo deve ter no mínimo ${minLength} dígitos`;
      }
      if (control.hasError('maxlength')) {
        const maxLength = control.errors?.['maxlength'].requiredLength;
        return `O campo deve ter no máximo ${maxLength} dígitos`;
      }
      if (control.hasError('email')) {
        return `O campo deve ser um e-mail válido`;
      }

      return '';
    }
  }
