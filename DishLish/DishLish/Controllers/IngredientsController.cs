using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DishLish.Models;
using System.Web.Script.Serialization;

namespace DishLish.Controllers
{
    public class IngredientsController : ApplicationBaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Ingredients
        public ActionResult Index()
        {
            string myIngredients = "";

            List<Ingredient> currentIngredients = new List<Ingredient>();
            foreach (var item in db.Ingredients)
            {
                currentIngredients.Add(item);
            }

            foreach (var item in db.Ingredients)
            {
                myIngredients += item.IngredientName + "+";
            }

            var model = new IndexViewModel
            {
                currentIngredients = currentIngredients,
                ingredients = myIngredients
            };

            return View(model);
        }

        //// Select Ingredient
        //public ActionResult SelectIngredient()
        //{
                
        //}

        // GET: Ingredients/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Ingredient ingredient = db.Ingredients.Find(id);
            if (ingredient == null)
            {
                return HttpNotFound();
            }
            return View(ingredient);
        }

        // GET: Ingredients/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Ingredients/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,IngredientName,Category")] Ingredient ingredient)
        {
            if (ModelState.IsValid)
            {
                db.Ingredients.Add(ingredient);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(ingredient);
        }

        [Serializable]
        public class MyIngredients
        {
            // this allows us to read the JSon object
            public string SingleIngredient { get; set; }
        }

        public void SaveIngredients(string[] incomingArray)
        {
            for (int i = 0; i < incomingArray.Length; i++)
            {
                Ingredient ingredient = new Ingredient();
                string[] categoryArray = new string[2];
                categoryArray = incomingArray[i].Split(',');
                ingredient.Category = categoryArray[1];
                ingredient.IngredientName = categoryArray[0];
                db.Ingredients.Add(ingredient);
                db.SaveChanges();
            }
            RedirectToAction("Index");
        }

        

        private IEnumerable<string> GetUnitsOfMeasurement()
        {
            return new List<string>
            {
                "c - Cups",
                "doz - Dozen",
                "fl oz - Fluid Ounce",
                "gal - Gallon",
                "g - Gram",
                "l - Liter",
                "ml - m]Millimeter",
                "oz - Ounce",
                "pinch",
                "pt - Pint",
                "lb - Pound",
                "qt - Quart",
                "tsp - Teaspoon",
                "tbsp - Tablespoon"
            };
        }

        private IEnumerable<SelectListItem> GetSelectListItems(IEnumerable<string> elements)
        {
            var selectList = new List<SelectListItem>();
            foreach (var element in elements)
            {
                selectList.Add(new SelectListItem
                {
                    Value = element,
                    Text = element
                });
            }

            return selectList;
        }

        //[HttpPost]
        //public ActionResult GetIngredients(List<string>ingredient)
        //{
        //    foreach (var item in ingredient)
        //    {
        //        Ingredient ingredients = new Ingredient();
        //        ingredients.IngredientName = item;
        //        if (ModelState.IsValid)
        //        {
        //            db.Ingredients.Add(ingredients);
        //            db.SaveChanges();
        //        }
        //    }

        //    return Index();
        //}

        // GET: Ingredients/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Ingredient ingredient = db.Ingredients.Find(id);
            if (ingredient == null)
            {
                return HttpNotFound();
            }
            return View(ingredient);
        }

        // POST: Ingredients/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,IngredientName,Category")] Ingredient ingredient)
        {
            if (ModelState.IsValid)
            {
                db.Entry(ingredient).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(ingredient);
        }

        // GET: Ingredients/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Ingredient ingredient = db.Ingredients.Find(id);
            if (ingredient == null)
            {
                return HttpNotFound();
            }
            return View(ingredient);
        }

        // POST: Ingredients/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Ingredient ingredient = db.Ingredients.Find(id);
            db.Ingredients.Remove(ingredient);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
