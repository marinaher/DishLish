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
    public class CurrentInventoriesController : ApplicationBaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: CurrentInventories
        public ActionResult Index()
        {
            var currentInventories = db.CurrentInventories.Include(c => c.Ingredient);
            return View(currentInventories.ToList());
        }

        // GET: CurrentInventories/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CurrentInventory currentInventory = db.CurrentInventories.Find(id);
            if (currentInventory == null)
            {
                return HttpNotFound();
            }
            return View(currentInventory);
        }

        // GET: CurrentInventories/Create
        public ActionResult Create()
        {
            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Ingredient");
            return View();
        }

        // POST: CurrentInventories/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,IngredientId,AvailableQuantity")] CurrentInventory currentInventory)
        {
            if (ModelState.IsValid)
            {
                db.CurrentInventories.Add(currentInventory);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Ingredient", currentInventory.IngredientId);
            return View(currentInventory);
        }

        // GET: CurrentInventories/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CurrentInventory currentInventory = db.CurrentInventories.Find(id);
            if (currentInventory == null)
            {
                return HttpNotFound();
            }
            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Ingredient", currentInventory.IngredientId);
            return View(currentInventory);
        }

        // POST: CurrentInventories/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,IngredientId,AvailableQuantity")] CurrentInventory currentInventory)
        {
            if (ModelState.IsValid)
            {
                db.Entry(currentInventory).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.IngredientId = new SelectList(db.Ingredients, "Id", "Ingredient", currentInventory.IngredientId);
            return View(currentInventory);
        }

        // GET: CurrentInventories/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CurrentInventory currentInventory = db.CurrentInventories.Find(id);
            if (currentInventory == null)
            {
                return HttpNotFound();
            }
            return View(currentInventory);
        }

        // POST: CurrentInventories/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CurrentInventory currentInventory = db.CurrentInventories.Find(id);
            db.CurrentInventories.Remove(currentInventory);
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
