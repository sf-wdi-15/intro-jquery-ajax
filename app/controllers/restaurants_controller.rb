class RestaurantsController < ApplicationController
    def index
    @restaurants = Restaurant.all

    respond_to do |f|
      f.html
      f.json { render json: @restaurants }
    end


  def create 

  end  
end
