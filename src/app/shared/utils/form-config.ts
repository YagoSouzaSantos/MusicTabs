import { FormBuilder, FormGroup } from "@angular/forms";

export function createFilterForm(fb: FormBuilder): FormGroup {
  return fb.group({
    description: [''],
    tag: [0],
  });
}
