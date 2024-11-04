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
                    favourite => favourite.RecipeId,
                    (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
                )
                .OrderByDescending(r => r.FavouritesCount)
                .Select(r => new RecipeDTO
                {
                    RecipeId = r.Recipe.RecipeId,
                    RecipeTitle = r.Recipe.RecipeTitle,
                    RecipeDescription = r.Recipe.RecipeDescription,
                    Duration = r.Recipe.Duration,
                    IsComplete = r.Recipe.IsComplete,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = r.Recipe.category.CategoryId,
                        CategoryName = r.Recipe.category.CategoryName
                    },
                    FavouritesCount = r.FavouritesCount // Optional: Include in DTO if needed
                })
                .ToListAsync(cancellationToken);

            return recipes;
        }
    }



}