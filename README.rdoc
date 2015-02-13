****                                           ****
****          DailyBurn Hackathon 2015         ****
***    Team Winning - Luke A. Chris S. Kevin S. ***
****                                           ****
****                                           ****

Theme: Valentines!
Project: Text-Based Game

**********************************************************************************************************

Goal -
  Create a text based game that requires users to spend candy hearts and gain items necessary to find a
valentine.

**********************************************************************************************************

Look -

  The game will look like a simple command prompt inside of a browser window. This will be a callback to
old text adventure games such as Zork.

https://www.youtube.com/watch?v=k1bLBy7gQPI
https://www.youtube.com/watch?v=1q9Q2gwqw7U

  All interactions will take place inside of this window, and will consist of a single command. All
possible commands are laid out in the Rules#1 section.

**********************************************************************************************************
  
Rules -
1.) Commands
2.) Player
3.) Towns & None-Player Characters (NPCs)
4.) Travelling
4.) Trading
5.) Initial Setup

**********************************************************************************************************
------------------------------------------------
1. COMMANDS
------------------------------------------------

The following commands are available to the user when the user is in an idle state (no response required)

HELP
  Display a help display listing all available commands

STAT
  Display the user's current inventory including candy hearts and items
 # Purely informational about the player and what they need

TALK
  Ask who the user would like to talk with, displaying all NPCs names
 # More information can be found in rules 3. THIS LEADS TO TRADING AND WIN CONDITION

TRAVEL
  Ask where the player would like to go, displaying the heart map would be ideal
 # More information can be found in rules 2. THIS LEADS TO MOVEMENT BETWEEN TOWNS
 
**********************************************************************************************************
------------------------------------------------
2. PLAYER
------------------------------------------------

When a player first lands on the project landing page, they are presented with either a user creation
which requires a username/email (Facebook token? authentication), or they are immediately brought into the
game where their player was before (dependent on authentication implementation).

IF a user is first created, they are asked the following questions:
Name: ____
Age: ____
Eye Color: ____
Hair Color: ____
Password: _____
Confirm Password: ____

WHEN a user is first created, they are given the following in their inventory:
Candy Hearts: 500.00
Perfumes: 0
Roses: 0
Chocolates: 0
Silks: 0
Jewels: 0

Players that have already been authenticated will be immediately brought to a town, and told who is there.
This will be the same call as LOOK.

A player has several commands they can execute, and the goal here is to interact with NPCs and trade goods,
as well as move around the towns trying to find an NPC that matches the goods they have. Travelling between
towns also poses danger and reward as each travel will cost the player a day, and can either hurt them if
they are attacked by heart bandits, or help them if they stumble upon a giving person willing to give them
hearts. This is where randomness comes in (and introduces a currency randomness to the game).

**********************************************************************************************************
------------------------------------------------
3. TOWNS
------------------------------------------------

Here is what the initial town looks like when the user says TRAVEL

        @AAAA@           @CCCC@
      @  A  A  @       @  C  C  @
    @    AAAA    @   @    CCCC    @
  @    *    *     @ @     *    *    @
 @    *     *    BBBBB    *     *    @
@    *       *   B   B   *       *    @
@    *        * *BBBBB* *        *    @
@  FFFF                         DDDD  @
 @ F  F        +++++++++        D  D @
  @FFFF        WORLD MAP        DDDD@
   @   *       +++++++++       *   @
    @    *                   *    @
      @   *                 *   @
        @  *               *  @
          @  *           *  @
            @  * EEEEE *  @
              @  E   E  @
                @EEEEE@
                  @ @
                   @
        
ALTERNATIVE ART CHOICE:

         AAAA             CCCC 
         A  A             C  C   
         AAAA             CCCC     
       *    *             *    *     
      *     *    BBBBB    *     *     
     *       *   B   B   *       *     
     *        * *BBBBB* *        *     
   FFFF                         DDDD   
   F  F        +++++++++        D  D  
   FFFF        WORLD MAP        DDDD 
       *       +++++++++       *    
         *                   *     
          *                 *    
           *               *   
             *           *   
               * EEEEE *   
                 E   E   
                 EEEEE 
               

