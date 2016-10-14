using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DishLish.Models
{
    public class FavoriteRecipe
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Recipe")]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}