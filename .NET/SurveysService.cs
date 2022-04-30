using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Surveys;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class SurveysService : ISurveysService
    {
        private IDataProvider _dataProvider;
        private ILookUpService _lookUpService;
        public SurveysService(IDataProvider dataProvider, ILookUpService lookUpService)
        {
            _dataProvider = dataProvider;
            _lookUpService = lookUpService;
        }
        public Survey GetByIdDetails(int id)
        {
            string storedProc = "[dbo].[Surveys_SelectById_Details]";
            Survey survey = null;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                survey = MapBaseSurvey(reader, ref startingIndex);
                survey.Questions = MapSurveyQuestions(reader, ref startingIndex);
            }, returnParameters: null);
            return survey;

        }
        public BaseSurvey GetById(int id)
        {
            string storedProc = "[dbo].[Surveys_Select_ById]";
            BaseSurvey survey = null;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                survey = MapBaseSurvey(reader, ref startingIndex);
            }, returnParameters: null);
            return survey;

        }
        public Paged<BaseSurvey> GetByUser(int pageIndex, int pageSize, int userId)
        {
            string storedProc = "[dbo].[Surveys_Select_ByCreatedBy]";
            Paged<BaseSurvey> pagedList = null;
            List<BaseSurvey> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@pageIndex", pageIndex);
                col.AddWithValue("@pageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                BaseSurvey survey = MapBaseSurvey(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<BaseSurvey>();
                }
                list.Add(survey);
            }, returnParameters: null);

            if (list != null)
            {
                pagedList = new Paged<BaseSurvey>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        public Paged<BaseSurvey> GetAll(int pageIndex, int pageSize)
        {
            string storedProc = "[dbo].[Surveys_SelectAll]";
            Paged<BaseSurvey> pagedList = null;
            List<BaseSurvey> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@pageIndex", pageIndex);
                col.AddWithValue("@pageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                BaseSurvey survey = MapBaseSurvey(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<BaseSurvey>();
                }
                list.Add(survey);
            }, returnParameters: null);

            if (list != null)
            {
                pagedList = new Paged<BaseSurvey>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        public Paged<Survey> Search(int pageIndex, int pageSize, string query)
        {
            string storedProc = "[dbo].[Surveys_Search]";
            Paged<Survey> pagedList = null;
            List<Survey> list = null;

            int totalCount = 0;

            _dataProvider.ExecuteCmd(storedProc, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@pageIndex", pageIndex);
                col.AddWithValue("@pageSize", pageSize);
                col.AddWithValue("@Query", query);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Survey survey = MapBaseSurvey(reader, ref startingIndex);
                survey.Questions = MapSurveyQuestions(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<Survey>();
                }
                list.Add(survey);
            }, returnParameters: null);

            if (list != null)
            {
                pagedList = new Paged<Survey>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        public int Add(SurveyAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Surveys_Insert]";

            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                MapSurveyParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });
            return id;

        }
        public void Update(SurveyUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Surveys_Update]";
            _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                MapSurveyParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            }, returnParameters: null);
        }
        private static void MapSurveyParams(SurveyAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@SurveyTypeId", model.SurveyTypeId);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@IsRandom", model.IsRandom);
        }
        private Survey MapBaseSurvey(IDataReader reader, ref int startingIndex)
        {
            Survey survey = new Survey();
            survey.Id = reader.GetSafeInt32(startingIndex++);
            survey.Name = reader.GetSafeString(startingIndex++);
            survey.Description = reader.GetSafeString(startingIndex++);
            survey.Status = _lookUpService.MapLookUp(reader, ref startingIndex);
            survey.SurveyType = _lookUpService.MapLookUp(reader, ref startingIndex);
            survey.CreatedBy = reader.GetSafeInt32(startingIndex++);
            survey.IsRandom = reader.GetSafeBool(startingIndex++);
            survey.DateCreated = reader.GetSafeDateTime(startingIndex++);
            survey.DateModified = reader.GetSafeDateTime(startingIndex++);
            return survey;
        }
        private static List<SurveyQuestion> MapSurveyQuestions(IDataReader reader, ref int startingIndex)
        {
            List<SurveyQuestion> surveyQuestions = new List<SurveyQuestion>();
            surveyQuestions = reader.DeserializeObject<List<SurveyQuestion>>(startingIndex++);
            return surveyQuestions;
        }
    }
}
