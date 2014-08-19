class CreatePandaVideos < ActiveRecord::Migration
  def change
    create_table :panda_videos do |t|
      t.string :title
      t.string :panda_video_id

      t.timestamps
    end
  end
end