When a player uses the TRAVEL command, they will see this map, along with their current location and
towns they can connect to. The following illustrates a TRAVEL command:

Please enter a command, use HELP to see all commands
>travel
>
       @AAAA@           @CCCC@
      @  A  A  @       @  C  C  @
    @    AAAA    @   @    CCCC    @
  @    *    *     @ @     *    *    @
 @    *     *    BBBBB    *     *    @
@    *       *   B   B   *       *    @
@    *        * *BBBBB* *        *    @
@  FFFF                         DDDD  @
 @ F  F        +++++++++        D  D @
  @FFFF        WORLD MAP        DDDD@
   @   *       +++++++++       *   @
    @    *                   *    @
      @   *                 *   @
        @  *               *  @
          @  *           *  @
            @  * EEEEE *  @
              @  E   E  @
                @EEEEE@
                  @ @
                   @
CURRENT TOWN: E
DESTINATIONS: F, D 
Please choose your destination, or type cancel
> G
Sorry, G is an invalid response
Please choose your destination, or type cancel
> 

... alternatively...
> F
Travelling to town F         
Attacked by Heart Bandits, lost 25 candy hearts!
Arrived at town F
Please enter a command, use HELP to see all commands
>
... alternatively...
> F
Travelling to town F
Found an extremely attractive traveller and made a great conversation! Gain 50 candy hearts!
Arrived at town F
Please enter a command, use HELP to see all commands
>

Here are a list of random events that can happen during travel:

```
Attacked by heart bandits, lose (randomize 10-30) hearts
Found an attractive travelling companion, who gives you (randomize 25-50) hearts
Found a bag full of (randomize 2-5) (randomize any good)s!
Helped a broken heart out with (randomize 1-4) (randomize any good).
You had a very pleasant walk.
```

Towns themselves are filled with NPCs who are all essentially trading machines, but are also the goal of
the game. When a player calls the TALK command, this will display all current NPCs in a town.

Please enter a command, use HELP to see all commands
> talk
You can talk to the following people
Steve
John
Wendy
Sandy
Who would you like to talk to?
> nobody
Sorry, nobody is not in this town
Please enter a command, use HELP to see all commands
... alternatively ...
> Sandy
** call the back-end and determine if we can make Sandy our valentines ***
Sandy is currently looking for the following in a valentines:
Perfumes: 35
Roses: 5
Chocolates: 2
Silks: 25
Jewels: 10
<3 <3 <3 Would you like to make Sandy your valentines? (y/n)
> y
CONGRATULATIONS, YOU AND SANDY ARE NOW VALENTINES. YOU WIN!
> n
... alternatively if they cannot be valentines, or if they say No ...
Sandy is buying and selling goods at the following prices:
Buy from Sandy:
0.25 hearts / 1 perfume
1.3 hearts / 1 roses
2.49 hearts / 1 chocolates
0.17 hearts / 1 silks
3.45 hearts / 1 jewels
 
Sell to Sandy:
1 perfume / 0.2 hearts
1 rose / 1.1 hearts
1 chocolate / 2.21 hearts
1 silk / 0.16 hearts
1 jewel / 3.41 hearts

Notice that the selling to a person is always lower than buying. We can just take the current buy rate and multiply it by 0.75 to represent the selling fee.
We could randomize this selling fee as well.

**********************************************************************************************************
------------------------------------------------
4. TRADING
------------------------------------------------

This transitions us right into trading, here is how the trading will work. From our last section, talking to a
NPC will give us a list of their current trading ratio:

Sandy is buying and selling goods at the following prices:
Buy from Sandy:
0.25 hearts / 1 perfume
1.3 hearts / 1 roses
2.49 hearts / 1 chocolates
0.17 hearts / 1 silks
3.45 hearts / 1 jewels
 
Sell to Sandy:
1 perfume / 0.2 hearts
1 rose / 1.1 hearts
1 chocolate / 2.21 hearts
1 silk / 0.16 hearts
1 jewel / 3.41 hearts

