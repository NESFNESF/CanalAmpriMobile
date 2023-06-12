import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[],value:string): any[] {
    return items.filter((item : any) => {
      return item.email.toLowerCase().indexOf(value.toLowerCase()) > -1||
        item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.prenom.toLowerCase().indexOf(value.toLowerCase()) > -1||
        item.role.label.toLowerCase().indexOf(value.toLowerCase())> -1;
    });
  }
}
