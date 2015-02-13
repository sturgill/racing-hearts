class SessionsController < ApplicationController
  skip_before_filter :require_authentication
  
  def create
    user = User.authenticate! request.env['omniauth.auth']
    redirect_to "#{ENV['domain']}/play?uuid=#{user.uuid}"
  end
end
