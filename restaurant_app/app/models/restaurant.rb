class Restaurant < ActiveRecord::Base

	  def create
    @restaurant = Restaurant.create(params.require(:restaurant).permit(:name))

    respond_to do |f|
      # note how for HTML requests we still want to redirect
      f.html { redirect_to restaurants_path }
      # we send back the new restraunt as JSON.
      f.json { render json: @restaurant }
    end
  end

end
