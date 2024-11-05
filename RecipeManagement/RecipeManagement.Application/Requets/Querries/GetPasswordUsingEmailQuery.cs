using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requests.Queries
{
    public class GetPasswordUsingEmailQuery : IRequest<LoginDTO>
    {
        public string Email { get; set; }
    }

    public class GetPasswordUsingEmailQueryHandler : IRequestHandler<GetPasswordUsingEmailQuery, LoginDTO>
    {
        private readonly RecipeManagementContext _context;

        public GetPasswordUsingEmailQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<LoginDTO> Handle(GetPasswordUsingEmailQuery request, CancellationToken cancellationToken)
        {
            // Fetch the user with the specified email
            var user = await _context.Users
                .Where(x => x.Email == request.Email)
                .Select(x => new LoginDTO
                {
                    Email = x.Email,
                    Password = x.Password
                })
                .FirstOrDefaultAsync(cancellationToken);

            // If user is not found, return null
            if (user == null)
            {
                throw new Exception("User with the specified email does not exist.");
            }

            return user;
        }
    }
}
