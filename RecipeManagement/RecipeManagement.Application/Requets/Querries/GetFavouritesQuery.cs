/*using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
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
<<<<<<< HEAD:RecipeManagement/RecipeManagement.Application/Requets/Querries/GetFavouritesQuery.cs
    
=======
    public class GetFavouritesQuerry : IRequest<FavouritesDTO>
    {
        public int UserId { get; set; }

    }
    public class GetFavouritesQuerryHandler : IRequestHandler<GetFavouritesQuerry, FavouritesDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetFavouritesQuerryHandler(RecipeManagementContext context)
        {
            this._context = context;
        }

        public async Task<FavouritesDTO> Handle(GetFavouritesQuerry request, CancellationToken cancellationToken)
        {
            var favourites = await _context.Favourites
                .Include(r=>r.recipe).
                Where(x => x.user.UserId == request.UserId).    
                Select(recipe => new RecipeDTO
                {
                    RecipeId = recipe.RecipeId,
                    RecipeTitle = recipe.RecipeTitle,
                    RecipeDescription = recipe.RecipeDescription,
                    Duration = recipe.Duration,
                    IsComplete = recipe.IsComplete,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = recipe.category.CategoryId,
                        CategoryName = recipe.category.CategoryName
                    }
                })
    .ToListAsync(cancellationToken);
            return recipe;
        }
    }
}
*/
/*using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetFavouritesQuery : IRequest<FavouritesDTO>
    {
        public int UserId { get; set; }
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
            var favouriteRecipes = await _context.Favourites
                .Where(f => f.user.UserId == request.UserId)
                .Include(f => f.recipe)
                .ThenInclude(r => r.category)
                .Select(f => new RecipeDTO
                {
                    RecipeId = f.recipe.RecipeId,
                    RecipeTitle = f.recipe.RecipeTitle,
                    RecipeDescription = f.recipe.RecipeDescription,
                    Duration = f.recipe.Duration,
                    IsComplete = f.recipe.IsComplete,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = f.recipe.category.CategoryId,
                        CategoryName = f.recipe.category.CategoryName
                    }
                })
                .ToListAsync(cancellationToken);

            return new FavouritesDTO
            {
                userDTO = new UserDTO { UserId = request.UserId }, // assuming UserDTO contains UserId
                recipeDTO = favouriteRecipes,
            };
        }
    }
}
*/
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetFavouritesQuery : IRequest<FavouritesDTO>
    {
        public int UserId { get; set; }
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
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }

            var favouriteRecipes = await _context.Favourites
                .Where(f => f.user.UserId == request.UserId)
                .Include(f => f.recipe)
                .ThenInclude(r => r.category)
                .Select(f => new RecipeDTO
                {
                    RecipeId = f.recipe.RecipeId,
                    RecipeTitle = f.recipe.RecipeTitle,
                    RecipeDescription = f.recipe.RecipeDescription,
                    Duration = f.recipe.Duration,
                    IsComplete = f.recipe.IsComplete,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = f.recipe.category.CategoryId,
                        CategoryName = f.recipe.category.CategoryName
                    }
                })
                .ToListAsync(cancellationToken);

            return new FavouritesDTO
            {
                userDTO = new UserDTO
                {
                    UserId = user.UserId,
                    Name = user.Name,
                    Email = user.Email
                },
                Recipes = favouriteRecipes
            };
        }
    }
>>>>>>> e854f138508630e24c5a11b129413b332f350ddf:RecipeManagement/RecipeManagement.Application/Requets/Querries/GetFavouritesQuerry.cs
}


