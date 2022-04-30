import React from 'react';
import { useNavigate } from 'react-router-dom';
import logger from 'sabio-debug';
import { Row, Col } from 'react-bootstrap';
import { surveyProps } from '../propsSchema';

const _logger = logger.extend('SurveySummary');

const SurveySummary = (props) => {
    _logger('Props', props);
    const navigate = useNavigate();

    const onUpdateClick = () => {
        let payload = {
            id: props.survey.id,
            name: props.survey.name,
            description: props.survey.description,
            surveyTypeId: props.survey.surveyType.id,
            isRandom: props.survey.isRandom,
        };
        let transport = { type: 'EDIT', payload: payload };
        navigate(`/surveys/${payload.id}`, { state: transport });
    };

    const options = { month: 'long', year: 'numeric', day: 'numeric' };
    return (
        <Row>
            <Col>
                <h4 className="header-title mt-0 mb-3">
                    {props.survey.name}
                    <span className="px-1">
                        <a onClick={onUpdateClick} className="action-icon ">
                            <i className="mdi mdi-playlist-edit "></i>
                        </a>
                    </span>
                </h4>
                <p className="text-muted">
                    <strong>Description :</strong>
                    <span className="ms-2">{props.survey.description}</span>
                </p>
                <hr />
                <div className="text-start">
                    <p className="text-muted d-inline">
                        <strong>Author :</strong> <span className="ms-2">{`User ${props.survey.createdBy}`}</span>
                    </p>

                    <p className="text-muted d-inline mx-3">
                        <strong>Survey Type :</strong> <span className="ms-2">{props.survey.surveyType.name}</span>
                    </p>

                    <p className="text-muted d-inline mx-3">
                        <strong>Date Created :</strong>
                        <span className="ms-2">{new Date(props.survey.dateCreated).toLocaleDateString(options)}</span>
                    </p>

                    <p className="text-muted d-inline mx-3">
                        <strong>Last Modified :</strong>
                        <span className="ms-2">{new Date(props.survey.dateModified).toLocaleDateString(options)}</span>
                    </p>
                </div>
            </Col>
        </Row>
    );
};

SurveySummary.propTypes = surveyProps;

export default SurveySummary;
