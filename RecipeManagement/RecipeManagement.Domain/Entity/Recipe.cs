using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Domain.Entity
{
    public class Recipe
    {
        public int RecipeId { get; set; }
        public string RecipeTitle { get; set; }
        public string RecipeDescription { get; set;}
        public string Duration { get; set; }
        public Category category { get; set; }  
        public bool IsComplete {  get; set; }=false;


    }
}
