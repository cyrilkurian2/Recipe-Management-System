using Microsoft.EntityFrameworkCore;
using RecipeManagement.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeManagement.Infrastructure.Data
{
    public class RecipeManagementContext : DbContext
    {
        public RecipeManagementContext(DbContextOptions<RecipeManagementContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Ingredients> Ingredients { get; set; }
        public DbSet<RecipeIngredients> RecipeIngredients { get; set; }

        public DbSet<Favourites> Favourites { get; set; }

        public DbSet<Category> Category { get; set; }


        
    }


}
   


