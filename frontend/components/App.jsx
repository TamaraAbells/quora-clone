import React from 'react';
import { Provider } from 'react-redux';
import { Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';

import SessionFormContainer from './session_form/session_form_container';
import TopicListContainer from './topic_list/topic_list_container';
import CreateQuestionFormContainer from './create_question_form/create_question_form_container';
import NavBarContainer from './nav_bar/nav_bar_container';
import FeedSidebarContainer from './feed_sidebar/feed_sidebar_container';
import TopicDetailContainer from './topic_detail/topic_detail_container';
import QuestionDetailContainer from './question_detail/question_detail_container';
import QuestionListContainer from './question_list/question_list_container';
import AnswerDetailContainer from './answer_detail/answer_detail_container';


const App = () => (
  <div>
    <Route path="/login" component={SessionFormContainer} />
    <Route path="/signup" component={SessionFormContainer} />
    <NavBarContainer />
    <div id="main-page">
      <div className="sidebar">
        <Route exact path="/" component={FeedSidebarContainer} />
        <Route exact path="/questions" component={FeedSidebarContainer} />
      </div>
      <Switch>
        <div className="main-col">
          <Route exact path="/" component={CreateQuestionFormContainer} />
          <Route exact path="/" component={TopicListContainer} />
          <Route path="/topics/:topicId" component={TopicDetailContainer} />
          <Route path="/questions/:questionId" component={QuestionDetailContainer} />
          <Route path="/answers/:answerId" component={AnswerDetailContainer} />
          <Route exact path="/questions" component={QuestionListContainer} />

        </div>

      </Switch>
    </div>
  </div>
);

export default App;
