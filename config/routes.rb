Rails.application.routes.draw do

  get 'restaurants/index'

  get 'restaurants/create'

  root to: "restaurants#index"
  resources :restaurants
end
