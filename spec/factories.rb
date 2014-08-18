FactoryGirl.define do
  factory :user do |f|
    f.sequence(:email) {Faker::Internet.email}
    f.sequence(:password) {Faker::Lorem.characters(8)}

    factory :user_with_videos do
      after(:create) do |u|
        FactoryGirl.create_list(:video, Random.rand(10..20), :user_id => u)
      end
    end
  end

  factory :video do |f|
    f.sequence(:title) { Faker::Hacker.adjective }
  end


end