class ApplicationController < ActionController::API
  before_filter :require_authentication
  
  protected

  def require_authentication
    unless current_user.present?
      head :unauthorized
      false
    end
  end

  def current_user
    @current_user ||= identify_user
  end

  def identify_user
    return nil if params[:uuid].blank?
    User.where(uuid: params[:uuid]).first
  end
end
