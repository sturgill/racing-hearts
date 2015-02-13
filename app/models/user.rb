class User < ActiveRecord::Base
  before_create :generate_uuid
  validate :email, presence: true # uniqueness constraint enforced by database
  # uniquness constraint on uuid enforced by database -- if that fails we have bigger problems...

  monetize :hearts_cents

  attr_accessor :world

  def self.authenticate!(auth)
    email = auth['info']['email']
    name = auth['info']['name']
    self.where(email: email).first || User.create(email: email, name: name)
  end

  def world
    @world ||= World.new
  end

  def current_location
    world.location(current_town_identifier)
  end

  def current_location_name
    current_location.name
  end

  def valid_destinations
    world.neighbors_for_town(current_location.id)
  end

  protected

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
