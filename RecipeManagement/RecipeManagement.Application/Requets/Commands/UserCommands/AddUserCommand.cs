using MediatR;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Commands.UserCommands
{
    public class AddUserCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }

    public class addusercommandhandler : IRequestHandler<AddUserCommand, int>
    {
        private readonly RecipeManagementContext _context;

        public addusercommandhandler(RecipeManagementContext context)
        {
            _context = context;

        }


        public async Task<int> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            User user=new User();
            user.Name = request.Name;
            user.Email = request.Email;
            user.Password = request.Password;
            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);
            return user.UserId;


        }
    }
} 
