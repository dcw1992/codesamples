import React, { useState, useEffect } from 'react';
import { Card, Tab, Nav, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import QuestionSideBar from './QuestionSideBar';
import SurveySummary from './SurveySummary';
import logger from 'sabio-debug';
import { getSurveyByIdDetails } from '../../../services/surveysService';
import SurveyPageTitle from './SurveyPageTitle';

const _logger = logger.extend('SurveyBuilder');

const SurveyBuilder = () => {
    const [survey, setSurvey] = useState({
        id: 0,
        name: '',
        description: '',
        status: {},
        surveyType: {},
        createdBy: 0,
        isRandom: false,
        questions: [],
        dateCreated: '',
        dateModified: '',
    });

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        _logger('useEffect', params);
        if (params?.id) {
            getSurveyByIdDetails(params.id).then(onGetSurveySuccess).catch(onGetSurveyError);
        } else {
            navigate('/error-404');
        }
    }, []);

    const onGetSurveySuccess = (response) => {
        _logger('onGetSurveySuccess', response);
        setSurvey((prevState) => ({ ...prevState, ...response.data.item }));
    };

    const onGetSurveyError = (err) => {
        _logger('onGetSurveyError', err);
        navigate('/error-404');
    };

    const tabContents = [
        {
            id: '1',
            title: 'Summary',
            component: <SurveySummary survey={survey} />,
        },
        {
            id: '2',
            title: 'Design Survey',
            component: <QuestionSideBar questions={survey?.questions} />,
        },
        {
            id: '3',
            title: 'Collect Responses',
            component: 'Responses placeholder.',
        },
        {
            id: '4',
            title: 'Analyze Results',
            component: 'Analytics placeholder.',
        },
    ];

    return (
        <React.Fragment>
            <SurveyPageTitle
                breadCrumbItems={[
                    { label: 'Survey', path: `/surveys/${survey.id}` },
                    { label: 'Design', path: `/surveys/design/${survey.id}`, active: true },
                ]}
            />

            <Card>
                <Card.Body>
                    <Tab.Container defaultActiveKey="Summary">
                        <Row>
                            <Col>
                                <Nav variant="tabs" className="nav-bordered" as="ul">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index} as="li">
                                                <Nav.Link as={Link} to="#" eventKey={tab.title}>
                                                    <span className="d-none d-md-block">{tab.title}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>
                            </Col>
                            <Col xs={1}>
                                <Button type="button" className="btn-primary">
                                    Preview
                                </Button>
                            </Col>
                        </Row>

                        <Tab.Content>
                            {tabContents.map((tab, index) => {
                                return (
                                    <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                                        <div className="mt-3">{tab.component}</div>
                                    </Tab.Pane>
                                );
                            })}
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default SurveyBuilder;
