using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public class MockPhotoRepo : IPhotoRepo
    {
        public IEnumerable<RecommendedPhoto> Photos => new List<RecommendedPhoto>
        {
            new RecommendedPhoto{Id = 1, Rover = "Curiosity", Date = "2021-01-18", Url = "https://mars.nasa.gov/msl-raw-images/msss/03005/mhli/3005MH0007700011100097E01_DXXX.jpg", Description = "Detta kan innebära problem!!" },
            new RecommendedPhoto{Id = 2, Rover = "Opportunity", Date = "2010-02-01" , Url = "http://mars.nasa.gov/mer/gallery/all/1/p/2141/1P318250636EFFAB66P2369L2M1-BR.JPG", Description = "Typisk Marsianskt landskap"},
            new RecommendedPhoto{Id = 3, Rover = "Spirit", Date = "2006-06-08", Url = "http://mars.nasa.gov/mer/gallery/all/2/p/863/2P202974618EFFAS00P2629L4M1-BR.JPG", Description = "En typisk kulle på Mars"},
            new RecommendedPhoto{Id = 4, Rover = "Opportunity", Date = "2016-03-25", Url = "http://mars.nasa.gov/mer/gallery/all/1/n/4325/1N512147216EFFCPJOP1977L0M1-BR.JPG" , Description = "Fin Marsiansk vy!"}
            
        };

        IEnumerable<RecommendedPhoto> IPhotoRepo.Photos { get => throw new System.NotImplementedException(); set => throw new System.NotImplementedException(); }
    }
}
