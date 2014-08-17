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

require 'rails_helper'

RSpec.describe Video, :type => :model do
  describe "webcam present" do
    it "checks if webcam present" do
    end
  end
end
