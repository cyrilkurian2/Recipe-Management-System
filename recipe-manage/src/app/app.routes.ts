import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';




export const routes: Routes = [
    { path:'user-signup', component: UserComponent},
    { path:'home-page', component: HomepageComponent }
];
