import { NgModule } from '@angular/core';
import {Routes,RouterModule} from "@angular/router";
//import user
import { UserEditComponent } from "./components/user-edit.component";
const Routes:Routes=[
    {path:'',component:UserEditComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'**',component:UserEditComponent}
    
];
@NgModule({
    imports: [RouterModule.forRoot(Routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
export const appRoutingProviders:any[]=[];
