import React from 'react';
import {Link} from 'react-router-dom';


const QuestionSearchItem = ({ question, handleChange, updateFilter}) => {
  if (Object.keys(question).length === 0) {
    console.log("loading");
    return (
      <h1>Loading!</h1>
    );
  } else {
    const { body } = question;

    return (
      <li className="question-list-item">
        <Link to={`/questions/${question.id}`} activeClassName="active" onClick={()=>updateFilter("query", "")}>{body}</Link>
      </li>
    );
  }
};


export default QuestionSearchItem;
