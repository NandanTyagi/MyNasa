namespace ProjectNasaAPI
{
    public interface IRecomendedDate
    {
        int Id { get; }
        string Rover { get; set; }
        string Date { get; set; }
        string Description { get; set; }
    }
}
