FactoryGirl.define do

  factory :user do
    password = Faker::Team.name

    name  Faker::Name.last_name
    email  Faker::Internet.email
    password password
    password_confirmation password
  end

end
