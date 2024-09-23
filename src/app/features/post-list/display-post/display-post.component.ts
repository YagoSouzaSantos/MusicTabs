import { SnackbarService } from './../../../core/services/snackbar.service';
import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ChatComponent } from "./components/chat/chat.component";
import { VideoAulaComponent } from "./components/video-lesson/video-lesson.component";
import { PostService } from '../data-access/post.service';
import { Post } from '../../../core/interfaces/post';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-display-post',
  standalone: true,
  imports: [MatCardModule, MatDivider, ChatComponent, VideoAulaComponent, AsyncPipe, MatIcon],
  templateUrl: './display-post.component.html',
  styleUrl: './display-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayPostComponent implements OnInit {

  // classe que é responsável por exibir detalhes de um post.
  // o post a ser carregado é determinado via input para carregar dados do post e encaminhar dados pro chat que é um componente filho.
  // o snackbar é apenas para exibir a mensagem quando alguem tenta baixar um anexo, não quis deixar o clique sem função apenas já que não vai baixar nada.

  protected postService = inject(PostService)
  protected SnackbarService = inject(SnackbarService)
  id = input.required<number>({ alias: 'r_id' })
  post: Post | undefined;

  ngOnInit(): void {
    this.postService.postActions.getPostById(this.id());
    this.postService.getPost$.subscribe(
      (response) => {
        this.post = response
      })
    window.scrollTo({ top: 0, behavior: undefined })
  }
}
