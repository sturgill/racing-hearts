class NpcsController < ApplicationController
  before_filter :set_npc, except: [:index]

  def index
    render json: current_user.current_location.npcs.collect { |ncp| { id: ncp.id, name: ncp.name } }
  end

  def show
    render json: {
      buy: @npc.buy,
      sell: @npc.sell,
      valentine: @npc.valentine
    }
  end

  def buy
    @npc.sell_to_user(current_user, params[:type], params[:amount])
    render nothing: true
  end

  def sell
    @npc.buy_from_user(current_user, params[:type], params[:amount])
    render nothing: true
  end

  def requirements
    render json: {
      status: "ok",
      message: @npc.valentine
    }
  end

  def valentines
    if @npc.valentine!(current_user)
      render json: {
        status: "ok",
        message: "Success"
      }
    else
      render json: {
        status: "error",
        message: "Not enough requirements"
      }
    end
  end

  protected

  def set_npc
    @npc = current_user.current_location.npcs.find { |ncp| ncp.id.to_s.downcase == params[:id].to_s.downcase }
    if @npc.nil?
      head :expectation_failed
      false
    end
  end
end