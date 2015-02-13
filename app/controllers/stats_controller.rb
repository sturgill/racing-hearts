class StatsController < ApplicationController
  extend MoneyRails::ActionViewExtension

  def index
    render json: json_attrs
  end

  protected

  def json_attrs
    {
      hearts: self.humanized_money(current_user.hearts),
      perfumes: current_user.perfumes,
      roses: current_user.roses,
      chocolates: current_user.chocolates,
      silks: current_user.silks,
      current_town: {
        id: current_user.current_location.id,
        name: current_user.current_location.name
      },
      name: current_user.name
    }
  end
end