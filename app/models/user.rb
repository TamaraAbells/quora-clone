# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  provider               :string
#  uid                    :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable
  # devise :rememberable
  devise :omniauthable, :omniauth_providers => [:facebook]
  devise :confirmable
  # validates :username, :firstname, :lastname, :email, :pro_pic_url, :password_digest, :session_token, presence: true
  # validates :username, :email, :session_token, uniqueness: true
  # validates :password, length: {minimum: 6}, allow_nil: true

  #authored_questions
  has_many :authored_questions,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Question

  #topic_user join table
  has_many :topics_users,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :TopicsUser

  #topics subscribed to
  has_many :subscribed_topics,
    through: :topics_users,
    source: :topic

  #questions belonging to subscribed topics?
  has_many :feed_questions,
    through: :subscribed_topics,
    source: :questions


  # for oauth
  # attr_accessor :provider, :uid

  def self.find_or_create_by_facebook_oauth(auth)
   user = User.where(:provider => auth.provider, :uid => auth.uid).first

   unless user
     user = User.create!(
     provider: auth.provider,
     uid: auth.uid,
     email: auth.info.email,
     password: Devise.friendly_token[0,20]
   )
   end

  user
end


  # after_initialize :ensure_session_token
  # attr_reader :password
  #
  # def self.find_by_credentials(username, password)
  #   user = User.find_by(username: username)
  #   if user && user.is_password?(password)
  #     user
  #   else
  #     nil
  #   end
  # end
  #
  # def password=(password)
  #   @password = password
  #   self.password_digest = BCrypt::Password.create(password)
  # end
  #
  # def is_password?(password)
  #   BCrypt::Password.new(self.password_digest).is_password?(password)
  # end
  #
  # def reset_session_token!
  #   generate_session_token
  #   self.save!
  #   self.session_token
  # end
  #
  # private
  #
  # def ensure_session_token
  #   generate_session_token unless self.session_token
  # end
  #
  # def generate_session_token
  #   self.session_token = SecureRandom.urlsafe_base64
  #   self.session_token
  # end
end
