class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  validates :body, presence: true, unless: :image?
end
