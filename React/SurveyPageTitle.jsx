import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SurveyPageTitle = (props) => {
    return (
        <Row>
            <Col>
                <div className="page-title-box">
                    <div className="page-title-right">
                        <Breadcrumb listProps={{ className: 'm-0' }}>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

                            {props.breadCrumbItems.map((item, index) => {
                                return item.active ? (
                                    <Breadcrumb.Item active key={index}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                ) : (
                                    <Breadcrumb.Item key={index} href={item.path}>
                                        {item.label}
                                    </Breadcrumb.Item>
                                );
                            })}
                        </Breadcrumb>
                    </div>
                    <h4 className="page-title">Surveys</h4>
                </div>
            </Col>
        </Row>
    );
};

SurveyPageTitle.propTypes = {
    breadCrumbItems: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            active: PropTypes.bool,
        })
    ).isRequired,
};
export default SurveyPageTitle;
