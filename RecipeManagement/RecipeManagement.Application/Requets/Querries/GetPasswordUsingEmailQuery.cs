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
    /*
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
     }*/
{
    public class ValidateUserQuery : IRequest<int?>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ValidateUserQueryHandler : IRequestHandler<ValidateUserQuery, int?>
    {
        private readonly RecipeManagementContext _context;

        public ValidateUserQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<int?> Handle(ValidateUserQuery request, CancellationToken cancellationToken)
        {
            // Fetch the user with the specified email
            var user = await _context.Users
                .Where(x => x.Email == request.Email)
                .FirstOrDefaultAsync(cancellationToken);

            // If user is not found or password does not match, return null
            if (user == null || user.Password != request.Password)
            {
                return null; // Or throw new Exception("Invalid email or password.");
            }

            // If password matches, return the UserId
            return user.UserId;
        }
    }
} 

