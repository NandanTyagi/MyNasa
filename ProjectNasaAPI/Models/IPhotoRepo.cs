using System.Collections;
using System.Collections.Generic;

namespace ProjectNasaAPI
{
    public interface IPhotoRepo
    {
        IEnumerable<RecommendedPhoto> Photos { get; set; }

    }
}
