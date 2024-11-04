﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using RecipeManagement.Application.DTO;
using RecipeManagement.Infrastructure.Data;

namespace RecipeManagement.Application.Requets.Querries
{
    public class GetProfileRecipeQuery : IRequest<List<RecipeDTO>>
    {
        public int UserId { get; set; }
    }



    public class GetProfileRecipeQueryHandler : IRequestHandler<GetProfileRecipeQuery, List<RecipeDTO>>
    {
        private readonly RecipeManagementContext _context;

        public GetProfileRecipeQueryHandler(RecipeManagementContext context)
        {
            _context = context;
        }

        public async Task<List<RecipeDTO>> Handle(GetProfileRecipeQuery request, CancellationToken cancellationToken)
        {
            //var recipes = await _context.RecipeAuthors
            //.Where(ra => ra.User.UserId == request.UserId) // Filter by UserId
            //.Select(ra => ra.Recipe) // Select associated Recipe
            //.Select(recipe => new RecipeDTO
            //{
            //    RecipeId = recipe.RecipeId,
            //    RecipeTitle = recipe.RecipeTitle,
            //    RecipeDescription = recipe.RecipeDescription,
            //    Duration = recipe.Duration,
            //    IsComplete = recipe.IsComplete,
            //    categoryDTO = new CategoryDTO
            //    {
            //        CategoryId = recipe.category.CategoryId,
            //        CategoryName = recipe.category.CategoryName
            //    }
            //})
            //.ToListAsync(cancellationToken);

            //return recipes;


            var recipes = await _context.RecipeAuthors
            .Where(ra => ra.User.UserId == request.UserId) // Filter by UserId
            .Select(ra => ra.Recipe) // Select associated Recipe
            .GroupJoin(
                _context.Favourites,
                recipe => recipe.RecipeId,
                favourite => favourite.recipe.RecipeId,
                (recipe, favourites) => new { Recipe = recipe, FavouritesCount = favourites.Count() }
            )
            .Select(r => new RecipeDTO
            {
                RecipeId = r.Recipe.RecipeId,
                RecipeTitle = r.Recipe.RecipeTitle,
                RecipeDescription = r.Recipe.RecipeDescription,
                Duration = r.Recipe.Duration,
                IsComplete = r.Recipe.IsComplete,
                categoryDTO = new CategoryDTO
                {
                    CategoryId = r.Recipe.category.CategoryId,
                    CategoryName = r.Recipe.category.CategoryName
                },
                FavouritesCount = r.FavouritesCount // Include the count of users who favorited this recipe
            })
            .ToListAsync(cancellationToken);

            return recipes;





        }


    }
}
