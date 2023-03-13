import { Injectable } from '@angular/core';
// @ts-ignore
import * as pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {StorageDBService} from "./storage-db.service";
import {RestApiServiceService} from "./rest-api-service.service";
import {HttpParams} from "@angular/common/http";
import {Browser} from "@capacitor/browser";
import {AlertController} from "@ionic/angular";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  pdfObj = null;
  constructor(
    private restApiService:  RestApiServiceService,
    private storageDBService : StorageDBService,
    private alertController: AlertController) { }
  pdf(activite:any,intervention:any){



    const Activite = this.storageDBService.works[activite];
    const Intervention = this.storageDBService.works[activite].interventions[intervention];
    let matiere = []

    var dd = {
      footer: {
        columns: [
          {fontSize: 7, text: 'CANAL ETANCHEITE - SAS au capital de 10 000 € - 13 Rue des roses 33240 Saint-Gervais Numéro de Siret : 908 278 682 000 12', alignment: 'center' }
        ]
      },
      content: [

        {
          image: 'strawberries',
          width: 250,
          height: 100,
        },

        {
          stack: [
            {
              style: 'tableExample',
              table: {
                widths: [250,  250],
                body: [
                  ['Nous joindre ', 'Contact client'],
                  [
                    {
                      style : '',
                      alignment: 'left',
                      type: 'none',
                      ul: [
                        {text:'CANAL ETANCHEITE' , style : 'TextBold'},
                        {text:'13 Rue des Roses' , style : 'TextBold'},
                        {text:'33240 Saint Gervais' , style : 'TextBold'},
                        {text:'Tél : 06 51 19 13 76' , style : 'TextBold'},
                        {text:'canaletancheite@gmail.com' , style : 'TextBoldBlue'},
                        {text:'www.canaletancheite.com6' , style : 'TextBoldBlue'},
                      ]
                    },
                    {
                      style : 'tabsRight',
                      alignment: 'right',
                      type: 'none',
                      ul: [
                        {text:Activite.adresse_client , style : ''},
                        {text:Activite.contact_client , style : ''},
                        {text:'A l’attention de ' , style : ''},
                        {text:Activite.nom_client + " "+Activite.prenom_client  , style : ''},
                      ]
                    }]
                ]
              },
              layout: {
                hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
                  return (i === 0 || i === node.table.body.length) ? 1 : 1;
                },
                vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
                  return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                },
                hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
                  return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
                },
                vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
                  return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                },
                // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                // paddingLeft: function(i, node) { return 4; },
                // paddingRight: function(i, node) { return 4; },
                // paddingTop: function(i, node) { return 2; },
                // paddingBottom: function(i, node) { return 2; },
                // fillColor: function (rowIndex, node, columnIndex) { return null; }
              }
            },
          ],
          style: 'superMargin'
        },


        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [500],
            body: [
              [{text: 'RAPPORT D’INTERVENTION', style: 'tableHeader' ,  alignment: 'center',}],
            ]
          },
          layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 4 : 1;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 4 : 1;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
          }
        },
        {
          text: 'Date d’intervention : ' + Intervention.date,
          bold : true,
          alignment: 'left'
        },
        {
          text: 'Date du rapport : '+ Intervention.date,
          bold : true,
          alignment: 'left'
        },
        {
          text: 'Devis n° : ' + Activite.numero_devis,
          bold : true,
          alignment: 'left'
        },
        {
          text: 'Object : ' + Activite.object,
          bold : true,
          alignment: 'left'
        },
        {
          text: 'Adresse : ' + Activite.adresse_batiment,
          bold : true,
          alignment: 'left'
        },

        '\n\n',
        {
          text: 'Monsieur,',
          bold : true,
          alignment: 'left'
        },
        {
          text: '\nVeuillez trouver ci-joint, notre rapport d’intervention concernant l\'affaire mentionnée en objet.',
          bold : true,
          alignment: 'left'
        },
        {
          text: '\nNous restons à votre disposition pour tout renseignement complémentaire\n.',
          bold : true,
          alignment: 'left'
        },
        {
          text: 'Veuillez agréer, Monsieur, l\'expression de nos salutations distinguées..',
          bold : true,
          alignment: 'left'
        },
        {
          text: 'Laudry Nnang',
          bold : true,
          alignment: 'right'
        },
        {
          text: '06 51 19 13 76',
          bold : true,
          alignment: 'right'
        },

        '\n\n\n\n\n\n\n\n\n\n\n',
        {
          image: 'strawberries',
          width: 150,
          height: 50,

        },
        '\n\n\n\n',
        {
          text: 'Table des matières :',
          bold : true,
          alignment: 'left',
          color:'blue',
          fontSize: 15,
          decoration : 'underline'
        },
        '\n\n',
        {
          toc: {
            id: 'mainToc',
            title: {text: 'INDEX', style: 'legend'}
          },

        },

        {
          toc: {
            id: 'mainToc1',
            title: {text: 'INDEX', style: 'legend'}
          },

        },

        {

          toc: {
            id: 'mainToc2',
            title: {text: 'INDEX', style: 'legend'}
          },

        },

        {

          toc: {
            id: 'mainToc3',
            title: {text: 'INDEX', style: 'legend'}
          }
        },

        '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',

        {
          text:[
            {
              text: 'This is a header',
              style: 'headerInv',
              tocItem: 'mainToc'
            },

            '\n',
            {
              text:[  'We can also mix named-styles and style-overrides at both paragraph and inline level. For example, this paragraph uses the "bigger" style, which',
                'changes fontSize to 15 and sets italics to true. Texts are not italics though',
                's because weve overriden italics back to false at the paragraph level. ',]
            },


          ],

        },

        {
          image: 'strawberries',
          width: 300,
          height: 300,

        },



        {
          text:[
            {
              text: 'This is a header',
              style: 'headerInv',
              tocItem: 'mainToc1'
            },

            '\n',
            {
              text:[  'We can also mix named-styles and style-overrides at both paragraph and inline level. For example, this paragraph uses the "bigger" style, which',
                'changes fontSize to 15 and sets italics to true. Texts are not italics though',
                's because weve overriden italics back to false at the paragraph level. ',]
            },


          ],

        },

        {
          image: 'strawberries',
          width: 300,
          height: 300,

        },

        {
          text:[
            {
              text: 'This is a header',
              style: 'headerInv',
              tocItem: 'mainToc2'
            },

            '\n',
            {
              text:[  'We can also mix named-styles and style-overrides at both paragraph and inline level. For example, this paragraph uses the "bigger" style, which',
                'changes fontSize to 15 and sets italics to true. Texts are not italics though',
                's because weve overriden italics back to false at the paragraph level. ',]
            },


          ],

        },

        {
          image: 'strawberries',
          width: 300,
          height: 300,

        },
        {
          text:[
            {
              text: 'This is a header',
              style: 'headerInv',
              tocItem: 'mainToc3'
            },

            '\n',
            {
              text:[  'We can also mix named-styles and style-overrides at both paragraph and inline level. For example, this paragraph uses the "bigger" style, which',
                'changes fontSize to 15 and sets italics to true. Texts are not italics though',
                's because weve overriden italics back to false at the paragraph level. ',]
            },
          ],
        },
        {
          columns: [
            {
              image: 'strawberries',
              width: 200,
              height: 200,
            },
            {
              image: 'strawberries',
              width: 200,
              height: 200,
            },
          ]
        },
      ],
      images: {
        strawberries: {
          url: 'https://picsum.photos/id/1080/367/267',
        },
      },
      styles: {
        headerInv : {
          fontSize: 18,
          bold: true,
          alignment: 'left',
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 190, 0, 80]
        },
        legend: {
          fontSize: 18,
          bold: true,
          alignment: 'left',

        },
        subheader: {
          fontSize: 14
        },
        superMargin: {
          margin: [5, 0, 40, 0],
          fontSize: 15
        },
        tableExample: {
          margin: [0, 40, 0, 15]
        },
        TextBold: {
          bold: true
        },
        TextBoldBlue: {
          bold: true,
          color : 'blue'
        },
        tabsRight : {
          margin: [5, 0, 8, 0]
        }
      }

    }
    //pdfMake.createPdf(dd).download()
    pdfMake.createPdf(dd).getBlob((buffer:any)=>{
      //console.log(buffer);
      const data= this.convertBlobToBase64(buffer).then((result : any)=>{
       const pdf= new HttpParams()
          .set("file",result)
          .set('grant_type', 'password');
        this.restApiService.addPdf(pdf).subscribe(async res => {
          if (res) {
            const openCapacitorSite = async () => {
              await Browser.open({ url: 'https://mobile.canaletancheite.com/'+res.data });
            };
            openCapacitorSite();
          } else {
            this.presentAlert();
          }
        }, error => {
          this.presentAlert();
        });

      });

    })
   // this.pdfObj = pdfMake.createPdf(dd).download();
/*    pdfMake.createPdf(dd).getBlob((buffer: any) => {
      this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
        .then(dirEntry => {
          this.file.getFile(dirEntry, 'test1.pdf', { create: true })
            .then(fileEntry => {
              fileEntry.createWriter(writer => {
                writer.onwrite = () => {
                  this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
                    .then(res => { })
                    .catch(err => {
                      const alert = this.alertCtrl.create({ message: err.message, buttons: ['Ok'] });
                      alert.present();
                    });
                }
                writer.write(buffer);
              })
            })
            .catch(err => {

            });
        })
        .catch(err => {

        });

    });*/
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Problème lors du chargement du document pdf ',
      buttons: ['OK'],
    });

    await alert.present();
  }
  private convertBlobToBase64 = (blob: Blob) => new Promise(
    (resolve,reject) =>{
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload= ()=> {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  );



}
