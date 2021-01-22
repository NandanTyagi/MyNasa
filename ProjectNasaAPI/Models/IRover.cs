using System;
using System.Collections;
using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public interface IRover
    {
        int Id { get; }
        string Name { get; set; }
    }
}
