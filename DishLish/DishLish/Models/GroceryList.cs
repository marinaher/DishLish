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

        [ForeignKey("Ingredient")]
        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        
        public int BuyAmount { get; set; }
    }
}