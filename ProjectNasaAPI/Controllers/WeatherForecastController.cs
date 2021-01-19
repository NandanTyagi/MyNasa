using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ProjectNasaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyApiController : ControllerBase
    {
        
        [HttpGet]
        public IEnumerable<RecommendedPhoto> GetPhotos()
        {
            MockPhotoRepo mockPhotoRepo = new MockPhotoRepo();

            return mockPhotoRepo.Photos;

        }
    }
}
