using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Surveys;

namespace Sabio.Services
{
    public interface ISurveysService
    {
        int Add(SurveyAddRequest model, int userId);
        Paged<BaseSurvey> GetAll(int pageIndex, int pageSize);
        Survey GetByIdDetails(int id);
        BaseSurvey GetById(int id);
        Paged<BaseSurvey> GetByUser(int pageIndex, int pageSize, int userId);
        Paged<Survey> Search(int pageIndex, int pageSize, string query);
        void Update(SurveyUpdateRequest model, int userId);

    }
}