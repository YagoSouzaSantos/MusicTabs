import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, RouterOutlet],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss'
})
export class LoginContainerComponent{
  // não faço nada no container, ele serve apenas para distribuir melhor os outros componentes.
  // Aqui eu defino card e background e separo as responsabilidades entre os componentes filhos de login e registro
}
