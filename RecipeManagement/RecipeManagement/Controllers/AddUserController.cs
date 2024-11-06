using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Queries;
using RecipeManagement.Application.Requets.Commands.UserCommands;
using RecipeManagement.Application.Requets.Querries;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddUserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AddUserController(IMediator mediator)
        {
            _mediator = mediator;

        }
        [HttpPost]
        public async Task<int> AddUser(AddUserCommand command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("{userId}")]

        public async Task<UserDTO> Get( int userId)
        {
            return await _mediator.Send(new GetUserQuerry { UserId = userId });
        }

        [HttpPost("ValidateUser")]
        public async Task<ActionResult<int?>> ValidateUser([FromBody] ValidateUserQuery query)
        {
            var userId = await _mediator.Send(query);

            if (userId == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(userId);
        }



    }
}
