class TownsController < ApplicationController

  def index
    render json: {:current_location => current_user.current_location_name, valid_destinations: current_user.valid_destinations}
  end

  def update
    town_id = user_params[:id].upcase
    if current_user.valid_destinations.collect{ |d| d[:id].upcase }.include?(town_id)
      message, dead = current_user.initiate_travel_event(town_id)
      if dead
        render json: {:status => "error", :message => message + "\nYou have run out of hearts! Game over!"}
      else
        render json: {:status => "ok", :message => message}
      end
    else
      render json: {:status => "error", :message => "Invalid destination"}
    end

  end

  protected

  def user_params
    params.permit(:id, :current_town_identifier)
  end
end