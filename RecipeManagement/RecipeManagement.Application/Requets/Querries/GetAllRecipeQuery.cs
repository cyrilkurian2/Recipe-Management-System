using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requets.Querries
{
    public class GetAllRecipeQuery : IRequest<List<RecipeDTO>>
    {
    }

    public class GetAllRecipeQueryHandler : IRequestHandler<GetAllRecipeQuery, List<RecipeDTO>>
    {
        private readonly RecipeManagementContext _context;

        public GetAllRecipeQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeDTO>> Handle(GetAllRecipeQuery request, CancellationToken cancellationToken)
        {
            var recipes = await _context.Recipes
                .Include(r => r.category)
                .GroupJoin(
                    _context.Favourites,
                    recipe => recipe.RecipeId,
                    favourite => favourite.recipe.RecipeId,
                    (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
                )
                .Select(r => new
                {
                    r.Recipe,
                    r.FavouritesCount,
                    Author = _context.RecipeAuthors
                        .Where(ra => ra.Recipe.RecipeId == r.Recipe.RecipeId)
                        .Select(ra => ra.User)
                        .FirstOrDefault()
                })
                .Where(r => r.Recipe.IsComplete)
                .OrderByDescending(r => r.FavouritesCount)
                .Select(r => new RecipeDTO
                {
                    RecipeId = r.Recipe.RecipeId,
                    RecipeTitle = r.Recipe.RecipeTitle,
                    RecipeDescription = r.Recipe.RecipeDescription,
                    Duration = r.Recipe.Duration,
                    RecipeImage = r.Recipe.RecipeImage,
                    RecipeSteps = r.Recipe.RecipeSteps,
                    IsComplete = r.Recipe.IsComplete,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = r.Recipe.category.CategoryId,
                        CategoryName = r.Recipe.category.CategoryName
                    },
                    FavouritesCount = r.FavouritesCount,
                    User = r.Author == null ? null : new UserDTO
                    {
                        UserId = r.Author.UserId,
                        Name = r.Author.Name,
                        Email = r.Author.Email
                    }
                })
                .ToListAsync(cancellationToken);

            return recipes;
        }
    }
}
