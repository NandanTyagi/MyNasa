using System.Collections.Generic;
using System.Linq;

namespace ProjectNasaAPI
{
    public class MockRoverRepo : IRoverRepo
    {
        public IEnumerable<Rover> Rovers => new List<Rover>()
        {
            new Rover{Id = 1, Name = "Opportunity"},
            new Rover{Id = 2, Name = "Spirit"},
            new Rover{Id = 3, Name = "Curiosity"},
            new Rover{Id = 4, Name = "MyRover"}
        };

        // IEnumerable<Rover> IRoverRepo.AllRovers => throw new System.NotImplementedException();

        public Rover GetRover(string name)
        {
            return Rovers.FirstOrDefault(r => r.Name == name);
        }

    }
}
