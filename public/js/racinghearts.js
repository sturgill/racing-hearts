// Racing Hearts
// DailyBurn 2015 Hackathon
// Chris Sturgill, Kevin Spector, Luke Arntson

// extend jquery to read params
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

// Racing Hearts Server URL
var RHS = 'http://racing-hearts.herokuapp.com/';

var game = function() {
  // These are not what is stored on the server, just some client side stats
  var player = {
    username: 'Bob',
    uuid: '00000-0000-0000-0000',
    hearts: 500.00,
    perfume: 0,
    roses: 0,
    chocolates: 0,
    silks: 0,
    jewels: 0,
    current_town: {id:'A', name:'Replace me'}
  };

  function server(url, params, term, callback) {
    params.uuid = player.uuid;
    term.pause();
    $.ajax({
      url: RHS + url + '?' + jQuery.param(params),
      success: function( data ) {
        // perform a request to get the user statistics
        term.resume();
        callback(data);
      },
      error: function(response){
        console.log(response);
        // go back to our parent
      }
    });  
  }

  //to show greetings after clearing the terminal
  function greetings(term) {
      term.echo(
"'||''|.                    ||                      '||'  '||'                           .          \n" +
" ||   ||   ....     ....  ...  .. ...     ... .     ||    ||    ....   ....   ... ..  .||.   ....  \n" +
" ||''|'   '' .||  .|   ''  ||   ||  ||   || ||      ||''''||  .|...|| '' .||   ||' ''  ||   ||. '  \n" +
" ||   |.  .|' ||  ||       ||   ||  ||    |''       ||    ||  ||      .|' ||   ||      ||   . '|.. \n" +
".||.  '|' '|..'|'  '|...' .||. .||. ||.  '||||.    .||.  .||.  '|...' '|..'|' .||.     '|.' |'..|' \n" +
"                                        .|....'\n" +
                'DailyBurn Hackathon 2015\n'+
                'Chris Sturgill, Kevin Spector, Luke Arntson\n'+
                'https://github.com/sturgill/racing-hearts\n\n' +
                'Welcome to Racing Hearts\n');
  }

  function help(term) {
    term.echo('[S]TAT\n\tDisplay your current inventory\n'+
              '[T]ALK\n\tDisplay a list of every person in the town you are in\n'+
              'T[R]AVEL\n\tTravel to a destination attached to your current town\n'+
              '[C]LEAR\n\tClear this terminal\n'+
              'RESET\n\tReset your adventure');
  };

  function updateStats(term, callback){
    server('stat', {}, term, function(data){
      player.name = data.name;
      player.hearts = data.hearts;
      player.perfumes = data.perfumes;
      player.roses = data.roses;
      player.chocolates = data.chocolates;
      player.silks = data.silks;
      player.jewels = data.jewels;
      player.current_town.id = data.current_town.id;
      player.current_town.name = data.current_town.name;
      //player.valentine = obj.valentine_identifier;
      callback();
    });
  }

  function login(term, callback) {
    var uuid = $.urlParam('uuid');
    if ( uuid == null ) {
      window.location.href = '/login';
      return;
    }

    // Set our user's global UUID here
    player.uuid = uuid;
    callback();
  }

  function stat(term) {
    updateStats(term, function(){
      term.echo('Displaying users current stats:');
      term.echo(" Player Name - " + player.name + '\n'+
        " Hearts - " + player.hearts + '\n'+
        " Inventory:\n" +
        "   Perfumes - " + player.perfumes + '\n'+
        "   Roses - " + player.roses + '\n'+
        "   Chocolates - " + player.chocolates + '\n'+
        "   Silks - " + player.silks + '\n'+
        "   Jewels - " + player.jewels + '\n'+
        " Current Town - " + player.current_town.name);
        start(term);
    });
  };

  function amount(term, type, id, action)
  {
    term.echo('Please enter how many ' + type + ' you want to ' + action + '. [B]ack to change your item choice'); 
    term.push(function(command) {
      if ( Math.floor(command) == command && $.isNumeric(command) )
      {
        server('talk/' + action + '/' + id, {type: type, amount: command}, term, function(data) {
          term.pop(); // price
          term.pop(); // buy sell
          term.pop(); // npc talk
          term.pop(); // list of npcs
          start(term);
        });
      }
      else if ( command.match(/^(b|back)$/i) ) {
        term.pop(); // buy sell
        term.echo('Please select an item to ' + action);
      }
      else {
        term.echo('Error, ' + command + ' is not a valid option');
        help(term);
      }
    }, {
      prompt: '*> '
    });
  }

  function trade(term, npc, units, action)
  {
    function help(term) {
      term.echo('[P]erfumes - ' + units.perfumes + '\n' +
        '[R]oses - ' + units.roses + '\n' +
        '[C]hocolates - ' + units.chocolates + '\n' +
        '[S]ilks - ' + units.silks + '\n' +
        '[J]ewels - ' + units.jewels + '\n' + 
        '[L]eave - Go back to town');
    }

    help(term);
    term.echo('Please select an item to ' + action);

    term.push(function(command) {
      if ( command.match(/^(p|perfumes)$/i) ) {
        amount(term, 'perfumes', npc.id, action);
      }
      else if ( command.match(/^(r|roses)$/i) ) {
        amount(term, 'roses', npc.id, action);
      }
      else if ( command.match(/^(c|chocolates)$/i) ) {
        amount(term, 'chocolates', npc.id, action);
      }
      else if ( command.match(/^(s|silks)$/i) ) {
        amount(term, 'silks', npc.id, action);
      }
      else if ( command.match(/^(j|jewels)$/i) ) {
        amount(term, 'jewels', npc.id, action);
      }
      else if ( command.match(/^(l|leave)$/i) ) {
        term.pop(); // buy sell
        term.pop(); // npc talk
        term.pop(); // list of npcs
        start(term);
      }
      else {
        term.echo('Error, ' + command + ' is not a valid option');
        help(term);
      }
    }, {
      prompt: '*> '
    });
  }

  function valentine(term, npc) {
    server('talk/valentines/' + npc.id, {}, term, function(data){
      if ( data.status == 'ok' ) {
        term.echo(
        ' _______                               ___ ___         __               __   __                     __ \n'+
        '|   |   |.---.-.-----.-----.--.--.    |   |   |.---.-.|  |.-----.-----.|  |_|__|.-----.-----.-----.|  |\n'+
        '|       ||  _  |  _  |  _  |  |  |    |   |   ||  _  ||  ||  -__|     ||   _|  ||     |  -__|__ --||__|\n'+
        '|___|___||___._|   __|   __|___  |     \\_____/ |___._||__||_____|__|__||____|__||__|__|_____|_____||__|\n'+
        '               |__|  |__|  |_____|                          DailyBurn Hackathon 2015!!!!\n');
        term.pop();
        term.pop();
        start(term);
      }
      else
      {
        term.echo('Sorry, you do not have enough items to make ' + npc.name + ' your valentines.');
      }
    });
  }

  function requirements(term, npc) {
    server('talk/trading/' + npc.id, {}, term, function(data) {
      term.echo('Valentines requirements for ' + npc.name + ' - ');
      term.echo(' Perfumes: ' + data.valentine.perfumes);
      term.echo(' Roses: ' + data.valentine.roses);
      term.echo(' Chocolates: ' + data.valentine.chocolates);
      term.echo(' Silks: ' + data.valentine.silks);
      term.echo(' Jewels: ' + data.valentine.jewels);

      term.echo('Buy from ' + npc.name + ' -');
      term.echo(' Perfumes: ' + data.buy.perfumes);
      term.echo(' Roses: ' + data.buy.roses);
      term.echo(' Chocolates: ' + data.buy.chocolates);
      term.echo(' Silks: ' + data.buy.silks);
      term.echo(' Jewels: ' + data.buy.jewels);

      term.echo('Sell to ' + npc.name + ' -');
      term.echo(' Perfumes: ' + data.sell.perfumes);
      term.echo(' Roses: ' + data.sell.roses);
      term.echo(' Chocolates: ' + data.sell.chocolates);
      term.echo(' Silks: ' + data.sell.silks);
      term.echo(' Jewels: ' + data.sell.jewels);

      talking(term, npc, data.buy, data.sell);
    });
  }

  function talking(term, npc, buy, sell) {
    function help(term) {
      term.echo('[B]UY\n\tBuy items for hearts\n'+
      '[S]ELL\n\tSell items to gain hearts\n'+
      '[V]ALENTINE\n\tAsk ' + npc.name + ' to be your valentine\n'+
      '[L]EAVE\n\tLeave ' + npc.name);
    }

    function notAvailable(term, command) {
      term.echo('Sorry, ' + command + ' is not a valid command.\n'+
        'Type [H]ELP for commands.');
    }

    help(term);
    term.push(function(command) {
      if ( command.match(/^(b|buy)$/i) ) {
        trade(term, npc, buy, 'buy');
      }
      else if ( command.match(/^(s|sell)$/i) ) {
        trade(term, npc, sell, 'sell');
      }
      else if ( command.match(/^(v|valentine)$/i) ) {
        valentine(term, npc);
      }
      else if ( command.match(/^(h|help)$/i) ) {
        help(term);
      }
      else if ( command.match(/^(l|leave)$/i) ) {
        term.echo('You have left ' + npc.name + '. They felt sad.');
        term.pop(); // get out of the buy-sell terminal
        term.pop(); // get out of the npcs terminal
        start(term);
      }
      else {
        notAvailable(term, command);
      }
    }, {
      prompt: '*> '
    });
  }

  function talk(term) {
    function notAvailable(term, command) {
      term.echo('Sorry, ' + command + ' is not a valid NPC.');
    }

    server('talk', {}, term, function(data) {
      term.echo("Who would you like to talk to?");

      for ( var i = 0; i < data.length ; i++ )
      {
        term.echo(' - ' + data[i].name);
      }

      term.echo("Type CA[N]CEL to go back");

      // list all npcs
      term.push(function(command) {
        for ( var i = 0; i < data.length ; i++ )
        {
          if ( command.match(new RegExp(data[i].name, 'i')) ){
            requirements(term, data[i]);
            return;
          }
        }
        if ( command.match(/^(n|cancel)$/i) ) {
          term.pop();
          start(term);
        }
        else {
          notAvailable(term, command);
        }
      }, {
        prompt: '*> '
      });
    });
  }

  function travelling(term, destination) {
    term.echo("Travelling to " + destination.name);
    server('travel/' + destination.id, {}, term, function(data){
      if ( data.status == 'ok' )
      {
        term.echo(data.message);
        term.echo("You have arrived at " + destination.name);
        term.pop();
      }
      else
      {
        term.echo('Sorry, ' + destination.name + ' could not be travelled to.');
      }
    });
  }

  function travel(term) {
    function notAvailable(term, command) {
      term.echo('Sorry, ' + command + ' is not a valid destination.');
    }

    server('travel', {}, term, function(data) {
      term.echo(
        '          @AAAA@           @CCCC@\n' +
        '        @  A  A  @       @  C  C  @\n' +
        '      @    AAAA    @   @    CCCC    @\n' +
        '    @    *    *     @ @     *    *    @\n' +
        '   @    *     *    BBBBB    *     *    @\n' +
        '  @    *       *   B   B   *       *    @\n' +
        '  @    *        * *BBBBB* *        *    @\n' +
        '  @  FFFF                         DDDD  @\n' +
        '   @ F  F        +++++++++        D  D @\n' +
        '    @FFFF        WORLD MAP        DDDD@\n' +
        '     @   *       +++++++++       *   @\n' +
        '      @    *                   *    @\n' +
        '        @   *                 *   @\n' +
        '          @  *               *  @\n' +
        '            @  *           *  @\n' +
        '              @  * EEEEE *  @\n' +
        '                @  E   E  @\n' +
        '                  @EEEEE@\n' +
        '                    @ @\n' +
        '                     @\n');

      term.echo('You are currently in: ' + data.current_location);
      term.echo('Valid destinations: ' + data.valid_destinations.map(function(e){return e.name;}).join(', '));
      term.echo('Where would you like to travel to? [C]ancel to go back');

      term.push(function(command) {
        for ( var i = 0; i < data.valid_destinations.length; i++ )
        {
          if ( command.match(new RegExp(data.valid_destinations[i].name, 'i')) ){
            travelling(term, data.valid_destinations[i]);
            stat(term);
            return;
          }
        }
        if ( command.match(/^(c|cancel)$/i) ) {
          start(term);
          term.pop();
        }
        else {
          notAvailable(term, command);
        }
      },{
        prompt: '*> '
      });
    });
  }

  function restart(term) {
    term.echo('Resetting your adventure');
    server(('reset'), {}, term, function(data) {
      term.echo('Your adventure has been reset!');
      greetings(term);
      stat(term);
    });
  }

  function invalid(term, command) {
    term.echo('Sorry, ' + command + ' is an invalid command. Type [H]ELP for commands.');
  }

  function start(term) {
    term.echo('Please enter a command. Type [H]ELP for commands');
  }

  $( document ).ready(function() {
    $('#valentines-terminal').terminal(function(command, term) {
      if ( command.match(/^(h|help)$/i) ) {
        help(term);
      }
      else if ( command.match(/^(s|stat)$/i) ) {
        stat(term);
      }
      else if ( command.match(/^(t|talk)$/i) ) {
        talk(term);
      }
      else if ( command.match(/^(r|travel)$/i) ) {
        travel(term);
      }
      else if ( command.match(/^(c|clear)$/i) ) {
        term.clear();
      }
      else if ( command.match(/^(reset)$/i) ) {
        restart(term);
      }
      else {
        invalid(term, command);
      }
    }, {
      width: 800,
      height: 600,
      prompt: '*> ',
      greetings: null,
      onInit: function(term) {
        login(term, function(data) {
          greetings(term);
          stat(term);
        }); // login to our server
      }
    });
  });
};

game();