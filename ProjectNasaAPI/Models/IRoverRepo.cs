using System.Collections;
using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public interface IRoverRepo
    {
        IEnumerable<Rover> Rovers { get; }
    }
}
