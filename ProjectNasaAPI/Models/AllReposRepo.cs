using System;
using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public class MockAllReposRepo
    {
        MockRoverRepo roverRepo = new MockRoverRepo();
        MockPhotoRepo photoRepo = new MockPhotoRepo();
        MockDateRepo dateRepo = new MockDateRepo();
        public Object[] AllRepos = new Object[3];
        public MockAllReposRepo()
        {
            AllRepos[0] = roverRepo;
            AllRepos[1] = photoRepo;
            AllRepos[2] = dateRepo;
        }
    }
}
