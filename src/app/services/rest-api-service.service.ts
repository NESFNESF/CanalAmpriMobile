import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable , throwError} from "rxjs";
import {catchError , tap,retry} from "rxjs/operators";
import {StorageDBService} from "./storage-db.service";



@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {
 // private url="http://localhost:8000/api/v1/";
  private  url = "https://mobile.canaletancheite.com/api/v1/";

  private httpOption ={
    headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8','Accept':'application/json'})
  };
  private httpOptionWithAuth ={
    headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
      'Accept':'application/json',
      'Authorization' : 'Bearer '+ this.storageDBService.token })
  };
  private httpOption2 ={
    headers: new HttpHeaders({'Content-Type': 'multipart/form-data;boundary=--------------------------948179741041492741179117',
      'Accept':'application/json'})
  }
  constructor(private  httpClient: HttpClient,private storageDBService : StorageDBService,) { }
  handlrError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(error.error.message);
    }else {
      console.error(error.status,error.error);
    }
    return throwError("error");
  }
  httpClientMethod(url:string,method:string,body:any,headers:any): Observable<any>{
    if(method==="post"){
      return this.httpClient.post<any>(url,body,headers)
        .pipe(
          tap(
            async res =>{
              console.log(res);
            }
          ),
          catchError(this.handlrError)
        );
    } else{
      return this.httpClient.get<any>(url,headers)
        .pipe(
          tap(
            async res =>{
              console.log(res);
            }
          ),
          catchError(this.handlrError)
        );
    }

  }
  login(user: any): Observable<any>{
    return  this.httpClientMethod(this.url+ 'users/signin','post',user,this.httpOption)
/*    return this.httpClient.post<any>(this.url+ 'users/signin',user,this.httpOption)
      .pipe(
        tap(
          async res =>{
            console.log(res);
          }
        ),
        catchError(this.handlrError)
      );*/
  }
  register(user : any): Observable<any>{

    return  this.httpClientMethod(this.url+ 'users/signup','post',user,this.httpOption)
/*    return this.httpClient.post<any>(this.url+ 'users/signup',user,this.httpOption)
      .pipe(
        tap(
          async res =>{
            console.log(res);
          }
        ),
        catchError(this.handlrError)
      );*/
  }
  addWork(work: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'works/new','post',work,httpOptionWithAuth)
/*    return this.httpClient.post<any>(this.url+ 'works/new',work,this.httpOptionWithAuth)
      .pipe(
        tap(
          async res =>{
            console.log(res);
          }
        ),
        catchError(this.handlrError)
      );*/
  }
  loadWork(user:any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'works','post',user,httpOptionWithAuth)
/*    return this.httpClient.get<any>(this.url+ 'works',this.httpOptionWithAuth)
      .pipe(
        tap(
          async res =>{
            console.log(res);
          }
        ),
        catchError(this.handlrError)
      );*/
  }
  editWork(work: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'works/edit','post',work,httpOptionWithAuth)
  }
  isArchiveWork(work: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'works/isFinish','post',work,httpOptionWithAuth)
  }
  removeWork(work: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'works/delete','post',work,httpOptionWithAuth)
  }
  addIntervention(intervention: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'Interventions/new','post',intervention,httpOptionWithAuth)
  }
  removeIntervention(intervention: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'Interventions/delete','post',intervention,httpOptionWithAuth)
  }
  addLoad(load: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'loads/new','post',load,httpOptionWithAuth)
  }
  removeLoad(load: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'loads/delete','post',load,httpOptionWithAuth)
  }
  updateLoad(load: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'loads/edit','post',load,httpOptionWithAuth)
  }
  addFile(file: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'new/file','post',file,httpOptionWithAuth)
  }
  addPdf(file: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'new/pdf','post',file,httpOptionWithAuth)
  }
  allUsers(user: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'users','post',user,httpOptionWithAuth)
  }
  newUser(user: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'users/new','post',user,httpOptionWithAuth)
  }
  updateUser(user: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'users/user/update','post',user,httpOptionWithAuth)
  }
  isActifUser(user: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'users/user/isactif','post',user,httpOptionWithAuth)
  }
  isDeleteUser(user: any): Observable<any>{
    const httpOptionWithAuth ={
      headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
        'Accept':'application/json',
        'Authorization' : 'Bearer '+ this.storageDBService.token })
    };
    return  this.httpClientMethod(this.url+ 'users/user/delete','post',user,httpOptionWithAuth)
  }
}
