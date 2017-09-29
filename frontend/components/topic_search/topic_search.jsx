import React from 'react';


import TopicSearchInput from './topic_search_input';
import TopicSearchItem from './topic_search_item';


class TopicSearch extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    const {topics, topicQuery, updateFilter, closeSearch} = this.props
    let TopicItems = topics.map(topic => (
      <TopicSearchItem topic={topic} updateFilter={updateFilter} closeSearch={closeSearch} />
    ));


    return (
      <ul className="topic-search">
        <li className= "topic-input-container"><TopicSearchInput
          className="search-input"
          topicQuery={topicQuery}
          updateFilter={updateFilter}
        /></li>

        <ul className="topic-search-list">
           {TopicItems}
        </ul>

      </ul>
    );

  }
}


export default TopicSearch;
