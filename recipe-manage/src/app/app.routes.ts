import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './user/registration/registration.component';




export const routes: Routes = [
    // { path:'user', component: UserComponent},
    { path:'home-page', component: HomepageComponent },
    { path:'profile', component: ProfileComponent},

    { 
        path: 'user', 
        component: UserComponent,
        children: [
            // { path: 'login', component: LoginComponent },
            { path: 'signup', component: RegistrationComponent }
        ]
    },
];
