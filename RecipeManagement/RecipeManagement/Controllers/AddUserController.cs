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

        [HttpGet]

        public async Task<UserDTO> Get([FromBody] int userId)
        {
            return await _mediator.Send(new GetUserQuerry { UserId = userId });
        }

        [HttpGet("Email-Password/{email}")]
        public async Task<ActionResult<LoginDTO>> GetPasswordByEmail(string email)
        {
            var result = await _mediator.Send(new GetPasswordUsingEmailQuery { Email = email });

            if (result == null)
            {
                return NotFound("User with the specified email was not found.");
            }

            return Ok(result);
        }



    }
}
