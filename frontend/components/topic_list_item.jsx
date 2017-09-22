import React from 'react';

import QuestionItem from './question_item'

class TopicListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { topic } = this.props;
    const { name, description, num_followers, questions} = topic;
    const questionItems = questions.map(question => (
      <QuestionItem
        key={ "question-" + question.id }
        question={ question }
        />
      )
    );

    return (
      <li className="topic-list-item">
        <h2>{name}</h2>
        <ul>{questionItems}</ul>
      </li>
    );
  }
}

export default TopicListItem;
