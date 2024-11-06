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
    public class GetFavouritesQuery : IRequest<FavouritesDTO>
    {
        public int UserId { get; set; }

        public GetFavouritesQuery(int userId)
        {
            UserId = userId;
        }
    }

    public class GetFavouritesQueryHandler : IRequestHandler<GetFavouritesQuery, FavouritesDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetFavouritesQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<FavouritesDTO> Handle(GetFavouritesQuery request, CancellationToken cancellationToken)
        {
            // Retrieve the user and favorite recipes for the specified UserId
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null) return null;

            var recipes = await _context.Favourites
     .Where(f => f.user.UserId == request.UserId)
     .Include(f => f.recipe)                   // Include the recipe navigation property
     .ThenInclude(r => r.category)             // Then include category of the recipe
     .Select(f => new RecipeDTO
     {
         RecipeId = f.recipe.RecipeId,
         RecipeTitle = f.recipe.RecipeTitle,
         RecipeDescription = f.recipe.RecipeDescription,
         Duration = f.recipe.Duration,
         RecipeSteps = f.recipe.RecipeSteps,
         RecipeImage = f.recipe.RecipeImage,
         IsComplete = f.recipe.IsComplete,
         categoryDTO = new CategoryDTO
         {
             CategoryId = f.recipe.category.CategoryId,
             CategoryName = f.recipe.category.CategoryName
         },
         FavouritesCount = _context.Favourites.Count(fav => fav.recipe.RecipeId == f.recipe.RecipeId),
         User = _context.RecipeAuthors
                 .Where(ra => ra.Recipe.RecipeId == f.recipe.RecipeId)
                 .Select(ra => new UserDTO
                 {
                     UserId = ra.User.UserId,
                     Name = ra.User.Name,
                     Email = ra.User.Email
                 })
                 .FirstOrDefault()
     })
     .ToListAsync(cancellationToken);


            // Populate FavouritesDTO with user and their favorite recipes
            return new FavouritesDTO
            {
                userDTO = new UserDTO
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Email = user.Email
                },
                Recipes = recipes
            };
        }
    }
}
