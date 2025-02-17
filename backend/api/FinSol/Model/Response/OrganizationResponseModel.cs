﻿namespace FinSol.Model.Response
{
    public class OrganizationResponseModel : BaseModel
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? Industry { get; set; }
        public string? LegalStatus { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
