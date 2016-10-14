using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DishLish.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "Street Address")]
        public string StreetAddress { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "City")]
        public string City { get; set; }

        [DataType(DataType.Text)]
        [Display(Name = "State")]
        [StringLength(2)]
        public string State { get; set; }

        [DataType(DataType.PostalCode)]
        [Display(Name = "Zip Code")]
        public int ZipCode { get; set; }
    }
}