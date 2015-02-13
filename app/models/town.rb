#  :name   (string)
#  :links  (string of array?)

class Town
  ALL_TOWNS = %w(A B C D E F)
  attr_accessor :name

  def initialize(name)
    self.name = name
  end

  def neighbors
    current_index = ALL_TOWNS.index(self.name)
    return [ALL_TOWNS[current_index-1], ALL_TOWNS[current_index+1]]
  end

end