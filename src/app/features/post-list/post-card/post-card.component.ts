import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Post } from '../../../core/interfaces/post';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink,CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  // recebe o post como input obrigatório da lista e preenche os valores do card
  post = input.required<Post>({ alias: 'r_post' })
}
