using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requets.Querries
{
    public class GetProfileRecipeQuery : IRequest<List<RecipeDTO>>
    {
        public int UserId { get; set; }
    }

 

    public class GetProfileRecipeQueryHandler : IRequestHandler<GetProfileRecipeQuery, List<RecipeDTO>>
    {
        private readonly RecipeManagementContext _context;

        public GetProfileRecipeQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        //public async Task<List<RecipeDTO>> Handle(GetProfileRecipeQuery request, CancellationToken cancellationToken)
        //{
        //    var recipes = await _context.Recipes
        //        .Include(r => r.category)
        //        .Where(x => x.UserId == request.UserId)
        //        //.Where()
        //        .Select(recipe => new RecipeDTO 
        //        {
        //            RecipeId = recipe.RecipeId,
        //            RecipeTitle = recipe.RecipeTitle,
        //            RecipeDescription = recipe.RecipeDescription,
        //            Duration = recipe.Duration,
        //            IsComplete = recipe.IsComplete,
        //            categoryDTO = new CategoryDTO
        //            {
        //                CategoryId = recipe.category.CategoryId,
        //                CategoryName = recipe.category.CategoryName 
        //            }
        //        })
        //    .ToListAsync(cancellationToken);

        //    return recipes;
        //}
    }
}
