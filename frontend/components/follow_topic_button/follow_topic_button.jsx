import React from 'react';


class FollowTopicButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      followed: false,
      disabled: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    if(this.props.followed) {
      this.setState({followed: true});
    }
  }

  handleSuccess(followed) {
    this.setState({followed: followed, disabled: false});
  }


  handleClick() {
    this.setState({disabled: true})
    if(this.state.followed) {
      this.props.unfollowTopic(this.props.id).then(()=>this.handleSuccess(false));
    } else {
      this.props.followTopic(this.props.id).then(()=>this.handleSuccess(true));
    }
  }


  render() {
    let followText = "Follow"
    if(this.state.followed) {
      followText = "Following Topic"
    }
    return(
      <div className="follow-topic-button">
        <button onClick={this.handleClick} disabled={this.state.disabled}>
          <div>{followText}</div>
          <div>{this.props.followerIds.length}</div>
        </button>

      </div>
    );
  }
}

export default FollowTopicButton;
