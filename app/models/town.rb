#  :name   (string)
#  :links  (string of array?)

class Town
  attr_accessor :id, :name, :npcs

  def initialize(id, name)
    @id = id
    @name = name
    @npcs = []
  end

  def add_npc(npc)
    @npcs << npc
  end
end