using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Commands.RecipeCommands;
using RecipeManagement.Application.Requests.Queries;
using RecipeManagement.Application.Requets.Commands.CategoryCommands;
using RecipeManagement.Application.Requets.Commands.RecipeCommands;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddRecipeController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AddRecipeController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<int> AddRecipe(AddRecipeCommand command)
        {
            return await _mediator.Send(command);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(int id, [FromBody] UpdateRecipeCommand command)
        {
             
            command.SetRequestId(id);


            var result = await _mediator.Send(command);
            if (result)
            {
                return NoContent(); 
            }
            else
            {
                return NotFound(); 
            }
        }

    }
}

