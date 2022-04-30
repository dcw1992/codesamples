using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Surveys;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveys")]
    [ApiController]
    public class SurveyApiController : BaseApiController
    {
        private ISurveysService _service;
        private IAuthenticationService<int> _authService;
        public SurveyApiController(ISurveysService service, IAuthenticationService<int> authService, ILogger<SurveyApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(SurveyAddRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            ObjectResult result;
            try
            {
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(SurveyUpdateRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            BaseResponse response;
            int code = 200;
            try
            {
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpGet]
        public ActionResult<ItemResponse<Paged<BaseSurvey>>> GetPaged(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<BaseSurvey> paged = _service.GetAll(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurvey>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("details/{id:int}")]
        public ActionResult<ItemResponse<Survey>> GetByIdDetails(int id)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Survey survey = _service.GetByIdDetails(id);
                if (survey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Survey> { Item = survey };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<BaseSurvey>> GetById(int id)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                BaseSurvey survey = _service.GetById(id);
                if (survey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<BaseSurvey> { Item = survey };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpGet]
        [Route("current")]
        public ActionResult<ItemResponse<Paged<BaseSurvey>>> GetByCurrent(int pageIndex, int pageSize)
        {
            int id = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<BaseSurvey> paged = _service.GetByUser(pageIndex, pageSize, id);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<BaseSurvey>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Survey>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response;
            try
            {
                Paged<Survey> paged = _service.Search(pageIndex, pageSize, query);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Survey>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}
