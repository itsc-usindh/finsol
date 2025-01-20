namespace FinSol.Model.Response
{
    public class PositionResponseModel:BaseModel
    {
        public string Title { get; set; }
        public int ReservedPositions { get; set; }
        public double MinPay { get; set; }
        public double MaxPay { get; set; }
        public double AnnualIncreament { get; set; }
    }
}
