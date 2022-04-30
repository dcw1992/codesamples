using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveyAddRequest
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MinLength(2), MaxLength(2000)]
        public string Description { get; set; }     
        [Required]
        public int SurveyTypeId { get; set; }
        [Required]
        public bool IsRandom { get; set; }

    }
}