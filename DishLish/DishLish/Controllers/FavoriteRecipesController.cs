using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DishLish.Models;

namespace DishLish.Controllers
{
    public class FavoriteRecipesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: FavoriteRecipes
        public ActionResult Index()
        {
            var favoriteRecipes = db.FavoriteRecipes.Include(f => f.Recipe);
            return View(favoriteRecipes.ToList());
        }

        // GET: FavoriteRecipes/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FavoriteRecipe favoriteRecipe = db.FavoriteRecipes.Find(id);
            if (favoriteRecipe == null)
            {
                return HttpNotFound();
            }
            return View(favoriteRecipe);
        }

        // GET: FavoriteRecipes/Create
        public ActionResult Create()
        {
            ViewBag.RecipeId = new SelectList(db.Recipes, "Id", "RecipeTitle");
            return View();
        }

        // POST: FavoriteRecipes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,RecipeId")] FavoriteRecipe favoriteRecipe)
        {
            if (ModelState.IsValid)
            {
                db.FavoriteRecipes.Add(favoriteRecipe);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.RecipeId = new SelectList(db.Recipes, "Id", "RecipeTitle", favoriteRecipe.RecipeId);
            return View(favoriteRecipe);
        }

        // GET: FavoriteRecipes/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FavoriteRecipe favoriteRecipe = db.FavoriteRecipes.Find(id);
            if (favoriteRecipe == null)
            {
                return HttpNotFound();
            }
            ViewBag.RecipeId = new SelectList(db.Recipes, "Id", "RecipeTitle", favoriteRecipe.RecipeId);
            return View(favoriteRecipe);
        }

        // POST: FavoriteRecipes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,RecipeId")] FavoriteRecipe favoriteRecipe)
        {
            if (ModelState.IsValid)
            {
                db.Entry(favoriteRecipe).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.RecipeId = new SelectList(db.Recipes, "Id", "RecipeTitle", favoriteRecipe.RecipeId);
            return View(favoriteRecipe);
        }

        // GET: FavoriteRecipes/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            FavoriteRecipe favoriteRecipe = db.FavoriteRecipes.Find(id);
            if (favoriteRecipe == null)
            {
                return HttpNotFound();
            }
            return View(favoriteRecipe);
        }

        // POST: FavoriteRecipes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            FavoriteRecipe favoriteRecipe = db.FavoriteRecipes.Find(id);
            db.FavoriteRecipes.Remove(favoriteRecipe);
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
