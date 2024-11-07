using Azure.Core;
using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.RecipeCommands
{
    public class AddRecipeCommand : IRequest<int>
    {
        public string RecipeTitle { get; set; }
        public string RecipeDescription { get; set; }

        public string Duration { get; set; }
        //public Category category { get; set; }
        public int CategoryId {  get; set; }
        public bool IsComplete { get; set; } = false;

        public int UserId { get; set; }
        public string RecipeImage { get; set; }

        public string RecipeSteps { get; set; }

    }

    public class AddRecipeCommandHandler :IRequestHandler<AddRecipeCommand, int>
    {
       private readonly RecipeManagementContext _context;
        public AddRecipeCommandHandler(RecipeManagementContext context)
        {
            _context = context;

        }
        public async Task<int> Handle(AddRecipeCommand request, CancellationToken cancellationToken)
        {
            Recipe recipe=new Recipe();
            recipe.RecipeTitle=request.RecipeTitle;
            recipe.RecipeDescription=request.RecipeDescription;
            recipe.Duration=request.Duration;
            recipe.RecipeSteps=request.RecipeSteps;
            recipe.RecipeImage=request.RecipeImage; 


                Category category = _context.Category.Where(a => a.CategoryId == request.CategoryId).First();
            
            recipe.category=category;
            recipe.IsComplete=request.IsComplete;
            _context.Recipes.Add(recipe);
             await _context.SaveChangesAsync();

            RecipeAuthor recipeAuthor = new RecipeAuthor
            {
                Recipe = recipe,
                User = _context.Users.FirstOrDefault(u => u.UserId == request.UserId)  
            };

            _context.RecipeAuthors.Add(recipeAuthor); 
            await _context.SaveChangesAsync(cancellationToken);

            return recipe.RecipeId;

        }

    }
}
