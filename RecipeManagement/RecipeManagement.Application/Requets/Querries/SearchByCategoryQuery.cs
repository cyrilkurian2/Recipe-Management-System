using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace RecipeManagement.Application.Requests.Queries
{
    public class SearchByCategoryQuery : IRequest<List<RecipeDTO>>
    {
        public string CategoryName { get; set; }

        public SearchByCategoryQuery(string categoryName)
        {
            CategoryName = categoryName;
        }
    }

    public class SearchByCategoryQueryHandler : IRequestHandler<SearchByCategoryQuery, List<RecipeDTO>>
    {
        private readonly RecipeManagementContext _context;

        public SearchByCategoryQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeDTO>> Handle(SearchByCategoryQuery request, CancellationToken cancellationToken)
        {
            var recipes = await _context.Recipes
            .Include(r => r.category)
            .Where(r => r.category.CategoryName == request.CategoryName && r.IsComplete)
            .GroupJoin(
                _context.Favourites,
                recipe => recipe.RecipeId,
                favourite => favourite.recipe.RecipeId,
                (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
            )
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
                FavouritesCount = r.FavouritesCount // Adding favorites count to the DTO
            })
            .ToListAsync(cancellationToken);

             return recipes;

        }
    }
}

