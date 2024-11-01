import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';





export const routes: Routes = [
    // { path:'user', component: UserComponent},
    { path:'home-page', component: HomepageComponent },
    { path:'profile', component: ProfileComponent},
    { path: 'recipe/:id', component: ViewRecipeComponent },
    { path: 'favourite', component: FavouriteComponent},
    { path: 'add-recipe', component: AddRecipeComponent},

    { 
        path: 'user', 
        component: UserComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' }, 
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: RegistrationComponent }
        ]
    },

    

];
