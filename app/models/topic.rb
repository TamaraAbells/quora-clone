# == Schema Information
#
# Table name: topics
#
#  id          :integer          not null, primary key
#  name        :string           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Topic < ApplicationRecord
  has_many :topics_users,
    primary_key: :id,
    foreign_key: :topic_id,
    class_name: :TopicsUser

  has_many :subscribers,
    through: :topics_users,
    source: :user

  has_many :questions_topics,
    primary_key: :id,
    foreign_key: :topic_id,
    class_name: :QuestionsTopic

  has_many :questions,
    through: :questions_topics,
    source: :question

  has_many :answers,
    through: :questions,
    source: :answers

  has_many :contributers,
    through: :answers,
    source: :author

  acts_as_votable

  def follower_ids
    get_likes(:vote_scope => 'follow').map{|vote| vote.voter_id}
  end

  def num_followers
    get_likes(:vote_scope => 'follow').count
  end

  #code for time posted ago from github.com/katrinalui
  include ActionView::Helpers::DateHelper

  def time_posted_ago
    time_ago_in_words(created_at) + " ago"
  end

  def post_day
    created_at.strftime("%B %d, %Y")
  end

  def match_score(keywords)
    return 0 unless keywords
    question = self.name.downcase
    matching_keywords = keywords.reduce(0){|acc, keyword| question.include?(keyword) ? acc + 1 : acc}
    return matching_keywords/keywords.count.to_f
  end

end