Would you like to buy or sell from Sandy? (buy/sell/leave)
>poop
Sorry, poop is an invalid command
Would you like to buy or sell from Sandy? (buy/sell/leave)
>buy
What would you like to buy from Sandy? ([p]erfume,[r]ose,[c]hocolate,[s]ilk,[j]ewel)
>p
How much perfume would you like to buy? (maximum - floor(total hearts / 0.25))
>3
You bought 3 perfume from Sandy for 0.75 candy hearts, you have 499.25 candy hearts left.
Would you like to buy or sell from Sandy again? (y/n)
>poop
Sorry, poop is an invalid command
Would you like to buy or sell from Sandy again? (y/n)
>y
* rinse repeat *
..alternatively...
>n
Please enter a command, use HELP to see all commands
>stat
 oh yes...
 
NOTE: you cannot buy fractions, but you can sell heart fractions. This means candy hearts are basically
money, so its a currency :)
 
Every NPC has a trading stat that is divided up at the start of the world creation. This means we will
need a global ratio of trade power, so if we have lets say 6 towns * 5 npcs, we will want a somewhat
even spread of 30 different trading ratios per item. So perfume will be 0.5 hearts at its cheapest,
and 3.0 hearts at its most expensive, then a range of 0.5 - 3.0 throughout the rest of the world. This
should be easy to tweak once we have that bit going, which leads into the next section.

**********************************************************************************************************
------------------------------------------------
5. INITIAL SETUP
------------------------------------------------

So we have 6 different towns, and we want to have enough NPCs that there is a nice diverse spread of
trading and variety. Each NPC will also need to have a valentines requirement, and when their valentines
is met, we will want to remove them and create a new NPC in the town (maybe?)

NPC Data:
name - random name chosen from name list (male and female names), CANNOT REPEAT (important)
sex - random male or female (determines name)
age - integer between 25 and 50
eye color - brown, blue, green, gray, hazel
hair color - white, blond, brown, red, black
requirements - 5 values that will determine if a player can be their valentines
trading data - 5 buy/sell values based on our global trading market calculation below
buy back rate - should be low, something like 0.15 to 0.35 so players can't take too much advantage

Requirements Division:
Perfumes, Roses, Chocolate, Silks, Jewels

Start with 100 total points and an unfilled array [perfumes,roses,chocolate,silks,jewels]

(loop-start)
   if attributes unfilled > 1
     Randomly pick 1 attribute
     Remove attribute from unfilled attributes
     pick between 15%-35% of our total points left
     Set the filled attribute to the number we just calculated
     Go to loop-start
  else
       set remaining attribute to our total points left

Example:

100 total points
Randomly picked chocolates from [perfumes,roses,chocolate,silks,jewels]
Removed chocolates, now unfilled looks like [perfumes,roses,silks,jewels]
chocolates = 35% of 100 = 35
65 total points left
Randomly picked perfumes from [perfumes,roses,silks,jewels]
Removed perfumes, now unfilled looks like [roses,silks,jewels]
perfumes = 15% of 65 = 9.75.. floor(9.75) = 9
56 total points left
Randomly picked roses from [roses,silks,jewels]
Removed roses, now unfilled looks like [silks,jewels]
roses = 28% of 56 = 15.68 .. floor(15.68) = 15
41 total points left
Randomly picked jewels from [silks,jewels]
Removed jewels, now unfilled looks like [jewels]
jewels = 18% of 41 = 7.38 .. floor(7.38) = 7
34 total points left
silks = 34

Requirements:
Perfumes: 9
Roses: 15
Chocolates: 35
Silks: 34
Jewels: 7

World Trading Division
Now to actually generate the total trading division in our world, we need to examine the idea that we want
an equal spread of good and bad merchants without having an extremely complex system. We can accomplish this
by dividing up 'good' versus 'bad' sales between all of the merchants that exist in our world.

So, assuming we have 6 towns and 6 NPCs per town

