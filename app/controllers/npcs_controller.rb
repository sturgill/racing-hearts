class NpcsController < ApplicationController
  def index
    render json: current_user.current_location.npcs.collect { |ncp| { id: ncp.id, name: ncp.name } }
  end

  def show
    npc = current_user.current_location.npcs.find { |ncp| ncp.id.downcase == params[:id].downcase }
    render nothing: true and return if npc.nil?

    render json: {
      buy: npc.buy,
      sell: npc.sell,
      valentine: npc.valentine
    }
  end

  def buy
    npc = current_user.current_location.npcs.find { |ncp| ncp.id.downcase == params[:id].downcase }
    render nothing: true and return if npc.nil?

    npc.sell_to_user(current_user, params[:type], params[:amount])
    render nothing: true
  end

  def sell
    npc = current_user.current_location.npcs.find { |ncp| ncp.id.downcase == params[:id].downcase }
    render nothing: true and return if npc.nil?

    npc.buy_from_user(current_user, params[:type], params[:amount])
    render nothing: true
  end

  def requirements
    npc = current_user.current_location.npcs.find { |ncp| ncp.id.downcase == params[:id].downcase }
    render nothing: true and return if npc.nil?

    render json: {
      status: "ok",
      message: npc.valentine
    }
  end

  def valentines
    npc = current_user.current_location.npcs.find { |ncp| ncp.id.downcase == params[:id].downcase }
    render nothing: true and return if npc.nil?

    if npc.valentine!(user)
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
end