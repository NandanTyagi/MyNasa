﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProjectNasaAPI;

namespace ProjectNasaAPI.Controllers
{
    [ApiController]
    // [Route("myapi/v1")]
    [Route("[controller]/v1")]
    public class MyApiController : ControllerBase
    {

        [HttpGet("[action]")]
        // [Route("[action]")]
        public IActionResult Photos()
        {

            MockPhotoRepo mockPhotoRepo = new MockPhotoRepo();

            return Ok(mockPhotoRepo.Photos);

        }
        [HttpGet("[action]")]
        // [Route("[action]")]
        public IActionResult Fact()
        {

            MockDateRepo mockDateRepo = new MockDateRepo();

            return Ok(mockDateRepo.AllDates);

        }

        [HttpGet("[action]/{rover}")]
        public ActionResult<RecommendedPhoto> Photos(string rover)
        {
            try
            {
                MockPhotoRepo mockPhotoRepo = new MockPhotoRepo();

                // Returns ArgumentOutOfRangeException if empty
                if (String.IsNullOrEmpty(mockPhotoRepo.GetPhoto(rover).ToList()[0].ToString()))
                {
                    
                }
                return Ok(mockPhotoRepo.GetPhoto(rover));
            }
            catch (ArgumentOutOfRangeException)
            {
                // return Redirect("http://www.dn.se");
                return this.StatusCode(StatusCodes.Status406NotAcceptable, "Ogiltig namn på forskningsfordon... Kontrollera stavning och skriftläge! ");
            }

        }

       
    }
}
