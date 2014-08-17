Rails.application.routes.draw do
  root :to => "videos#index"
  devise_for :users
  resources :videos
end
