namespace ProjectNasaAPI
{
    public interface IRecommendedPhoto
    {
        int Id { get; set; }
        string Rover { get; set; }
        string Date { get; set; }
        string Url { get; set; }
        string Description { get; set; }
    }
}
