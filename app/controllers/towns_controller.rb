class TownsController < ApplicationController

  def index
    render json: {:current_location => current_user.current_location_name, valid_destinations: current_user.valid_destinations}
  end

  def update
    town_id = user_params[:id].upcase
    if current_user.valid_destinations.collect{ |d| d[:id].upcase }.include?(town_id)
      message = current_user.initiate_travel_event(town_id)
      render json: {:status => "ok", :message => message}
    else
      render json: {:status => "error", :message => "Invalid destination"}
    end

  end

  protected

  def user_params
    params.permit(:id, :current_town_identifier)
  end
end