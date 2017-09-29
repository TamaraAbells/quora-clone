class Answer < ApplicationRecord

  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

    belongs_to :question,
      primary_key: :id,
      foreign_key: :question_id,
      class_name: :Question

    has_many :topics,
      through: :question,
      source: :topics

  acts_as_votable
  acts_as_commentable

  def upvoter_ids
    #add a number of nil values to inflate upvote number and simulate more realistic lookup times
    get_likes.reject{|v| v.vote_scope}.map{|v| v.voter_id} + Array.new(self.num_initial_upvotes)
  end

  def commentIds
    self.comment_threads.map{|comment| comment.id}
  end

  def num_comments
    self.comment_threads.count
  end

  def num_upvotes
    get_likes.reject{|v| v.vote_scope}.count
  end

    #code for time posted ago from github.com/katrinalui
    include ActionView::Helpers::DateHelper

    def time_posted_ago
      time_ago_in_words(created_at) + " ago"
    end

    def post_day
      created_at.strftime("%B %d, %Y")
    end
end
