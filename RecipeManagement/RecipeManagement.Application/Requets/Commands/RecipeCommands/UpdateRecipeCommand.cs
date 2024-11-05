/*using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requests.Commands.RecipeCommands
{
    public class UpdateRecipeCommand : IRequest<int>
    {
     
        public string RecipeTitle { get; set; }
        public string RecipeDescription { get; set; }
        public string Duration { get; set; }
        public bool IsComplete { get; set; }
        public int CategoryId { get; set; }  
    }
    public class UpdateRecipeCommandHandler : IRequestHandler<UpdateRecipeCommand, int>
    {
        private readonly RecipeManagementContext _context;

        public UpdateRecipeCommandHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
        {
            var recipe = await _context.Recipes
                .FirstOrDefaultAsync(r => r.RecipeId == request.RecipeId, cancellationToken);

         

            recipe.RecipeTitle = request.RecipeTitle;
            recipe.RecipeDescription = request.RecipeDescription;
            recipe.Duration = request.Duration;
            recipe.IsComplete = request.IsComplete;

            *//*            if ( recipe.category.CategoryId != request.CategoryId)
                        {
                            var category = await _context.Category.FindAsync(request.CategoryId);

                                recipe.category = category;


                        }
            *//*
           

            return await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
*/
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagement.Application.Requests.Commands.RecipeCommands
{
    public class UpdateRecipeCommand : IRequest<bool>
    {
        public int RecipeId { get; private set; }
        public string RecipeTitle { get; set; }
        public string RecipeDescription { get; set; }
        public string Duration { get; set; }
        public bool IsComplete { get; set; }
        public int CategoryId { get; set; }

        public void SetRequestId(int id)
        {
            RecipeId = id;
        }
    }

    public class UpdateRecipeCommandHandler : IRequestHandler<UpdateRecipeCommand, bool>
    {
        private readonly RecipeManagementContext _context;

        public UpdateRecipeCommandHandler(RecipeManagementContext context)
        {
            this._context = context;
        }

        public async Task<bool> Handle(UpdateRecipeCommand request, CancellationToken cancellationToken)
        {
            // Find the recipe by RecipeId
            Recipe recipe = await _context.Recipes
                .FirstOrDefaultAsync(x => x.RecipeId == request.RecipeId, cancellationToken);

            if (recipe == null)
            {
                throw new Exception("Recipe not found.");
            }

            // Update recipe properties
            recipe.RecipeTitle = request.RecipeTitle;
            recipe.RecipeDescription = request.RecipeDescription;
            recipe.Duration = request.Duration;
            recipe.IsComplete = request.IsComplete;

            // Update category if needed
            if (recipe.category == null || recipe.category.CategoryId != request.CategoryId)
            {
                var category = await _context.Category.FindAsync(request.CategoryId);
                if (category == null)
                {
                    throw new Exception("Category not found.");
                }
                recipe.category = category;
            }

            _context.Recipes.Update(recipe);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
