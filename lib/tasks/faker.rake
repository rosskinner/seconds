namespace :faker do
  desc "Wipe out the User and Video data"
  task :clear => :environment do #environment depends on the environment task for access to Rails models etc
    User.destroy_all
    Video.destroy_all
  end

  desc "Populate users and videos with Faker data"
  task :populate, [:user_count] => :environment do |t, args|
    FactoryGirl.create_list :user_with_videos, args[:user_count].to_i # Be able to specify the number of users to create
  end

  desc "Populate videos with actual Faker Lorem results for a given query"
  task :search,[:query, :limit] => :environment do |t, args|
    query = args[:query]
    limit = args[:limit].to_i

    search = @client.search("#{ query }", :result_type => "recent").take(limit).collect { |tweet|
  "#{tweet.user.screen_name}: #{tweet.text}" }
    search.each do |t|
      Video.create(:title => t)
    end

    puts "Searching Twitter for #{ limit } posts about #{ query }"
    puts search
  end
end
