import React from 'react';
import {Link} from 'react-router-dom';

class QuestionListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { question } = this.props;

    if (Object.keys(question).length === 0) {
      console.log("loading");
      return (
        <h1>Loading!</h1>
      );
    } else {
      const { body, time_posted_ago, topic } = question

      return (
        <li className="question-list-item">
          <h3>Question asked · {topic.name}</h3>
          <Link to={`/questions/${question.id}`} activeClassName="active">{body}</Link>

          <h3>Last asked {time_posted_ago}</h3>
        </li>
      );
    }
  }
}

export default QuestionListItem;
