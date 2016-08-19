using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AspNetTokenAuth_API.Models;

namespace AspNetTokenAuth_API.Controllers
{
    [Authorize]
    public class CustomerOrdersController : ApiController
    {
        private Demo_DBEntities db = new Demo_DBEntities();

        // GET: api/CustomerOrders
        public IQueryable<CustomerOrder> GetCustomerOrders()
        {
            return db.CustomerOrders;
        }

        // GET: api/CustomerOrders/5
        [ResponseType(typeof(CustomerOrder))]
        public IHttpActionResult GetCustomerOrder(int id)
        {
            CustomerOrder customerOrder = db.CustomerOrders.Find(id);
            if (customerOrder == null)
            {
                return NotFound();
            }

            return Ok(customerOrder);
        }

        // PUT: api/CustomerOrders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomerOrder(int id, CustomerOrder customerOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerOrder.Id)
            {
                return BadRequest();
            }

            db.Entry(customerOrder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CustomerOrders
        [ResponseType(typeof(CustomerOrder))]
        public IHttpActionResult PostCustomerOrder(CustomerOrder customerOrder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomerOrders.Add(customerOrder);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customerOrder.Id }, customerOrder);
        }

        // DELETE: api/CustomerOrders/5
        [ResponseType(typeof(CustomerOrder))]
        public IHttpActionResult DeleteCustomerOrder(int id)
        {
            CustomerOrder customerOrder = db.CustomerOrders.Find(id);
            if (customerOrder == null)
            {
                return NotFound();
            }

            db.CustomerOrders.Remove(customerOrder);
            db.SaveChanges();

            return Ok(customerOrder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerOrderExists(int id)
        {
            return db.CustomerOrders.Count(e => e.Id == id) > 0;
        }
    }
}