import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { User } from './models/user';
import { UserService } from './servicios/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]

  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public title = 'Musify';
  //public title2:String = 'Musify';
  public token:any;
  public identity:any; //!sacar string
  public user: User;
  public user_register: User;
  public errorMessage:any;
  public alertRegister:any;
  

  constructor(
    private _userService:UserService
  ){
  this.user=new User('','','','ROLE_USER','','','');
  this.user_register=new User('','','','ROLE_USER','','','');
}
ngOnInit(){
  this.identity=this?._userService.getIdentity();
  this.token=this.token?._userService.getToken();
  console.log(this.identity);
  console.log(this.token);
  //this.identity=null
  //localStorage.setItem("user1","admin@admin.com")
 /* var texto=this._userService.signup()
  console.log(texto)*/

}
public onSubmit(){
  //console.log(localStorage.getItem("user1"));
  console.log(this.user);
 /*this._userService.signup(this.user,false)
  const service=this._userService.signup(this.user,false);
  console.log(service);*/
  //*Conseguit datos del usuario identificado

  this._userService.signup(this.user,false).subscribe({
    next:(response:any)=>{
      let identity=response.user;
      this.identity=identity;
      if(!this.identity._id){
        alert("El usuario esta mal logeado")
      }else{
        //*crear elemento en el storage para tener al usuario sesion
        localStorage.setItem('identity',JSON.stringify(identity));
        

        //*Conseguir el token para enviarselo a cada petision http
        this._userService.signup(this.user,true).subscribe({
          next:(response:any)=>{
            let token = response.token;
            this.token=token;
            if(this.token.length<=0){
              alert("El token no se ha generado")
            }
            else{
              //*Crear elemento en el localstorage para tener token disponible
              localStorage.setItem('token',token);
              this.user_register=new User('','','','ROLE_USER','','','');
              // console.log(token);
              // console.log(identity);
              
            }
          },
          error:error=>{
            var errorMessage=<any>error;
            if (errorMessage!=null){
              var body=JSON.parse(error._body)
              this.errorMessage=body.message;
              console.log(error)
            }
          }

        })

      }
    }
  }) 
    }
    logout(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity=null;
      this.token=null;
    }

    onSubmitRegister(){
      console.log(this.user_register);
      this._userService.register(this.user_register).subscribe(
        response=>{
          let user=response.user;
          this.user_register=user;
          if(!user._id){
            this.alertRegister('Error al registrarse');
          }else{
            this.alertRegister=('El registro se realizo bien usa el mail '+ this.user_register.email)
            this.user_register=new User('','','','ROLE_USER','','','');

          }
        }
        ,
        error=>{
          var errorMessage=<any>error;
            if (errorMessage!=null){
              var body=JSON.parse(error._body)
              this.alertRegister=body.message;
              console.log(error)
            }
        }
      )
      
    }
    
}


