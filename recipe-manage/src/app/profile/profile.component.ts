import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent,RecipeCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  topRatedRecipes = {
    labels: ['Recipe 1', 'Recipe 2', 'Recipe 3', 'Recipe 4', 'Recipe 5'],
    datasets: [{
      label: 'Rating',
      data: [4.8, 4.5, 4.3, 4.1, 4.0],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  // Initialize the chart after the view is loaded
  ngAfterViewInit(): void {
    const ctx = (document.getElementById('topRatedChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: this.topRatedRecipes,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5
            }
          }
        }
      });
    }
  }
}
