/*using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetRecipeByIdQuery : IRequest<RecipeDTO>
    {
        public int RecipeId { get; set; }

        public GetRecipeByIdQuery(int recipeId)
        {
            RecipeId = recipeId;
        }
    }

    public class GetRecipeByIdQueryHandler : IRequestHandler<GetRecipeByIdQuery, RecipeDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetRecipeByIdQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<RecipeDTO> Handle(GetRecipeByIdQuery request, CancellationToken cancellationToken)
        {
            var recipe = await _context.Recipes
            .Include(r => r.category)
            .Where(r => r.RecipeId == request.RecipeId)
            .Select(r => new
            {
                Recipe = r,
                FavouritesCount = _context.Favourites.Count(f => f.recipe.RecipeId == r.RecipeId)
            })
            .FirstOrDefaultAsync(cancellationToken);

            if (recipe == null)
            {
                return null; // Handle null case in controller
            }

            return new RecipeDTO
            {
                RecipeId = recipe.Recipe.RecipeId,
                RecipeTitle = recipe.Recipe.RecipeTitle,
                RecipeDescription = recipe.Recipe.RecipeDescription,
                Duration = recipe.Recipe.Duration,
                IsComplete = recipe.Recipe.IsComplete,
                categoryDTO = new CategoryDTO
                {
                    CategoryId = recipe.Recipe.category.CategoryId,
                    CategoryName = recipe.Recipe.category.CategoryName
                },
                FavouritesCount = recipe.FavouritesCount // Adding favorites count to the DTO
            };

        }
    }
}
*/
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetRecipeByIdQuery : IRequest<RecipeDTO>
    {
        public int RecipeId { get; set; }

        public GetRecipeByIdQuery(int recipeId)
        {
            RecipeId = recipeId;
        }
    }

    public class GetRecipeByIdQueryHandler : IRequestHandler<GetRecipeByIdQuery, RecipeDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetRecipeByIdQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<RecipeDTO> Handle(GetRecipeByIdQuery request, CancellationToken cancellationToken)
        {
            var recipe = await _context.Recipes
                .Include(r => r.category)
                .Where(r => r.RecipeId == request.RecipeId)
                .Select(r => new
                {
                    Recipe = r,
                    FavouritesCount = _context.Favourites.Count(f => f.recipe.RecipeId == r.RecipeId),
                    Author = _context.RecipeAuthors
                        .Where(ra => ra.Recipe.RecipeId == r.RecipeId)
                        .Select(ra => ra.User)
                        .FirstOrDefault()
                })
                .FirstOrDefaultAsync(cancellationToken);

            if (recipe == null)
            {
                return null; // Handle null case in controller
            }

            return new RecipeDTO
            {
                RecipeId = recipe.Recipe.RecipeId,
                RecipeTitle = recipe.Recipe.RecipeTitle,
                RecipeDescription = recipe.Recipe.RecipeDescription,
                Duration = recipe.Recipe.Duration,
                IsComplete = recipe.Recipe.IsComplete,
                RecipeSteps=recipe.Recipe.RecipeSteps,
                RecipeImage=recipe.Recipe.RecipeImage,
                categoryDTO = new CategoryDTO
                {
                    CategoryId = recipe.Recipe.category.CategoryId,
                    CategoryName = recipe.Recipe.category.CategoryName
                },
                FavouritesCount = recipe.FavouritesCount,
                User = recipe.Author == null ? null : new UserDTO
                {
                    UserId = recipe.Author.UserId,
                    Name = recipe.Author.Name,
                    Email = recipe.Author.Email
                }
            };
        }
    }
}
