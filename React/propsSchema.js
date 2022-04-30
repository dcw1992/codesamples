import PropTypes from 'prop-types'

const surveyProps = {

    survey: PropTypes.shape({id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdBy: PropTypes.number.isRequired,
    surveyType: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }).isRequired,
    status: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }).isRequired,
    isRandom: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        surveyId: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        helpText: PropTypes.string,
        isRequired: PropTypes.bool.isRequired,
        isMultipleRequired: PropTypes.bool.isRequired,
        status: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }).isRequired,
        type: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }).isRequired,
        answerOptions: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            questionId: PropTypes.number.isRequired,
            text: PropTypes.string,
            value: PropTypes.string,
            additionalInfo: PropTypes.string,
            createdBy: PropTypes.number.isRequired,
            sortOrder: PropTypes.number,
        })),
        sortOrder: PropTypes.number.isRequired,
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
    })),
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,}
    ).isRequired
       
};

export {surveyProps};