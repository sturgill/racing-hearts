require 'yaml'

male = %w(James, John, Robert, Michael, Mike, Will, David, Richard, Charles, Joe, Tom, Chris, Dan, Paul, Mark, Don, George, Ken, Steven, Jacob, Ethan, Andrew, Anthony, Tyler, Jason)
female = %w(Mary, Katie, Linda, Barbara, Lisa, Jennifer, Maria, Susan, Margaret, Dorothy, Nancy, Karen, Betty, Helen, Sandra, Donna, Carol, Emily, Emma, Madison, Abigail, Olivia, Jessica, Samantha, Alexa)
all_names = male.concat(female)
goods = %w(perfumes roses chocolates silks jewels)

Towns = %w(A B C D E F G)

npcs = []
count = 0
Towns.each do |town|
  6.times do |n|
    count += 1
    buy_rates = {}
    sell_rates = {}
    valentine = {}
    goods_to_reduce = 100


    goods.each { |good| buy_rates[good] = (Random.new.rand(1..1000)/100.0) } # buys
    buy_rates.each { |good, rate| sell_rates["#{good}"] = (rate * 0.75).round(2)}  #sells
    goods.each do |good|  #valentine
      reduce_by = Random.new.rand(1..40)
      value = reduce_by > goods_to_reduce ? goods_to_reduce : reduce_by
      valentine[good] = value
      goods_to_reduce -= value
    end

    npcs << {
      "id" => count,
      "name" => all_names.shuffle!.pop,
      "town" => town,
      "buy" => buy_rates,
      "sell" => sell_rates,
      "valentine" => valentine
    }
  end
end

File.open "../npcs/npcs.yml", "w+" do |f|
  YAML.dump(npcs, f)
end
