import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  // Meu serviço de snackBar Personalizado, utilizo ele apenas para exibir mensagens quando tenho algum retorno do banco de dados.
  // Posso retornar um sucesso, erro ou alerta. Basicamente a diferença é só a cor da snackbar.

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar','success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar','error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showAlert(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar','alert-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
