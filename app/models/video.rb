# == Schema Information
#
# Table name: videos
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  video      :string(255)
#  created_at :datetime
#  updated_at :datetime
#  user_id    :string(255)
#

class Video < ActiveRecord::Base
  mount_uploader :video, VideoUploader
  belongs_to :users
end
