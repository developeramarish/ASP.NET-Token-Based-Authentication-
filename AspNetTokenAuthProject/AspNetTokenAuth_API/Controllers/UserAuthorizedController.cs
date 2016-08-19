using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AspNetTokenAuth_API.Controllers
{
    [Authorize]
    public class UserAuthorizedController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Validate()
        {
            return Ok();
        }
    }
}
