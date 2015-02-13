class SessionsController < ApplicationController
  def create
    user = User.authenticate! request.env['omniauth.auth']
    redirect_to "#{ENV['domain']}/play?uuid=#{user.uuid}"
  end
end
