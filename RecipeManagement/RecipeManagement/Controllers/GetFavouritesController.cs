using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeManagement.Application.DTO;
using RecipeManagement.Application.Requests.Queries;
using RecipeManagement.Application.Requets.Querries;

namespace RecipeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetFavouritesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public GetFavouritesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("{userId}")]
        public async Task<ActionResult<FavouritesDTO>> Get(int userId)
        {
            var result = await _mediator.Send(new GetFavouritesQuery(userId));
            if (result == null)
            {
                return NotFound(); // Return a 404 if the user or favorites are not found
            }
            return Ok(result); // Return a 200 response with the result
        }
    }
}
