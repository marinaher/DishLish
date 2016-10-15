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
    public class PantryOwnersController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: PantryOwners
        public ActionResult Index()
        {
            var pantryOwners = db.PantryOwners.Include(p => p.Address);
            return View(pantryOwners.ToList());
        }

        // GET: PantryOwners/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PantryOwner pantryOwner = db.PantryOwners.Find(id);
            if (pantryOwner == null)
            {
                return HttpNotFound();
            }
            return View(pantryOwner);
        }

        // GET: PantryOwners/Create
        public ActionResult Create()
        {
            ViewBag.AddressID = new SelectList(db.Addresses, "Id", "StreetAddress");
            return View();
        }

        // POST: PantryOwners/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FirstName,LastName,DOB,AddressID")] PantryOwner pantryOwner)
        {
            if (ModelState.IsValid)
            {
                db.PantryOwners.Add(pantryOwner);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.AddressID = new SelectList(db.Addresses, "Id", "StreetAddress", pantryOwner.AddressID);
            return View(pantryOwner);
        }

        // GET: PantryOwners/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PantryOwner pantryOwner = db.PantryOwners.Find(id);
            if (pantryOwner == null)
            {
                return HttpNotFound();
            }
            ViewBag.AddressID = new SelectList(db.Addresses, "Id", "StreetAddress", pantryOwner.AddressID);
            return View(pantryOwner);
        }

        // POST: PantryOwners/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FirstName,LastName,DOB,AddressID")] PantryOwner pantryOwner)
        {
            if (ModelState.IsValid)
            {
                db.Entry(pantryOwner).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.AddressID = new SelectList(db.Addresses, "Id", "StreetAddress", pantryOwner.AddressID);
            return View(pantryOwner);
        }

        // GET: PantryOwners/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            PantryOwner pantryOwner = db.PantryOwners.Find(id);
            if (pantryOwner == null)
            {
                return HttpNotFound();
            }
            return View(pantryOwner);
        }

        // POST: PantryOwners/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            PantryOwner pantryOwner = db.PantryOwners.Find(id);
            db.PantryOwners.Remove(pantryOwner);
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
