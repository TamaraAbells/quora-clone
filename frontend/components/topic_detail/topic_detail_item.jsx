import React from 'react';

import QuestionItemContainer from '../question/question_item_container';
import FollowTopicButtonContainer from '../follow_topic_button/follow_topic_button_container'

class TopicDetailItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const { topic } = this.props;
    const { id, name, description, num_followers, question_ids, follower_ids, followed} = topic;

    let questionItems = question_ids.map(id => (
      <QuestionItemContainer
        key={ "question-" + id }
        id={ id }
        />
      )
    );

    if(questionItems.length === 0) {
      questionItems = [<div className="no-topic-questions">No questions have been written for this topic yet </div>];
    }



    return (
      <div className="topic-detail-item">
        <div className="topic-header">
          <h1>{name}</h1>
          <h2>{description}</h2>

          <FollowTopicButtonContainer id={id} followerIds={follower_ids} followed={followed}/>
          </div>

        <ul className="question-list">{questionItems}</ul>
      </div>
    );

  }
}

export default TopicDetailItem;
