using MediatR;
using RecipeManagement.Application.DTO;
using RecipeManagement.Domain.Entity;
using RecipeManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Application.Requets.Querries
{
    public class GetUserQuerry : IRequest<UserDTO>
    {
        public int UserId { get; set; }
    }
    public class GetUserQuerryHandler : IRequestHandler<GetUserQuerry, UserDTO>
    {
        public GetUserQuerryHandler(RecipeManagementContext context)
        {
            this.Context = context;
        }
        public RecipeManagementContext Context { get; }

        public async Task<UserDTO> Handle(GetUserQuerry request, CancellationToken cancellationToken)
        {
            UserDTO userDTO=new UserDTO();
            User user = Context.Users.Where(x => x.UserId == request.UserId).First();
            userDTO.UserId = user.UserId;
            userDTO.Name=user.Name;
            userDTO.Email=user.Email;
            return await Task.FromResult(userDTO);


        }


    }
}
