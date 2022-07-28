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
    signup(user_to_login:any,gethash:any):Observable<any>{
        if(gethash!=null){
            user_to_login.gethash=gethash;
        }
        let json=JSON.stringify(user_to_login);
        let params=json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'login',params,{headers:headers});
        
    }
    register(user_to_register:any):Observable<any>{
        let params=JSON.stringify(user_to_register);
        //let params=json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+'register',params,{headers:headers});
    }

    update_user(user_to_update:any){
        let params=JSON.stringify(user_to_update);
        //let params=json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization',this.getToken())
        ;
        return this._http.put(this.url+'update-user'+user_to_update._id,params,{headers:headers});
    }
    getIdentity(){
        let identity=localStorage.getItem('identity');
        if(identity="undefined"){
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
    
