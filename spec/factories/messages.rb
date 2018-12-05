FactoryGirl.define do

  factory :message do
    body  Faker::Lorem.sentence
    image Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/fixtures/icon/jpg'))
    created_at { Faker::Time.between(2.days.ago, Time.now, :all) }
  end

end
