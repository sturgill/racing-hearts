class World
  ALL_TOWNS = {
    'A' => 'Heartsville',
    'B' => 'Brunch Town',
    'C' => 'Los Corazones',
    'D' => 'Valentine Valley',
    'E' => 'BrokeHeart Mountain',
    'F' => 'Love City'
  }

  attr_accessor :towns

  def initialize
    @towns = ALL_TOWNS.map{ |key, val| Town.new(key, val) }

    file = File.join Rails.root, 'lib', 'npcs',  'npcs.yml'
    yamls = YAML.load_file file

    i = 1
    @ncps = yamls.collect do |ncp_attrs|
      town = @towns.find { |t| t.id == ncp_attrs['town'].strip }
      Npc.new "ncp-#{i}", ncp_attrs, town
      i += 1
    end
  end

  def neighbors_for_town(current_town_id) 
    current_index = @towns.index {|t| t.id == current_town_id}
    
    previous_index = current_index - 1
    previous_index = @towns.count - 1 if previous_index < 0
    
    next_index = current_index + 1
    next_index = 0 if next_index >= @towns.count

    return [@towns[previous_index], @towns[next_index]]
  end

  def location(town_id)
    @towns.find{|t| t.id == town_id}
  end
end