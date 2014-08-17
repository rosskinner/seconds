require 'rails_helper'

RSpec.describe VideosController, :type => :controller do
  describe 'GET /videos' do
    before do
      3.times do |i|
        Video.create(:title => "Video number #{i}")
      end
    end

    describe 'as HTML' do
      before do
        get :index
      end

      it 'should respond with a status 200' do
        expect(response).to be_success
        expect(response.status).to eq(200)
      end

      it 'should set an instance variable with the Videos in reverse order' do
        expect(assigns(:videos)).to be
        expect(assigns(:videos).length).to eq(3)
        expect(assigns(:videos).first.class).to eq(Video)
        expect(assigns(:videos).first.title).to eq('Video number 2')
      end

      it 'should render the videos index template' do
        expect(response).to render_template('index')
      end
    end

    describe 'as JSON' do
      before do
        get :index, :format => :json
      end

      it 'should respond with a status 200' do
        expect(response).to be_success
        expect(response.status).to eq(200)
      end

      it 'should give content type as JSON' do
        expect(response.content_type).to eq('application/json')
      end

      it 'should parse as valid JSON' do
        expect( lambda { JSON.parse(response.body) } ).to_not raise_error
      end

      it 'should have the title of the video in the JSON' do
        videos = JSON.parse(response.body)
        expect(videos.length).to eq(3)
        expect(videos.first['title']).to eq("Video number 2")
      end
    end
  end

  describe 'POST /videos' do
    describe 'with a valid title' do
      before do
        video :create, { :title => 'Test Vid' }
      end

      it 'should redirect to index' do
        expect(response.status).to eq(302)
        expect(response).to redirect_to(video_path(assigns(:video)))
      end

      it 'should increase the number of Video' do
        expect(Video.all.length).to eq(1)
      end
    end

    describe 'without a title' do
      before do
        post :create, {}
      end

      it 'should render the new template' do
        expect(response).to render_template('new')
      end

      it 'should not increase the number of Video' do
        expect(Video.all.length).to eq(0)
      end
    end
  end
end
