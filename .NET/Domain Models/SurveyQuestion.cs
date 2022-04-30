using System;
using System.Collections.Generic;


namespace Sabio.Models.Domain
{
    public class SurveyQuestion
    {
        public int Id { get; set; }
        public int SurveyId { get; set; }
        public int UserId { get; set; }
        public string Question { get; set; }
        public string HelpText { get; set; }
        public bool IsRequired { get; set; }
        public bool IsMultipleRequired { get; set; }
        public LookUp Status { get; set; }
        public LookUp Type { get; set; }
        public List<SurveyQAO> AnswerOptions { get; set; }
        public int SortOrder { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}