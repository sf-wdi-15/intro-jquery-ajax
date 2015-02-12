class RestaurantsController < ApplicationController

  def new
  end
  
  def index
  	@restaurants = Restaurant.all
  	# creating a small api for restaurants. takes our database of restaurants and returns them as a json object
  	respond_to do |f|
  		f.html
  		f.json { render json: @restaurants}
  	end

  end

  def create
  	# taking the params from our post form and creating a restaurant, then assigning it to our instance variable
  	@restaurant = Restaurant.create(params.require(:restaurant).permit(:name))

  	respond_to do |f|
  	# note how for HTML requests we still want to redirect
  	f.html { redirect to restaurants_path }
  	# we send back the new restaurant as JSON.
  	f.json { render json: @restaurant}
  end
end
end
