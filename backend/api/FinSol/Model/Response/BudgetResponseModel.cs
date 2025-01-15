namespace FinSol.Model.Response
{
    public class BudgetResponseModel:BaseModel
    {
        public string Title { get; set; }
        public DateTime EffectiveFrom { get; set; }
        public Guid PositionId { get; set; }
        public double MinPay { get; set; }
        public double AnnualIncreament { get; set; }
        public double MaxPay { get; set; }
        public int Stages { get; set; }
        public int Provisions { get; set; }
        public Guid BudgetId { get; set; }
        public string Position { get; set; }
    }
}
