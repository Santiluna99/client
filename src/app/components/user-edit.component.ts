import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicios/user.service';
import {GLOBAL} from '../servicios/global';
import { User } from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]

})

export class UserEditComponent implements OnInit {
    public titulo: string;
    public user:any=User;
    public identity: any;
    public token: any;
    public alertMessage:any;
    public img:any; //*preguntar por esto despues
    public url: string;
    
    constructor(
        private _userService: UserService
    ) {
        this.titulo = 'Actualizar mis datos';
        this.identity = this?._userService.getIdentity();
        this.token = this.token?._userService.getToken();
        //this.user = new User('', '', '', 'ROLE_USER', '', '', '');
        this.user=this.identity;
        this.url=GLOBAL.url;
        this.filesToUpload=this.img;   //*Cambiar despues
        

    }
    ngOnInit() {
        console.log('user-edit.component.ts cargado');
        

    }
    onSubmit(){
        //console.log(this.user);
        this._userService.update_user(this.user).subscribe({
            next:(response:any)=>{
                this.user=response.user;
                if(!response.user){
                    this.alertMessage='El usuario no se ha actualizado'
                }else{
                    //this.user=response.user;
                    localStorage.setItem('identity',JSON.stringify(this.user));
                    document.getElementById("identity_name")!.innerHTML=this.user.name
                    
                    if (!this.filesToUpload) {
                        //Redireccion
                    } else {
                        this.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload).then(
                            (result:any)=>{
                                this.user.image=result.image;
                                localStorage.setItem('identity',JSON.stringify(this.user));
                                let image_path=this.url+'get-image-user/'+this.user.image
                                document.getElementById('image-logged')?.setAttribute('src',image_path)
                            }
                        );

                    }
                    this.alertMessage="Datos actualizados correctamente";
                }
            }
        })
    }
    public filesToUpload:Array<File>;
    fileChangeEvent(fileInput:any){
        this.filesToUpload=<Array<File>>fileInput.target.files;


    }
    makeFileRequest(url:string,params:Array<string>,files:Array<File>){

        var token =this.token;
        return new Promise(function(resolve, reject){
            var formData:any=new FormData();
            var xhr = new XMLHttpRequest();
            for(var i=0;i<files.length;i++){
                formData.append('image',files[i],files[i].name)
            }
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }
                    
                }else{
                    reject(xhr.response)

                }
            }
            xhr.open('POST',url,true);
            xhr.setRequestHeader('Authorization',token);
            xhr.send(formData);

        });

        
    }

}