class NpcsController < ApplicationController
  def index
    render json: current_user.current_location.npcs.collect { |ncp| { id: ncp.id, name: ncp.name } }
  end
end