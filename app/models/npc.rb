# :name (string)
# :age (int)
# :eyecolor (string)
# :haircolor (string)
# :requirements (array string)
# :trades (array string)
# :buy back ratio (number)
# :current_town (string)

class Npc
  attr_reader :id, :name, :town

  def initialize(attrs, town)
    @id = attrs['id']
    @name = attrs['name']
    @town = town
    @buy = attrs['buy']
    @sell = attrs['sell']
    @valentine = attrs['valentine']
    town.add_npc self
  end

  def can_valentine?(user)
    return false if user.perfumes < @valentine['perfumes']
    return false if user.roses < @valentine['roses']
    return false if user.chocolates < @valentine['chocolates']
    return false if user.silks < @valentine['silks']
    return false if user.jewels < @valentine['jewels']
    true
  end

  def cost_to_buy_from(thing)
    @buy[thing]
  end

  def price_to_sell_to(thing)
    @sell[thing]
  end

  def sell_to_user(user, thing, number)
    cost = (cost_to_buy_from(thing).to_f * 100).to_i * number
    return false if user.hearts_cents < cost
    User.transaction do
      user.increment(thing, number)
      user.decrement(:hearts_cents, cost)
    end
  end

  def buy_from_user(user, thing, number)
    cost = (price_to_sell_to(thing).to_f * 100).to_i
    User.transaction do
      user.decrement(thing, number)
      user.increment(:heart_cents, number)
    end
  end

  def valentine!(user)
    return false unless can_valentine?(user)
    user.update_attribute :valentine_identifier, @id
  end
end