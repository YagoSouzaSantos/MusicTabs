import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';


export const MATERIAL = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatProgressSpinnerModule,
  RouterLink
]
