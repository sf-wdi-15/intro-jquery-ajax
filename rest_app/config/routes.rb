Rails.application.routes.draw do
  resources :restaurants
  root to: "restaurants#index"

end

#           Prefix Verb URI Pattern                   Controller#Action
#  restaurants_index GET  /restaurants/index(.:format)  restaurants#index
# restaurants_create GET  /restaurants/create(.:format) restaurants#create
