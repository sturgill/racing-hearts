class NpcsController < ApplicationController
  def index
    render json: current_user.current_location.ncps.collect { |ncp| { id: ncp.id, name: ncp.name } }
  end
end