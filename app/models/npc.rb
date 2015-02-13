# :name (string)
# :age (int)
# :eyecolor (string)
# :haircolor (string)
# :requirements (array string)
# :trades (array string)
# :buy back ratio (number)
# :current_town (string)

attr_reader :id, :name, :town

class Npc
  def initialize(id, name, town)
    @id, @name, @town = id, name, town
  end
end