Perfect bad/good spread across all merchants

low [*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*] high
     ^ this merchant is selling/buying for cheap
   
low [*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*----*] high
                                                                                                                   ^ this merchant is selling/buying for expensive

This would not be difficult to do, we could just decide on a bad/good limit, and a baseline for what every item should cost.
Then we would just divide this up and give each NPC a random set of numbers based on this.

Interesting bad/good spread across all merchants

bad [-*---*---*-------*--*---*---*-----*----*-----*-*-------*--*-----*---*-----*---*-----*-----*--*-----*-----*--*--] good
                                                           
We first calculate the perfect spread, then we slightly mutate every number by a given percentage. So if the perfect spread from
1.0 to 10.0 across 30 npcs is 1 unit per tick, we could mutate every price by a random +/- 15% to make the spread much more interesting.
This would affect the overall difficulty, but I think it would be cooler in the long run.
                                                           
So what this looks like in pseudocode

Perfect division :

lowest_price = 1  (heart / unit)
highest_price = 10  (hearts / unit)
perfect_array = []
tick = (highest_price - lowest_price) / total_npcs.length
for i in total_npcs
   perfect_array[i] = lowest_price + tick*i
function randomlyAssignNpcs(perfect_array)

Interesting division :

lowest_price = 1  (heart / unit)
highest_price = 10  (hearts / unit)
perfect_array = []
tick = (highest_price - lowest_price) / total_npcs.length
for i in total_npcs
   perfect_array[i] = lowest_price + tick*i
   perfect_array[i] = perfect_array[i] * (1.15 - 0.30*rand(0,100)) # warble warble warble
function randomlyAssignNpcs(perfect_array)

We could try to do something about not having a 'golden' npc, but this might be fun if players are trying
to use up a golden npc and quickly take them off the board by making them a valentines.

I'm not sure how we want to replace an npc, we could probably just give them the same stats but different
requirements?
                                                           
**********************************************************************************************************

THINGS TO CUT / MINIMIZE

The big thing here is going to be how to cut down the rules to make this a 6 hour challenge and feasible
with our team members. Here's what I'm thinking we can discuss before we dive in:

- Single player only, we generate the map and do all our API calls using rails, but the world is static
  while players are not
- Login is non-existent, everything is per-browser window
- Reduce the towns and travel concept, make it one town you trade in

**********************************************************************************************************

GLOSSARY
  the answer is 42 ><>

Starting player candy hearts : 
   500

Total attribute distribution for NPCs:
   100

Trading worst / best price:
   1 heart / unit , 10 hearts / unit

Npc age range:
   25 to 50
  
Names:
   Male: James, John, Robert, Michael, Mike, Will, David, Richard, Charles, Joe, Tom, Chris, Dan, Paul, Mark, Don, George, Ken, Steven, Jacob, Ethan, Andrew, Anthony, Tyler
   Female: Mary, Katie, Linda, Barbara, Lisa, Jennifer, Maria, Susan, Margaret, Dorothy, Nancy, Karen, Betty, Helen, Sandra, Donna, Carol, Emily, Emma, Madison, Abigail, Olivia
  
Travelling events
   Attacked by heart bandits, lose (randomize 10-30) hearts
   Found an attractive travelling companion, who gives you (randomize 25-50) hearts
   Found a bag full of (randomize 2-5) (randomize any good)s!
   Helped a broken heart out with (randomize 1-4) (randomize any good).
   You had a very pleasant walk.
  
**********************************************************************************************************

Good Reads

1. http://pdf.textfiles.com/academics/dopewars-gunday.pdf
   'Dope Wars and PDAs: The Technophile Drug Dealers Have Finally Found Their Platform'
   
2. https://github.com/neight-allen/lonelycyberwolf/wiki/Dopewars-Classic-Game-Rules
   'Dopewars Classic Game Rules'
   
3. http://www.bbsdocumentary.com/library/PROGRAMS/DOORS/DOPEWARS/
   'PROGRAMS: DOORS: DOPEWARS' ``origins of dopewars``