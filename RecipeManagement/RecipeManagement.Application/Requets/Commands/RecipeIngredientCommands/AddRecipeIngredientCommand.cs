using Azure.Core;
using MediatR;
using RecipeManagement.Application.Requets.Commands.RecipeCommands;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.RecipeIngredientCommands
{
    public class AddRecipeIngredientCommand : IRequest<int>
    {
        public int RecipeId { get; set; }
        public int ingredientId { get; set; }

        public string Quantity { get; set; }


        //to think Recipe ingredients just need recipeId and IngredientID?
        //cant we add lsit of ingredients in ingredient table itselfS

    }
    public class AddRecipeIngredientCommandHandler : IRequestHandler<AddRecipeIngredientCommand, int>
    {
        private readonly RecipeManagementContext _context;
        public AddRecipeIngredientCommandHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(AddRecipeIngredientCommand request, CancellationToken cancellationToken)
        {
            RecipeIngredients recipeIngredients=new RecipeIngredients();
            Recipe recipe=_context.Recipes.Where(a=>a.RecipeId==request.RecipeId).First();
            recipeIngredients.recipe=recipe;
            Ingredients ingredients=_context.Ingredients.Where(a=>a.IngredientsId==request.ingredientId).First();
            recipeIngredients.ingredients=ingredients;
            recipeIngredients.Quantity=request.Quantity;
            _context.RecipeIngredients.Add(recipeIngredients);
             await _context.SaveChangesAsync();
    

            return recipe.RecipeId;

        }
    }
}



