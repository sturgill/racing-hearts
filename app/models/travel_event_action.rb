module TravelEventAction
  ## all performed on user

  def goods
    %w(perfumes roses chocolates silks jewels)
  end

  def attacked
    num_hearts = rand(10..30)
    sub_hearts(num_hearts)
    return "You were robbed by heart bandits and lost #{num_hearts} hearts!"
  end

  def companion
    num_hearts = rand(25..50)
    add_hearts(num_hearts)
    return "You found an attractive travelling companion, who gives you #{num_hearts} hearts!"
  end
  def discover
    sample_good = goods.sample
    current_value = self.send("#{sample_good}")
    num_discovered = rand(2..5)
    self.send("#{sample_good}=", current_value + num_discovered)
    return "Found a bag full of #{sample_good}. +#{num_discovered} #{sample_good}!"
  end
  def helped
    sample_good = goods.sample
    current_value = self.send("#{sample_good}")
    max_value = current_value < 4 ? current_value : 4
    amount_to_deduct = rand(1..max_value)
    if current_value == 0
      return "A broken heart wants #{sample_good}, but you do not have any :(" 
    end
    self.send("#{sample_good}=", current_value - amount_to_deduct)
    return "Helped a broken heart out with #{amount_to_deduct} #{sample_good}"
  end
  def pleasant
    return "You had a very pleasant walk"
  end
end