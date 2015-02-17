class UserController < ApplicationController
  def restart
    current_user.restart!
    head :ok
  end
end