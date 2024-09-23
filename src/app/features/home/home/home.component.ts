import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "../../../template/toolbar/toolbar.component";
import { FooterComponent } from "../../../template/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // no momento minha home é um componente burro. simplesmente divide os componentes principais e o caminho do router outlet
  // no futuro posso usar essa area para definir templates de alunos e professores.
}
