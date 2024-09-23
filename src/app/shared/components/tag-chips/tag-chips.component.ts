import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { TagType } from '../../../core/enums/tag';
import { TagNameService } from '../../../core/services/tag-name.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostFilter } from '../../../core/interfaces/post-filter';
import { PostService } from '../../../features/post-list/data-access/post.service';
import { createFilterForm } from '../../utils/form-config';

@Component({
  selector: 'app-tag-chips',
  standalone: true,
  imports: [MatChipsModule, CommonModule],
  templateUrl: './tag-chips.component.html',
  styleUrl: './tag-chips.component.scss'
})
export class GroupChipsComponent {
  protected tagNameService = inject(TagNameService)
  protected postService = inject(PostService)
  protected fb = inject(FormBuilder)
  filterForm!: FormGroup
  allTags: number[] = [];

  ngOnInit(): void {
    this.allTags = this.tagNameService.getAllTagTypes();
    this.filterForm = createFilterForm(this.fb);
  }

  onFilter(tag : number): void {
    let postFilter: PostFilter = this.filterForm.value
    postFilter.tag = tag
    this.postService.postActions.filter(postFilter)

  }
}
