class User < ActiveRecord::Base
  before_create :generate_uuid

  monetize :hearts_cents

  attr_accessor :world

  def world
    @world ||= World.new
  end

  def current_location
    world.location(current_town)
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
