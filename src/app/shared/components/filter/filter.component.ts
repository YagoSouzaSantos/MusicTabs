import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PostService } from '../../../features/post-list/data-access/post.service';
import { PostFilter } from '../../../core/interfaces/post-filter';
import { MatButtonModule } from '@angular/material/button';
import { createFilterForm } from '../../utils/form-config';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatInputModule, MatIcon, ReactiveFormsModule,
    FormsModule, MatButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  protected postService = inject(PostService)
  protected fb = inject(FormBuilder)
  filterForm!: FormGroup

  ngOnInit(): void {
    this.filterForm = createFilterForm(this.fb);
  }


  onSubmit(): void {
    let postFilter: PostFilter = this.filterForm.value
    this.postService.postActions.filter(postFilter);
  }
}
