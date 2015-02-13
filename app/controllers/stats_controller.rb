class StatsController < ApplicationController

  def index
    render json: current_user.to_json(root: false, except: [:id, :email, :uuid])
  end
end