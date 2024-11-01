using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Querries
{
    public class GetCategoryQuerry : IRequest<CategoryDTO>
    {
        public int CategoryId { get; set; }
    }
    public class GetCategoryQuerryHandler : IRequestHandler<GetCategoryQuerry,CategoryDTO>
    {
        public GetCategoryQuerryHandler(RecipeManagementContext context)
        {
            this.Context =context;
        }
        public RecipeManagementContext Context { get; }

        public async Task<CategoryDTO> Handle(GetCategoryQuerry request, CancellationToken cancellationToken)
        {
            CategoryDTO categoryDTO= new CategoryDTO();
            Category category = Context.Category.Where(x => x.CategoryId == request.CategoryId).First();
            categoryDTO.CategoryId = category.CategoryId;
            categoryDTO.CategoryName= category.CategoryName;
            return await Task.FromResult(categoryDTO);

        }
    }
}
