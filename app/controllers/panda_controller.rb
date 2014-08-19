class PandaController < ApplicationController

  # def authorize_upload
  #   payload = JSON.parse(params['payload'])

  #   binding.pry

  #   options = {
  #     profiles: "h264,webm",
  #     # payload: 'something',
  #     # path_format: ':video_id/:profile/play',
  #   }
  #   if payload['filename']
  #     url = '/videos/upload.json'
  #     options['file_name'] = payload['filename']
  #     options['file_size'] = payload['filesize']
  #   else
  #     url = "/videos.json"
  #     options['source_url'] = payload['fileurl']
  #   end

  #   upload = Panda.post(url, options)

  #   render :json => {:upload_url => upload['location']}
  # end

  def authorize_upload
    payload = JSON.parse(params['payload'])
    upload = Panda.post('/videos/upload.json', {
      file_name: payload['filename'],
      file_size: payload['filesize'],
      profiles: "h264",
    })

    render :json => {:upload_url => upload['location']}
  end

end

