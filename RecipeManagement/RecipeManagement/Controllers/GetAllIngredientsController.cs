using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetAllIngredientsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GetAllIngredientsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<ActionResult<List<IngredientDTO>>> GetAllIngredients()
        {
            var result = await _mediator.Send(new GetAllIngredientsQuery());

            if (result == null || result.Count == 0)
            {
                return NotFound("No ingredients found.");
            }

            return Ok(result);
        }
    }
}
