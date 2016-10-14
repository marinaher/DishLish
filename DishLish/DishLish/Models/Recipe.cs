using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DishLish.Models
{
    public class Recipe
    {
        [Key]
        public int Id { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Recipe Title")]
        public string RecipeTitle { get; set; }

        [DataType(DataType.Text)]
        [StringLength(500)]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Serving Size")]
        public int ServingSize { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Calories per Serving")]
        public decimal CaloriesPerServing { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Food Category")]
        public string FoodCategory { get; set; }

        [DataType(DataType.Text)]
        [StringLength(1000)]
        [Display(Name = "Instructions")]
        public string Instructions { get; set; }

        [DataType(DataType.Time)]
        [Display(Name = "Preparation Time")]
        public TimeSpan PreparationTime { get; set; }

        public string Source { get; set; }
        public int Rating { get; set; }

        public ICollection Ingredient { get; set; }
    }
}