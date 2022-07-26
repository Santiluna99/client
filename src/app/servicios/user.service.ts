import {Injectable} from '@angular/core';
import{HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { firstValueFrom, Observable, of, pipe, Subject } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
    public url: string;
    public identity:any;
    public token:any;

    constructor(private _http: HttpClient){
        this.url=GLOBAL.url;

    }
    signup(user_to_login:any,gethash:any){
        if(gethash!=null){
            user_to_login.gethash=gethash;
        }
        let json=JSON.stringify(user_to_login);
        let params=json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'login',params,{headers:headers});
        
    }
    getIdentity(){
        let identity=localStorage.getItem('identity');
        if(identity!="undefined"){
            this.identity=identity;

        }else{
            this.identity=null;
        }
        return this.identity;

    }
    getToken(){
        let token=localStorage.getItem('token');
        if (token!="undefined"){
            this.token=token;
        }else{
            this.token=null;
        }
        return this.token

    }
}

        /**/

    /*return firstValueFrom(this._http.post("url","body"));}

    public async metodo(){
        try{
            let respuesta=await this.signup("usuario","gethash");
            console.log(respuesta);
            
        }catch(error:any){
            console.error(error);
        }*/
    
