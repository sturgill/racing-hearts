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
var RHS = 'http://chris.thesturgills.com/racing-hearts/'

var game = function() {
  // These are not what is stored on the server, just some client side stats
  var player = {
    username: 'Bob',
    uuid: '000',
    hearts: 500.00,
    perfume: 0,
    roses: 0,
    chocolates: 0,
    silks: 0,
    jewels: 0,
    currentTown: 'A'
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

  // login using our cookie?
  function login(term, callback) {
    var uuid = $.urlParam('uuid');
    if ( uuid == null ) {
      window.location.href = './index.html';
      return;
    }

    // Set our user's global UUID here
    player.uuid = uuid;

    server('stat', {}, term, function(data) {
      // set user details here... possibly...
      callback();
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
                'http://sturgill.github.io/racing-hearts\n\n' +
                'Welcome to Racing Hearts\n');
  }

  function help(term) {
    term.echo('[S]TAT\n\tDisplay your current inventory\n'+
              '[T]ALK\n\tDisplay a list of every person in the town you are in\n'+
              'T[R]AVEL\n\tTravel to a destination attached to your current town\n'+
              '[C]LEAR\n\tClear this terminal');
  };

  function stat(term) {
    term.echo('Displaying users current stats');
    term.echo("Player Name - " + player.username + '\n'+
      "Hearts - " + player.hearts + '\n'+
      "Perfume - " + player.perfume + '\n'+
      "Roses - " + player.roses + '\n'+
      "Chocolates - " + player.chocolates + '\n'+
      "Silks - " + player.silks + '\n'+
      "Jewels - " + player.jewels + '\n'+
      "Current Town - " + player.currentTown);

    server('stat', {}, term, function(data){
      term.echo(data);
    });
  };

  function buy(term, npc) {
    server('talk/buy/' + npc, {type:'', amount:1}, term, function(data){
      term.pop();
      term.pop();
      start(term);
    });
  }

  function sell(term) {
    server('talk/sell/' + npc, {type:'', amount:1}, term, function(data){
      term.pop();
      term.pop();
      start(term);
    });
  }

  function valentine(term) {
    server('talk/valentines/' + npc, {type:'', amount:1}, term, function(data){
      term.echo(
      ' _______                               ___ ___         __               __   __                     __ \n'+
      '|   |   |.---.-.-----.-----.--.--.    |   |   |.---.-.|  |.-----.-----.|  |_|__|.-----.-----.-----.|  |\n'+
      '|       ||  _  |  _  |  _  |  |  |    |   |   ||  _  ||  ||  -__|     ||   _|  ||     |  -__|__ --||__|\n'+
      '|___|___||___._|   __|   __|___  |     \\_____/ |___._||__||_____|__|__||____|__||__|__|_____|_____||__|\n'+
      '               |__|  |__|  |_____|                          DailyBurn Hackathon 2015!!!!\n');
      term.pop();
      term.pop();
      start(term);
    });
  }

  function requirements(term, name) {
    server('talk/trading/' + name, {}, term, function(data) {
      term.echo(data);
      talking(term, name);
    });
  }

  function talking(term, name) {
    function help(term) {
      term.echo('[B]UY\n\tBuy an item from this person\n'+
      '[S]ELL\n\tSell an item to this person\n'+
      '[V]ALENTINE\n\tAsk this person to be your valentine\n'+
      '[L]EAVE\n\tLeave this person');
    }

    function notAvailable(term, command) {
      term.echo('Sorry, ' + command + ' is not a valid command.\n'+
        'Type [H]ELP for commands.');
    }

    term.echo('Talking to ' + name + '\nType [H]ELP for commands.');
    term.push(function(command) {
      if ( command.match(/^(b|buy)$/i) ) {
        buy(term);
      }
      else if ( command.match(/^(s|sell)$/i) ) {
        sell(term);
      }
      else if ( command.match(/^(v|valentine)$/i) ) {
        valentine(term);
      }
      else if ( command.match(/^(h|help)$/i) ) {
        help(term);
      }
      else if ( command.match(/^(l|leave)$/i) ) {
        term.pop(); // go up one level
        term.pop(); // go all the way to the top
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
      term.echo(data);
      term.echo("Who would you like to talk to?");
      var npcs = ["Bob","Margaret","John","Steve","Jerry","Mary"];
      for ( var i = 0; i < npcs.length ; i++ )
      {
        term.echo(' - ' + npcs[i]);
      }

      term.echo("Type CA[N]CEL to go back");

      // list all npcs
      term.push(function(command) {
        for ( var i = 0; i < npcs.length ; i++ )
        {
          if ( command.match(new RegExp(npcs[i], 'i')) ){
            requirements(term, npcs[i]);
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
    server('travel/' + destination, {}, term, function(data){
      term.echo(data);
      term.echo("Travelling to " + destination);
      term.echo("You were ambushed by heart bandits!! You lost 25 hearts");
      term.echo("You have arrived at " + destination);
      term.pop();
      start(term);
    });
  }

  function travel(term) {
    function notAvailable(term, command) {
      term.echo('Sorry, ' + command + ' is not a valid destination.');
    }

    server('travel', {}, term, function(data) {
      term.echo(data);
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
        '                     @\n\n' +
        'You are currently in : A\n' +
        'Valid destinations: F, B\n\n' +
        'Where would you like to travel to?    CA[N]CEL to go back');

      var validDestinations = ['F','B'];

      term.push(function(command) {
        for ( var i = 0; i < validDestinations.length ; i++ )
        {
          if ( command.match(new RegExp(validDestinations[i], 'i')) ){
            travelling(term, validDestinations[i]);
            return;
          }
        }

        if ( command.match(/^(n|cancel)$/i) ) {
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

  function invalid(term, command) {
    term.echo('Sorry, ' + command + ' is an invalid command. Type [H]ELP for commands.');
  };

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
          stat(term); // get our player statistics from the server
          start(term);  
        }); // login to our server
      }
    });
  });
};

game();