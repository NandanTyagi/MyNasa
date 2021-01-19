using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public interface IDateRepo
    {
        IEnumerable<RecomendedDate> AllDates { get; }
    }

}
