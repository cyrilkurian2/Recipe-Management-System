import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home-page', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'recipe/:id', component: ViewRecipeComponent, canActivate: [AuthGuard] },
  { path: 'favourite', component: FavouriteComponent, canActivate: [AuthGuard] },
  { path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard] },
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
