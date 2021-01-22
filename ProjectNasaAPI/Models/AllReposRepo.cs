using System;

namespace ProjectNasaAPI
{
    public class MockAllReposRepo
    {
        MockDateRepo _dateRepo = new MockDateRepo();
        MockRoverRepo _roverRepo = new MockRoverRepo();
        MockPhotoRepo photoRepo = new MockPhotoRepo();

        public Object[] AllRepos = new Object[3];
        public MockAllReposRepo()
        {
            AllRepos[0] = _roverRepo;
            AllRepos[1] = photoRepo;
            AllRepos[2] = _dateRepo;
        }
    }
}
