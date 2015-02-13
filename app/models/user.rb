class User < ActiveRecord::Base
  before_create :generate_uuid

  monetize :hearts_cents

  protected

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
