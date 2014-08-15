class AddUserIdToVideos < ActiveRecord::Migration
  def change
    change_table :videos do |t|
      t.string :user_id
    end
  end
end
