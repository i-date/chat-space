class Group < ApplicationRecord
  has_many :members
  has_many :users, through: :members
  has_many :messages

  validates :name, presence: true

  def last_message
    last_message = messages.last
    if last_message.present?
      last_message.body? ? last_message.body : "画像が投稿されています"
    else
      "まだメッセージはありません"
    end
  end
end
