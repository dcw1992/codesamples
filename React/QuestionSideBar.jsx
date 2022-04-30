import React, { useState, useEffect } from "react";
import { Card, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import logger from "sabio-debug";
const _logger = logger.extend("QuestionSideBar");

const Question = ({ question }) => {
  //question components to be mapped
  return (
    <Card className="text-white mb-1 bg-primary text-center">
      <Card.Text>{question.question}</Card.Text>
    </Card>
  );
};

/**
 * Reorders the list
 * @param {*} list
 * @param {*} startIndex
 * @param {*} endIndex
 */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuestionSideBar = (props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    _logger("useEffect question props setting", props);
    setQuestions(props?.questions);
  }, [props]);

  /**
   * On drag ends
   * @param {3} result
   */
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const localItems = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(localItems);
  };
  if (props.questions) {
    return (
      <Col xs={2}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="d-flex flex-column col">
                  {questions.map((question, index) => (
                    <Draggable
                      key={question.id}
                      draggableId={question.question}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="me-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Question question={question} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Col>
    );
  } else {
    return null;
  }
};

Question.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
  }),
};

QuestionSideBar.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
    })
  ),
};

export default QuestionSideBar;
