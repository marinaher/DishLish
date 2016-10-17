using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DishLish.Models
{
    public class Map
    {
        public int Id { get; set; }

        [Display(Name= "Current Location")]
        public string CurrentLocation { get; set; }

        [Display(Name = "Destination")]
        public string Destination { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}