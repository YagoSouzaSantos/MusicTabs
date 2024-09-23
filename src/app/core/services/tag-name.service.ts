import { Injectable } from '@angular/core';
import { tagType } from '../enums/tag';

@Injectable({
  providedIn: 'root'
})
export class TagNameService {
  // Utilizo para dar nome as classificações de níveis que eu tenho das aulas.
  // Os niveis são usados como filtro na pagina inicial, porém são parte de um tipo que é numero, então aqui eu nomeio eles.

  getTagName(param: number): string {
    switch (param) {
      case 1:
        return 'Iniciante';
      case 2:
        return 'Intermediário';
      case 3:
        return 'Avançado';
      case 4:
        return 'Expert';
      default:
        return '';
    }
  }

  getAllTagTypes(): number[] {
    return Object.values(tagType);
  }
}
