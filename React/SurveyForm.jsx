import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import logger from "sabio-debug";
import {
  addSurvey,
  updateSurvey,
  getSurveyById,
} from "../../../services/surveysService";
import getLookUps from "../../../services/lookUpsService";
import { surveyValidationSchema } from "./schema";
import SurveyPageTitle from "../components/SurveyPageTitle";
const _logger = logger.extend("SurveyForm");

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    surveyTypeId: "",
    isRandom: false,
  });
  const [lookUps, setLookUps] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    getLookUps(["SurveyTypes"])
      .then(onGetLookUpsSuccess)
      .catch(onGetLookUpsError);

    if (location.state?.type === "EDIT") {
      _logger("useEffect location", location);
      setFormData(location.state.payload);
    } else if (params?.id) {
      getSurveyById(params.id).then(onGetSurveySuccess).catch(onGetSurveyError);
    }
  }, []);

  const onGetLookUpsSuccess = (response) => {
    _logger("onGetLookUpsSuccess", response);
    const mappedLookups = response.data.item.SurveyTypes.map(mapLookUps);
    setLookUps(mappedLookups);
  };
  const onGetLookUpsError = (err) => _logger("onGetLookUpsError", err);

  const mapLookUps = (lookup) => {
    _logger("mapLookUps", lookup);
    return (
      <option value={lookup.id} key={`Lookup ${lookup.id}`}>
        {lookup.name}
      </option>
    );
  };

  const onGetSurveySuccess = (response) => {
    _logger("onGetSurveySuccess", response);
    let paramsSurvey = response.data.item;
    let newFormData = {
      id: paramsSurvey.id,
      name: paramsSurvey.name,
      description: paramsSurvey.description,
      surveyTypeId: paramsSurvey.surveyType.id,
      isRandom: paramsSurvey.isRandom,
    };
    setFormData(newFormData);
  };

  const onGetSurveyError = (err) => {
    _logger("onGetSurveyError", err);
    navigate("/error-404");
  };

  const handleSubmit = (values) => {
    _logger("handleSubmit", values);
    let payload = values;
    payload.surveyTypeId = parseInt(payload.surveyTypeId);
    if (formData?.id) {
      updateSurvey(payload.id, payload)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      addSurvey(payload).then(onAddSurveySuccess).catch(onAddSurveyError);
    }
  };

  const onAddSurveySuccess = (response) => {
    _logger("onAddSurveySuccess", response);
    navigate(`/surveys/design/${response.data.item}`);
  };

  const onAddSurveyError = (err) => _logger("onAddSurveyError", err);

  const onUpdateSuccess = (response) => {
    _logger("onUpdateSuccess", response);
    navigate(`/surveys/design/${formData.id}`);
  };
  const onUpdateError = (err) => _logger("onUpdateError", err);

  return (
    <React.Fragment>
      <SurveyPageTitle
        breadCrumbItems={[
          {
            label: "Survey",
            path: "/surveys/new",
            active: true,
          },
        ]}
      />
      <div className="container">
        <Card>
          <Card.Body>
            <h4 className="mb-3 header-title">
              {formData?.id ? "Update Survey" : "Submit New Survey"}
            </h4>
            <Formik
              enableReinitialize={true}
              validationSchema={surveyValidationSchema}
              initialValues={formData}
              onSubmit={handleSubmit}
            >
              <Form>
                <Row className="align-items-center">
                  <Col className="form-group">
                    <label htmlFor="name" className="form-label">
                      Survey Name
                    </label>
                    <Field
                      className="form-control mb-2"
                      type="text"
                      name="name"
                      placeholder="Enter a name for the survey here. 100 characters maximum."
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      style={{ color: "Red" }}
                    />
                  </Col>
                  <Col className="form-group" xs={3}>
                    <label htmlFor="surveyTypeId" className="form-label">
                      Survey Type
                    </label>
                    <Field
                      className="form-control form-select mb-2"
                      component="select"
                      name="surveyTypeId"
                    >
                      <option value={""}>Select a survey type</option>
                      {lookUps}
                    </Field>
                    <ErrorMessage
                      name="surveyTypeId"
                      component="div"
                      style={{ color: "Red" }}
                    />
                  </Col>
                  <Col className="form-check pt-3" xs={"auto"}>
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      name="isRandom"
                    />
                    <label htmlFor="isRandom" className="form-label">
                      Random Question Order
                    </label>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <Col className="form-group">
                    <Field
                      className="form-control"
                      component="textarea"
                      name="description"
                      placeholder="Enter a description for the survey here. 2000 characters maximum."
                      rows="10"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      style={{ color: "Red" }}
                    />
                  </Col>
                </Row>

                <Row className="mb-0">
                  <Col className="form-group" sm={{ span: 6 }}>
                    <Button variant="primary" type="submit">
                      {formData?.id ? "Update" : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SurveyForm;
