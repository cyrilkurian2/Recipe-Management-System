import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../recipe.service'; 
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-favourites-chart',
  standalone: true,
  templateUrl: './favourites-chart.component.html',
  styleUrls: ['./favourites-chart.component.scss']
})
export class FavouritesChartComponent implements OnInit {

  // Bar chart configuration with favourite count
  barChart: any = {
    type: 'bar',  // Set the chart type to bar
    data: {
      labels: [],  
      datasets: [{
        label: 'Favourite Count',
        data: [],  
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  constructor(private recipeService: RecipeService) {}

  // Fetch top 5 favourite recipes and update chart
  getTop5FavouriteRecipes() {
    const userId = this.recipeService.userId;  
    this.recipeService.getTop5FavouriteRecipes(userId).subscribe({
      next: (response) => {

        console.log(response.map((recipe: any) => recipe));

        if (response && response.length > 0) {
          // Map the response to chart data
          this.barChart.data.labels = response.map((recipe: any) => recipe.recipeTitle);  
          this.barChart.data.datasets[0].data = response.map((recipe: any) => recipe.favouriteCount);  
          // Create the bar chart
          this.createCharts();
        }
      },
      error: (error) => {
        console.error('Error fetching top 5 favourite recipes:', error);
      }
    });
  }

  // Create the bar chart
  createCharts(): void {
    const ctx = (document.getElementById('barChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, this.barChart);
    }
  }

  ngOnInit(): void {
    // Fetch the top 5 favourite recipes for the user on initialization
    this.getTop5FavouriteRecipes();
  }
}
