using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace DishLish.Models
{
    public class GroceryList
    {
        [Key]
        public int Id { get; set; }

        [Display(Name = "Ingredient")]
        public string NameOfIngredient { get; set; }
        
        [Display(Name = "Amount to buy")]
        public int? BuyAmount { get; set; }
    }
}