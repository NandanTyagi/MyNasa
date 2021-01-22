using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ProjectNasaAPI.Controllers
{
    [ApiController]
    [Route("[controller]/v1")]
    public class MyApiController : ControllerBase
    {
        MockRoverRepo _mockRoverRepo = new MockRoverRepo();
        MockDateRepo _mockDateRepo = new MockDateRepo();


        [HttpGet("[action]")]
        public IActionResult Photos()
        {
            MockPhotoRepo mockPhotoRepo = new MockPhotoRepo();
            return Ok(mockPhotoRepo.RecommendedPhotos);
        }
       
        [HttpGet("[action]/{rover}")]
        public ActionResult<RecommendedPhoto> Photos(string rover)
        {
            try
            {
                MockPhotoRepo mockPhotoRepo = new MockPhotoRepo();
                // Returns ArgumentOutOfRangeException if empty
                if (String.IsNullOrEmpty(mockPhotoRepo.GetPhoto(rover).ToList()[0].ToString())) { }
                
                return Ok(mockPhotoRepo.GetPhoto(rover));
            }
            catch (ArgumentOutOfRangeException)
            {
                return this.StatusCode(StatusCodes.Status406NotAcceptable, "Ogiltig namn på forskningsfordon... Kontrollera stavning och skriftläge! ");
            }
        }

        [HttpGet("[action]")]
        public IActionResult Fact()
        {
            return Ok(_mockDateRepo.RecommendedDates);
        }   
        [HttpGet("[action]")]
        public IActionResult Rovers()
        {
            // MockRoverRepo mockRoverRepo = new MockRoverRepo();
            return Ok(_mockRoverRepo.Rovers);
        }   
        [HttpGet("[action]")]
        public IActionResult All()
        {
            MockAllReposRepo mockAllReposRepo = new MockAllReposRepo();
            return Ok(mockAllReposRepo.AllRepos);
        }   
    }
}
