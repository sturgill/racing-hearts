# :name (string)
# :age (int)
# :eyecolor (string)
# :haircolor (string)
# :requirements (array string)
# :trades (array string)
# :buy back ratio (number)
# :current_town (string)

class Npc
  attr_reader :id, :name, :town, :buy, :sell, :valentine

  def initialize(id, attrs, town)
    @id = id
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
    @buy[thing].to_f
  end

  def price_to_sell_to(thing)
    @sell[thing].to_f
  end

  def sell_to_user(user, thing, number)
    number = number.to_i
    cost = (cost_to_buy_from(thing) * 100).to_i * number
    return false if user.hearts_cents < cost
    User.transaction do
      User.where(id: user.id).update_all("#{thing} = #{thing} + #{number}, hearts_cents = hearts_cents - #{cost}")
    end
  end

  def buy_from_user(user, thing, number)
    number = number.to_i
    return false if user[thing] < number
    cost = (price_to_sell_to(thing) * 100).to_i
    User.transaction do
      User.where(id: user.id).update_all("#{thing} = #{thing} - #{number}, hearts_cents = hearts_cents + #{cost}")
    end
  end

  def valentine!(user)
    return false unless can_valentine?(user)
    user.update_attribute :valentine_identifier, @id
  end
end