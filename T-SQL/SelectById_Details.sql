USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Surveys_SelectById_Details]    Script Date: 4/30/2022 12:27:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		David Wiltrout
-- Create date: 4/15/2022
-- Description:	This stored procedure selects a Survey by its Id with its Questions and Answer Options
-- Code Reviewer: Roel Foronda


-- MODIFIED BY: David Wiltrout
-- MODIFIED DATE: 4/22/2022
-- Code Reviewer: Roel Foronda
-- Note: 
-- =============================================


ALTER PROC [dbo].[Surveys_SelectById_Details]
									@Id int

AS

/*------------------------- Test Code -------------------------------

		DECLARE @Id int = 110

		EXECUTE [dbo].[Surveys_SelectById_Details]
										@Id
						
*/-------------------------------------------------------------------


BEGIN

				SELECT s.[Id]
					  ,s.[Name]
					  ,s.[Description]
					  ,stt.[Id]
					  ,stt.[Name]
					  ,sut.[Id]
					  ,sut.[Name]
					  ,s.[CreatedBy]
					  ,s.[IsRandom]
					  ,s.[DateCreated]
					  ,s.[DateModified]
					  ,Questions = (
					  
									   SELECT q.[Id] as id
											 ,q.[SurveyId] as surveyId
											 ,q.[UserId] as userId
											 ,q.Question as question
											 ,q.HelpText as helpText
											 ,q.IsRequired as isRequired
											 ,q.IsMultipleRequired as isMultipleRequired
											 ,qs.[Id] as 'status.id'
											 ,qs.[Name] as 'status.name'
											 ,qt.[Id] as 'type.id'
											 ,qt.[Name] as 'type.name'													  													  											 											
											 ,answerOptions = (
																		SELECT	 sqao.Id as id
																				,sqao.QuestionId as questionId
																				,sqao.[Text] as [text]
																				,sqao.AdditionalInfo as additionalInfo
																				,sqao.CreatedBy as createdBy
																				,sqao.SortOrder as sortOrder
											 										 
																		FROM dbo.SurveyQuestionAnswerOptions as sqao
																		WHERE sqao.QuestionId = q.Id 
																		FOR JSON AUTO
											                   )
											 ,q.SortOrder as sortOrder
											 ,q.DateCreated as dateCreated
											 ,q.DateModified as dateModified
											 

											 FROM dbo.SurveyQuestions as q inner join dbo.StatusType as qs
																			on q.StatusId = qs.Id
																			inner join dbo.QuestionTypes as qt
																			on q.QuestionTypeId = qt.Id
											 WHERE q.SurveyId = s.Id 
											 ORDER BY SortOrder
											 FOR JSON PATH
											 )
											 
				  FROM [dbo].[Surveys] as s inner join dbo.StatusType as stt
														on s.StatusId = stt.Id
											inner join dbo.SurveyTypes as sut
														on s.SurveyTypeId = sut.Id
																									
				  WHERE s.[Id] = @Id



END


