import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { GroupChipsComponent } from "../../../shared/components/tag-chips/tag-chips.component";
import { PostActionsService } from '../actions/post-actions.service';
import { PostService } from '../data-access/post.service';
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [FilterComponent, GroupChipsComponent, PostCardComponent, AsyncPipe, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  // tenho injetado o serviço do postService pra preencher o valor de filteredList$;
  // A lista é filtrada já de cara porque como estou fazendo o uso do StateService pra gerenciar estados, quando alguém fizer um filtro na tela os cards se atualizam automaticamente.

  protected postService = inject(PostService)

  protected filteredList$ = this.postService.getFilteredList$
}
