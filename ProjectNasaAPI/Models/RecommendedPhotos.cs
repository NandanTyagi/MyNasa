using System;

namespace ProjectNasaAPI
{

    public class RecommendedPhoto : IRecommendedPhoto
    {
        public int Id { get; set; }
        public string Rover { get; set; }
        public string Date { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
    }
}
