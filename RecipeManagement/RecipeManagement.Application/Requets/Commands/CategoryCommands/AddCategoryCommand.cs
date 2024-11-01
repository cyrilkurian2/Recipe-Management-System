using MediatR;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.CategoryCommands
{
    public class AddCategoryCommand : IRequest<int>
    {
        public string CategoryName { get; set; }

    }
    public class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand,int>
    {
        private readonly RecipeManagementContext _context;
        public AddCategoryCommandHandler(RecipeManagementContext context)
        {
            _context = context;
        }
        public async Task<int>Handle(AddCategoryCommand request,CancellationToken cancellationToken)
        {
            Category category=new Category();
            category.CategoryName = request.CategoryName;
            _context.Category.Add(category);
             await _context.SaveChangesAsync(cancellationToken);
            return category.CategoryId;
        }

    }
}
