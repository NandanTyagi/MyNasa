using System.Collections.Generic;
using System.Linq;

namespace ProjectNasaAPI
{

    public partial class MockDateRepo
    {
        MockRoverRepo roverRepo = new MockRoverRepo();
        public IEnumerable<RecomendedDate> RecommendedDates => new List<RecomendedDate>
        {
            new RecomendedDate{Id = 1, Rover = roverRepo.GetRover("Curiosity"), Date = "2021-01-18", Description = "Har fanns det bilder på Curiositys skadade däck, men nasa har ersatt dem med dessa bilder?"}
        };

        public IEnumerable<RecomendedDate> GetDateById(int id)
        {
            return RecommendedDates.Where(d => d.Id == id);
        }
    }

}
