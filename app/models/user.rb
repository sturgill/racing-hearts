class User < ActiveRecord::Base
  before_create :generate_uuid

  monetize :hearts_cents

  def self.authenticate!(auth)
    email = auth['info']['email']
    name = auth['info']['name']
    self.where(email: email).first || User.create(email: email, name: name)
  end

  protected

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
