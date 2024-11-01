using RecipeManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.DTO
{
    public class RecipeDTO
    {
        public int RecipeId { get; set; }
        public string RecipeTitle { get; set; }
        public string RecipeDescription { get; set; }

        public string Duration { get; set; }
        public CategoryDTO categoryDTO { get; set;}

        public bool IsComplete { get; set; }


    }
}
