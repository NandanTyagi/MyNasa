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
    public interface IAllReposRepo
    {
        IEnumerable<Object> AllRepos { get; set; }
    }
}
