using System.Collections.Generic;
using System.Linq;

namespace ProjectNasaAPI
{

    public class MockDateRepo : IDateRepo
    {
        public IEnumerable<RecomendedDate> AllDates => new List<RecomendedDate>
        {
            new RecomendedDate{Id = 1, Rover = "Curiosity", Date = "2021-01-18", Description = "Curiosity har fått problem med ett av sina däck nyligen! Hur ska NASA lösa detta?"}
        };

        public IEnumerable<RecomendedDate> GetDateById(int id)
        {
            return AllDates.Where(d => d.Id == id);
        }
    }

}
