require "rails_helper"

RSpec.describe VideosController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/videos").to route_to("videos#index")
    end

    it "routes to #new" do
      expect(:get => "/videos/new").to route_to("videos#new")
    end

    # Probably won't have a individual video show page
    # it "routes to #show" do
    #   expect(:get => "/videos/1").to route_to("videos#show", :id => "1")
    # end

    # Edit will not be needed
    # it "routes to #edit" do
    #   expect(:get => "/videos/1/edit").to route_to("videos#edit", :id => "1")
    # end


    it "routes to #create" do
      expect(:post => "/videos").to route_to("videos#create")
    end

    # No update of videos
    # it "routes to #update" do
    #   expect(:put => "/videos/1").to route_to("videos#update", :id => "1")
    # end

    it "routes to #destroy" do
      expect(:delete => "/videos/:id").to route_to("videos#destroy", :id => "1")
    end

  end
end
