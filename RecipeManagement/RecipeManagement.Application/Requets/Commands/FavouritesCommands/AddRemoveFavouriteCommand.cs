using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.FavouritesCommands
{
    public class AddRemoveFavouriteCommand: IRequest<string>
    {
      
            public int UserId { get; set; }
            public int RecipeId { get; set; }
        }

        public class AddRemoveFavouriteCommandHandler : IRequestHandler<AddRemoveFavouriteCommand, string>
        {
            private readonly RecipeManagementContext _context;

            public AddRemoveFavouriteCommandHandler(RecipeManagementContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(AddRemoveFavouriteCommand request, CancellationToken cancellationToken)
            {
                // Check if the favorite entry already exists
                var existingFavourite = await _context.Favourites
                    .FirstOrDefaultAsync(f => f.user.UserId == request.UserId && f.recipe.RecipeId == request.RecipeId, cancellationToken);

                if (existingFavourite != null)
                {
                    // If it exists, remove it (toggle off)
                    _context.Favourites.Remove(existingFavourite);
                    await _context.SaveChangesAsync(cancellationToken);
                    return "Removed from favourites";
                }
                else
                {
                    // If it does not exist, add it (toggle on)
                    var user = await _context.Users.FindAsync(request.UserId);
                    var recipe = await _context.Recipes.FindAsync(request.RecipeId);

                  

                    var newFavourite = new Favourites
                    {
                        user = user,
                        recipe = recipe
                    };

                    _context.Favourites.Add(newFavourite);
                    await _context.SaveChangesAsync(cancellationToken);
                    return "Added to favourites";
                }
            }
        }
    

}

