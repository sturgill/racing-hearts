#  :name   (string)
#  :links  (string of array?)

class World
  ALL_TOWNS = [
    ["A", "Heartsville"],
    ["B", "Chocolate Town"],
    ["C", "Los Corazones"],
    ["D", "Valentine Valley"],
    ["E", "BrokeHeart Mountain"],
    ["F", "Love City"]
  ]

  attr_accessor :towns

  def initialize
    self.towns = ALL_TOWNS.map{ |town| Town.new(town[0], town[1]) }
  end

  def neighbors_for_town(current_town_id) 
    current_index = towns.index {|t| t.id == current_town_id}
    return [towns[current_index-1].name, towns[current_index+1]]
  end

  def location(town_id)
    towns.find{|t| t.id == town_id}.name
  end
end

class Town
  attr_accessor :id, :name

  def initialize(id, name)
    self.id = id
    self.name = name
  end

end