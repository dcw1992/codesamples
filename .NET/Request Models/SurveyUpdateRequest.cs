using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveyUpdateRequest : SurveyAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}