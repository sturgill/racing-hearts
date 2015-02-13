class TownsController < ApplicationController

  def index
    render :json {:current_location => current_user.current_location_name, valid_destinations: current_user.valid_destinations}
  end

  def update
    town_id = params[:id]
    if current_user.valid_destinations.include?(town_id)
      message = current_user.initiate_travel_event
      render :json {:status => "ok", :message => message}
    else
      render :json {:status => "error", :message => "Invalid destination"}
    end

  end
end