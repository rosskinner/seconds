# encoding: utf-8

class VideoUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick

  # dirty hack
    begin
     include Cloudinary::CarrierWave if Rails.env.production?
      rescue
      raise if Rails.env.production?
    end

    # Choose what kind of storage to use for this uploader:
    storage :file if Rails.env.development?
    # storage :fog

    # Override the directory where uploaded files will be stored.
    # This is a sensible default for uploaders that are meant to be mounted:
    def store_dir
      "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    end

    version :thumb do
      process :resize_to_fit => [200, 140]
    end

    # Add a white list of extensions which are allowed to be uploaded.
    # For images you might use something like this:
    def extension_white_list
      %w(mp4)
    end
  end
end
