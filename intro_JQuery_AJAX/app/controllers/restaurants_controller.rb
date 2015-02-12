class RestaurantsController < ApplicationController
  def index
  	@restaurants = Restaurant.all

  	respond_to do |f|
  		f.html
  		f.json { render json: @restaurants }
  	end
  end

  def create
  	@restaurant = Restaurant.create(params.require(:restaurant).permit(:name))

  	respond_to do |f|
  		f.html { redirect_to restaurants_path }
  		f.json { render json: @restaurant }
  	end
	end

end