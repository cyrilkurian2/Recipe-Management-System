using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requets.Querries
{

    public class DeleteRecipeByIdQuery : IRequest<bool>
    {
        public int RecipeId { get; set; }

        public DeleteRecipeByIdQuery(int recipeId)
        {
            RecipeId = recipeId;
        }
    }

    public class DeleteRecipeByIdQueryHandler : IRequestHandler<DeleteRecipeByIdQuery, bool>
    {
        private readonly RecipeManagementContext _context;

        public DeleteRecipeByIdQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteRecipeByIdQuery request, CancellationToken cancellationToken)
        {
            // Retrieve the recipe with related Favourites
            var recipe = await _context.Recipes
                 // Ensure Favourites are included for deletion
                .FirstOrDefaultAsync(r => r.RecipeId == request.RecipeId, cancellationToken);

            if (recipe == null)
            {
                return false; // Recipe not found, handle in controller
            }

            // Delete associated favourites
            var favouritesToDelete = await _context.Favourites
                .Where(f => f.recipe.RecipeId == request.RecipeId)
                .ToListAsync(cancellationToken);

            _context.Favourites.RemoveRange(favouritesToDelete);

            // Delete the recipe
            _context.Recipes.Remove(recipe);

            // Save all changes to the database
            await _context.SaveChangesAsync(cancellationToken);

            return true; // Indicate successful deletion
        }

    }
}
