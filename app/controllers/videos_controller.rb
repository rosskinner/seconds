class VideosController < ApplicationController
  protect_from_forgery :except => :create
# before_action :set_video, only: [:show, :edit, :update, :destroy]

  # GET /videos
  # GET /videos.json
  def index
    @videos = Video.pluck 'title'
    @videos = Video.order('created_at DESC')
    respond_to do |format|
      format.html{}
      format.json { render :json => @videos }
    end
  end

  # GET /videos/1
  # GET /videos/1.json
  def show
    @videos = Video.all
    @video = @videos.find params[:id]
  end

  # GET /videos/new
  def new
    @video = Video.new
  end

  # GET /videos/1/edit
  def edit
  end

  # POST /videos
  # POST /videos.json
  def create

    @video = Video.new(video_params)
    file = @video.video.tempfile
    binding.pry
    video = Panda::Video.create(:file => file)

    if video.reload.status == 'success'
      video.encodings['h264'].reload
      video.encodings['h264'].encoding_progress
      if video.encodings['h264'].status == 'success'
        @video.video = video.encodings['h264'].url
      end
    end

    respond_to do |format|
      if @video.save
        format.html { redirect_to @video, notice: 'video was successfully created.' }
        format.json { render :show, status: :created, location: @video }
      else
        format.html { render :new }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /videos/1
  # PATCH/PUT /videos/1.json
  def update
    respond_to do |format|
      if @video.update(post_params)
        format.html { redirect_to @video, notice: 'video was successfully updated.' }
        format.json { render :show, status: :ok, location: @video }
      else
        format.html { render :edit }
        format.json { render json: @video.errors, status: :unprocessable_entity }
      end
    end
  end
  # Rosalind is gay because peter is cool and she is funny looking and if she deletes this then NAOUUU!!!11!!!!1!1!11 ur hed is munted m8e
  # DELETE /videos/1
  # DELETE /videos/1.json
  def destroy
    @video.destroy
    respond_to do |format|
      format.html { redirect_to videos_url, notice: 'video was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def video_params
      params.require(:video).permit(:title, :video)
    end
end
