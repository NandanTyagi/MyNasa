using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public interface IDateRepo
    {
        IEnumerable<RecomendedDate> RecommendedDates { get; }
    }

}
