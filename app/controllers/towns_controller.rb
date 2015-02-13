class TownsController < ApplicationController

  def index
    render json: { current_location: current_user.current_location_name, valid_destinations: current_user.valid_destinations}
  end
end