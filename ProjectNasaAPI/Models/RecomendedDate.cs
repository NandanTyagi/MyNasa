namespace ProjectNasaAPI
{
    public class RecomendedDate : IRecomendedDate
    {
        public int Id { get; set; }
        public Rover Rover {get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
    }
}
