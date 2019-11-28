import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from "./lists/lists.component";
import { CreateListComponent } from "./create-list/create-list.component";
import { VediListaComponent } from "./vedi-lista/vedi-lista.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RecoverComponent } from "./recover/recover.component"
import { HomeComponent } from "./home/home.component";
import { SettingsComponent } from './settings/settings.component';
import { RecoverListComponent } from './recover-list/recover-list.component';
import { ProfileComponent } from './profile/profile.component';
import { WorldComponent } from './world/world.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'recover/:token', component: RecoverComponent },    
    { path: 'home', component: HomeComponent, children: [
            { path: 'new', component: CreateListComponent },
            { path: 'world', component: WorldComponent},
            { path: 'settings', component: SettingsComponent },
            { path: 'recover-list', component: RecoverListComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'new/:editing', component: CreateListComponent },
            { path: 'vedi-lista/:idLista', component: VediListaComponent },
            { path: '', component: ListsComponent, pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path:'**', redirectTo:'/login'}
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }