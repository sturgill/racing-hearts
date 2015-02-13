#  :name   (string)
#  :links  (string of array?)

class World
  ALL_TOWNS = %w(A B C D E F)

  attr_accessor :towns

  def initialize
    self.towns = ALL_TOWNS.map{ |name| Town.new(name) }
  end

  def neighbors_for_town(current_town_name) 
    current_index = towns.index {|t| t.name == current_town_name}
    return [towns[current_index-1].name, towns[current_index+1].name]
  end
end

class Town
  attr_accessor :name

  def initialize(name)
    self.name = name
  end

end