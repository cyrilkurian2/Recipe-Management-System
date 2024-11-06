import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import Chart from 'chart.js/auto';
import { RouterModule } from '@angular/router';
import { FavouritesChartComponent } from "./favourites-chart/favourites-chart.component";
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, RecipeCardComponent, RouterModule, FavouritesChartComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;

  constructor(private recipeService : RecipeService) {}

  ngOnInit() {
    const userId = this.recipeService.userId; 
    this.recipeService.getUserById(userId).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
