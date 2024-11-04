//using System;
//using System.Collections.Generic;
//using System.Globalization;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using MediatR;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using RecipeManagement.Application.DTO;
//using RecipeManagement.Infrastructure.Data;

//namespace RecipeManagement.Application.Requets.Querries
//{
//    public class SearchByQuery : IRequest<RecipeDTO>
//    {
//        public string RecipeTitle { get; set; }
//    }

//    public class SearchByQueryHandler : IRequestHandler<SearchByQuery, RecipeDTO> 
//    {
//        private readonly RecipeManagementContext _context;

//        public SearchByQueryHandler(RecipeManagementContext context) 
//        {
//            _context = context;

//        }

//        public async Task<RecipeDTO> Handle(SearchByQuery request, CancellationToken cancellationToken) 
//        { 
//            var recipe = await _context.Recipes
//                .Include(r => r.category)
//                .FirstOrDefaultAsync(r => r.RecipeTitle == request.RecipeTitle, cancellationToken);

//            if (recipe == null)
//            {
//                return null; // or throw an exception if preferred
//            }

//            var recipeDTO = new RecipeDTO
//            {
//                RecipeId = recipe.RecipeId,
//                RecipeTitle = recipe.RecipeTitle,
//                RecipeDescription = recipe.RecipeDescription,
//                Duration = recipe.Duration,
//                IsComplete = recipe.IsComplete,
//                categoryDTO = new CategoryDTO
//                {
//                    CategoryId = recipe.category.CategoryId,
//                    CategoryName = recipe.category.CategoryName
//                }
//            };

//            return recipeDTO;

//        }
//    }
//}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requests.Queries
{
    public class SearchByQuery : IRequest<List<RecipeDTO>>
    {
        public string RecipeTitle { get; set; }
    }

    public class SearchByQueryHandler : IRequestHandler<SearchByQuery, List<RecipeDTO>>
    {
        private readonly RecipeManagementContext _context;

        public SearchByQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeDTO>> Handle(SearchByQuery request, CancellationToken cancellationToken)
        {
            var recipes = await _context.Recipes
                .Include(r => r.category)
                .Where(r => r.RecipeTitle.Contains(request.RecipeTitle))
                .Select(r => new RecipeDTO
                {
                    RecipeId = r.RecipeId,
                    RecipeTitle = r.RecipeTitle,
                    RecipeDescription = r.RecipeDescription,
                    Duration = r.Duration,
                    IsComplete = r.IsComplete,
                    categoryDTO = new CategoryDTO
                    {
                        CategoryId = r.category.CategoryId,
                        CategoryName = r.category.CategoryName
                    }
                })
                .ToListAsync(cancellationToken);

            return recipes;
        }
    }
}
