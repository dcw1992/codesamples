import { lazy } from 'react';
const SurveyForm = lazy(() => import('../pages/survey/forms/SurveyForm'));
const SurveyBuilder = lazy(() => import('../pages/survey/components/SurveyBuilder'));

const surveys = [
    {
        path: '/surveys/new',
        name: 'Surveys',
        exact: true,
        element: SurveyForm,
        roles: ['Admin', 'User'],
        isAnonymous: false,
        children:[
            {
                path: '/surveys/:id',
                name: 'Surveys',
                exact: true,
                element: SurveyForm,
                roles: ['Admin', 'User'],
                isAnonymous: false,
            }
        ]
    },
    {
        path: '/surveys/design/:id',
        name: 'Surveys',
        exact: true,
        element: SurveyBuilder,
        roles: ['Admin', 'User'],
        isAnonymous: false,
        
    },
]