Rails.application.routes.draw do
  get 'restaurants/index'

  get 'restaurants/create'

  get 'index/create'

  root to: "restaurants#index"
  
  resources :restaurants
end

#             Prefix Verb   URI Pattern                     Controller#Action
#  restaurants_index GET    /restaurants/index(.:format)    restaurants#index
# restaurants_create GET    /restaurants/create(.:format)   restaurants#create
#       index_create GET    /index/create(.:format)         index#create
#               root GET    /                               restaurants#index
#        restaurants GET    /restaurants(.:format)          restaurants#index
#                    POST   /restaurants(.:format)          restaurants#create
#     new_restaurant GET    /restaurants/new(.:format)      restaurants#new
#    edit_restaurant GET    /restaurants/:id/edit(.:format) restaurants#edit
#         restaurant GET    /restaurants/:id(.:format)      restaurants#show
#                    PATCH  /restaurants/:id(.:format)      restaurants#update
#                    PUT    /restaurants/:id(.:format)      restaurants#update
#                    DELETE /restaurants/:id(.:format)      restaurants#destroy