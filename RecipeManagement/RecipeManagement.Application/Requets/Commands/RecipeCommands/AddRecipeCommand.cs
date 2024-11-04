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


                Category category = _context.Category.Where(a => a.CategoryId == request.CategoryId).First();
            
            recipe.category=category;
            _context.Recipes.Add(recipe);
            return await _context.SaveChangesAsync();



        }

    }
}
