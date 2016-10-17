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
    public class GroceryListsController : ApplicationBaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: GroceryLists
        public ActionResult Index()
        {
            var groceryLists = db.GroceryLists.Include(g => g.Ingredient);
            return View(groceryLists.ToList());
        }

        // GET: GroceryLists/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GroceryList groceryList = db.GroceryLists.Find(id);
            if (groceryList == null)
            {
                return HttpNotFound();
            }
            return View(groceryList);
        }

        // GET: GroceryLists/Create
        public ActionResult Create()
        {
            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Name");
            return View();
        }

        // POST: GroceryLists/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,IngredientId,BuyAmount")] GroceryList groceryList)
        {
            if (ModelState.IsValid)
            {
                db.GroceryLists.Add(groceryList);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Name", groceryList.IngredientId);
            return View(groceryList);
        }

        // GET: GroceryLists/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GroceryList groceryList = db.GroceryLists.Find(id);
            if (groceryList == null)
            {
                return HttpNotFound();
            }
            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Name", groceryList.IngredientId);
            return View(groceryList);
        }

        // POST: GroceryLists/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,IngredientId,BuyAmount")] GroceryList groceryList)
        {
            if (ModelState.IsValid)
            {
                db.Entry(groceryList).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Name", groceryList.IngredientId);
            return View(groceryList);
        }

        // GET: GroceryLists/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            GroceryList groceryList = db.GroceryLists.Find(id);
            if (groceryList == null)
            {
                return HttpNotFound();
            }
            return View(groceryList);
        }

        // POST: GroceryLists/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            GroceryList groceryList = db.GroceryLists.Find(id);
            db.GroceryLists.Remove(groceryList);
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
