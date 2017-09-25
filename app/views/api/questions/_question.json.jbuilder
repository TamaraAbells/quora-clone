json.extract! question, :id, :body

json.author do
  json.partial! 'api/users/user', user: question.author
end

json.time_posted_ago question.time_posted_ago

json.answer_ids question.answers.map{|answer| answer.id}

json.topic question.topics.first

json.num_answers question.num_answers_str
keywords ||= []

json.match_score question.match_score(keywords)

json.follower_ids question.follower_ids
json.upvoter_ids question.upvoter_ids
