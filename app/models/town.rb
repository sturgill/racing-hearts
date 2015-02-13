#  :name   (string)
#  :links  (string of array?)

class Town
  attr_accessor :id, :name

  def initialize(id, name)
    @id = id
    @name = name
  end

end