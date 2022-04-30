using System;
using System.Collections.Generic;


namespace Sabio.Models.Domain
{
    public class BaseSurvey
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LookUp Status { get; set; }
        public LookUp SurveyType { get; set; }
        public int CreatedBy { get; set; }
        public bool IsRandom { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
    public class Survey : BaseSurvey
    {
        public List<SurveyQuestion> Questions { get; set; }

    }

}