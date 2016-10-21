using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DishLish.Models
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Ingredient Name")]
        public string IngredientName { get; set; }

        public string Category { get; set; }

        public bool IsSelected { get; set; }
    }
}