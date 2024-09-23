import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { YoutubePlayerComponent } from 'ngx-youtube-player';
import { Post } from '../../../../../core/interfaces/post';
import { SafePipe } from "../../../../../shared/pipes/safe.pipe";


@Component({
  selector: 'app-video-lesson',
  standalone: true,
  imports: [YoutubePlayerComponent, SafePipe, MatCardModule],
  templateUrl: './video-lesson.component.html',
  styleUrl: './video-lesson.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class VideoAulaComponent {
  // Recebe o post do componente pai, como é um signal eu já carrego todos os dados diretamente no template!
  post = input.required<Post>({ alias: 'r_post' })
}
