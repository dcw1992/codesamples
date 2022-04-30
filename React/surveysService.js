import axios from 'axios';
import './serviceHelpers';
import logger from 'sabio-debug';
import { API_HOST_PREFIX } from './serviceHelpers';
const _logger = logger.extend('axios');

const endpoint = `${API_HOST_PREFIX}/api/surveys`;

const getSurveyById = (id) => {
    _logger('getSurveyById', id);
    const config = {
        method: 'GET',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const getSurveyByIdDetails = (id) => {
    _logger('getSurveyByIdDetails', id);
    const config = {
        method: 'GET',
        url: `${endpoint}/details/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const getSurveysAll = (pageIndex, pageSize) => {
    _logger('getSurveyAll');
    const config = {
        method: 'GET',
        url: `${endpoint}/?pageIndex=${pageIndex}&&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getSurveysByCurrent = (pageIndex, pageSize) => {
    _logger('getSurveysByCurrent');
    const config = {
        method: 'GET',
        url: `${endpoint}/current/?pageIndex=${pageIndex}&&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const searchSurvey = (pageIndex, pageSize, query) => {
    _logger('searchSurvey', query);
    const config = {
        method: 'GET',
        url: `${endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const addSurvey = (payload) => {
    _logger('addSurvey', payload);
    const config = {
        method: 'POST',
        url: `${endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const updateSurvey = (id, payload) => {
    _logger('updateSurvey', payload);
    const config = {
        method: 'PUT',
        url: `${endpoint}/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};



export { getSurveyById, getSurveyByIdDetails, getSurveysByCurrent, getSurveysAll, searchSurvey, addSurvey, updateSurvey };
