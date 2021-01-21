using System.Collections.Generic;
using System.Linq;

namespace ProjectNasaAPI
{

    public partial class MockDateRepo
    {
        MockRoverRepo roverRepo = new MockRoverRepo();
        public IEnumerable<RecomendedDate> RecommendedDates => new List<RecomendedDate>
        {
            new RecomendedDate{Id = 1, Rover = roverRepo.GetRover("Curiosity"), Date = "2021-01-13", Description = "Här är lite coola bilder!"}
        };

        public IEnumerable<RecomendedDate> GetDateById(int id)
        {
            return RecommendedDates.Where(d => d.Id == id);
        }
    }

}
