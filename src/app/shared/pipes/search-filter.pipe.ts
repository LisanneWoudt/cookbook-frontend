import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchFilterPipe implements PipeTransform {
  public transform(value, key: string, term: string) {
    if (!term) {
      return value;
    }
    return (value || []).filter(item => item.hasOwnProperty(key) && new RegExp(term, 'gi')
      .test(item[key]));
  }

}
