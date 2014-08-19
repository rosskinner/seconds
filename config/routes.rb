Rails.application.routes.draw do
  get 'panda_controller/authorize_upload'

  get "/panda/authorize_upload", :to => "panda#authorize_upload"

  root :to => "videos#index"
  devise_for :users
  resources :videos
end
