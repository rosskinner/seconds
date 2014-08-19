class PandaVideosController < ApplicationController
  def show
    @video = PandaVideo.find(params[:id])
    @original_video = @video.panda_video
    @h264e = @original_video.encodings["h264"]
  end

  def new
    @video = PandaVideo.new
  end

  def create
    @video = PandaVideo.create!(params[:video])
    redirect_to :action => :show, :id => @video.id
  end
end