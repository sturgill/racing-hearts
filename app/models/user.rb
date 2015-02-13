class User < ActiveRecord::Base
  before_create :generate_uuid
  before_create :setup_resources

  validates :email, presence: true # uniqueness constraint enforced by database
  # uniquness constraint on uuid enforced by database -- if that fails we have bigger problems...
  validates :current_town_identifier, presence: true, inclusion: { in: World::ALL_TOWNS }

  monetize :hearts_cents

  attr_accessor :world

  def self.authenticate!(auth)
    email = auth['info']['email']
    name = auth['info']['name']
    self.where(email: email).first || User.create(email: email, name: name)
  end

  def world
    @world ||= ::World.new
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

  def setup_resources
    self.current_town_identifier = World::ALL_TOWNS.keys.sample
    self.hearts_cents = 50000
  end
end
