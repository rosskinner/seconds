require 'rails_helper'

RSpec.describe PandaControllerController, :type => :controller do

  describe "GET authorize_upload" do
    it "returns http success" do
      get :authorize_upload
      expect(response).to be_success
    end
  end

end
