require 'rails_helper'

RSpec.describe "Factories", :type => :request do
  describe "GET /factories" do
    it "works! (now write some real specs)" do
      get factories_index_path
      expect(response.status).to be(200)
    end
  end
end
