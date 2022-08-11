import { Component, OnInit } from "@angular/core";
import {Router, ActivatedRoute,Params} from '@angular/router';
import { UserService } from "../servicios/user.service";
import {GLOBAL}from '../servicios/global';
import { Artist } from "../models/artist";

@Component({
    selector: 'artist-list',
    templateUrl:'../views/artist-list.html',
    providers: [UserService]
})
export class ArtistListComponent {//implements OnInit
    // ngOnInit(): void {
        
    // }
    public titulo:string;
    public artist: Artist[]=[];
    public identity:any;
    public token:any;
    public url:string;

    constructor(
        private _route: ActivatedRoute,
        private _router:Router,
        private _userService:UserService,


    ){
        this.titulo='Artistas';
        this.identity= this._userService.getIdentity();
        this.token=this._userService.getToken();
        this.url=GLOBAL.url;
    }


}