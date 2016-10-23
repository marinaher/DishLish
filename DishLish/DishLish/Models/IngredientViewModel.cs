using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DishLish.Models
{
    public class IngredientViewModel
    {
        [Display(Name = "Ingredient Name")]
        public string IngredientName { get; set; }

        public string Category { get; set; }

        [Display(Name = "Units of Measurement")]
        public string UnitOfMeasurement { get; set; }
        public IEnumerable<SelectListItem> UnitsOfMeasurement { get; set; }
    }
}