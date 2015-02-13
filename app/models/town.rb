#  :name   (string)
#  :links  (string of array?)

class Town
  attr_accessor :id, :name, :npcs

  def initialize(id, name)
    @id = id
    @name = name
    @npcs = # something here
  end
end