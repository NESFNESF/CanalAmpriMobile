import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWork'
})
export class FilterWorkPipe implements PipeTransform {

  transform(items: any[],value:string): any[] {
    return items.filter((item : any) => {
      return item.auteur.nom.toLowerCase().indexOf(value.toLowerCase()) > -1||
        item.auteur.prenom.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
      //  item.adresse_batiment.toLowerCase().indexOf(value.toLowerCase()) > -1||
        //item.adresse_client.toLowerCase().indexOf(value.toLowerCase())> -1||
        //item.code_postale.toLowerCase().indexOf(value.toLowerCase())> -1||
        //item.contact_site.toLowerCase().indexOf(value.toLowerCase())> -1||
        //item.contact_client.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.debut.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.nom_client.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.description.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.object.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.nom_client.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.prenom_client.toLowerCase().indexOf(value.toLowerCase())> -1||
        //item.reference.toLowerCase().indexOf(value.toLowerCase())> -1||
        item.ville.toLowerCase().indexOf(value.toLowerCase())> -1;
    });
  }
}
