Rails.application.routes.draw do
  # get 'pages#index'
  devise_scope :user do
    root :to => "devise/sessions#new"
  end
  devise_for :users
  # root :to => 'devise/sessions#new'
  resources :videos
end
