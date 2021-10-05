// Create some constant values
const got = require('got');
const { Canvas } = require("canvas-constructor")
const request = require('request');
const googleTTS = require('google-tts-api');
const figlet = require('figlet');
const weather = require('weather-js');
const tts = require('google-tts-api');
const fetch = require ('node-fetch')
const db = require('quick.db');
const { NovelCovid } = require("novelcovid");
const config = require("config");
const ascii = require('ascii-art');
const asciiFaces = require("cool-ascii-faces");
const snekfetch = require('snekfetch');
const discord = require('discord.js');
const axios = require('axios')
const bot = new discord.Client();
const dotenv = require('dotenv');
const fs = require('fs')
const math = require('mathjs');


// Load from the .env file
dotenv.load;

// Grab the bot token from the .env file
const botToken = process.env.BOT_TOKEN;

// Bot startup
bot.on('ready', () => {
  
  // What is the bot currently playing?
  bot.user.setActivity(`.help in  5${bot.guilds.size} servers`,{ type: 'streaming'});
  
  // Posts on the console when bot is launched
  console.log('Hello World!');
});

// Defaults message => msg
bot.on('message', async msg => {
  
  // Prefix for commands
  // The prefix is currently set to a dot (eg .coinflip or .8ball)
  // But you can change it to whatever you please
  const prefix = ".";

  // Keeps the bot from triggering commands from other bots
  if (msg.author.bot) return;
  
 //keeps bot from triggering in dm
   if (msg.channel.type == "dm") return;
  
  // If a piece of text does not start with the prefix just ignore
  if (!msg.content.startsWith(prefix)) return;

  
  
  // Splits the command from the prefix
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  
  
  // Turns any upper case letters to lower case
  const command = args.shift().toLowerCase();
  
   // Basic Command to check the ping of your bot
  if (command === "ping") {
    msg.channel.send(`:signal_strength: Pong! my Ping is ` + bot.ping + `ms`);
  }
 
  if (command === `prefix 1`){
    msg.channel.send("My prefix for this server is `.`")
  }
  
  // Command that makes a 50/50 coin flip
  if (command === "coinflip") {
    const flip = [
    "It's Heads!",
    "It's Tails!"];
    let randText = flip[Math.floor(Math.random() * flip.length)];
    msg.channel.send(randText);
  }
  
  // Command that acts as an eight ball
  if (command === "8ball") {
    const eightBall = [
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes definitely',
      'You may rely on it',
      'As I see it, yes',
      'Most likely',
      'Outlook good',
      'No way.',
      'Maybe',
      'The answer is hiding inside you',
      'Yes',
      'Signs point to yes',
      'Reply hazy, try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      "Don't count on it",
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful'];
    let randVal = eightBall[Math.floor(Math.random() * eightBall.length)];
    if (!args.slice(1).join(" "))
      return msg.channel.send("You did not asked any question... \n ex: .8ball i am pro.");
    msg.channel.send(randVal);
  }
  
 if (command === "login") {
  if (msg.author.id !== '699507995024818236') return msg.channel.send("Only bot owner can do this.")
   msg.channel.send(`Logging in...`)
    .then((msg) => {
    setTimeout(function() {
   msg.edit(`Logged In!!`)
      }, 3000)});
    msg.channel.send(`Loading Commands. . .`)
 .then((msg) => {
    setTimeout(function() {
   msg.edit("**`Hello World!!`**")
      }, 5000)});(() => {
  process.exit(1);
  })
 }
  
  if (command === 'hi') {
    
       msg.channel.send(`Hi... ${msg.author.username}`)

  }
  
  if(command === "say"){
    
     if (!msg.member.permissions.has("MANAGE_MESSAGES"))
      return msg.channel.send("You do not have enough permissions!");
  let text = args.join(" ");
  msg.delete();
  msg.channel.send(text);
    
      
}
    

  
   if (command === "botinfo") {
      let secs = Math.floor(bot.uptime % 60);
             let days = Math.floor((bot.uptime % 31536000) / 86400);
             let hours = Math.floor((bot.uptime / 3600) % 24);
             let mins = Math.floor((bot.uptime / 60) % 60);
    let embed = new discord.RichEmbed()
    .setTitle(":robot_face:  Bot Information  :robot_face:") //set title of embed
    .setColor("RED") //color of embed
    .setThumbnail("https://cdn.discordapp.com/avatars/728631141313151006/fcc277d91d32e2aeae8fe588303fda49.png?size=2048")
    .setDescription(":bookmark_tabs: Name: `Flash mod` (**MODERATION**) \n \n :man_technologist: DEVELOPER: `Navdeep#4347` \n \n :earth_asia: BOT LOCATION: `India (+5:30)` ")
     .addField(":rocket: Launched On", bot.user.createdAt)
    .addField(":card_index: Memory","`512 MB`")
    .addField(":floppy_disk: Disk","`199 MB`")
    .addField(":bookmark: Library","`Discord.js v.11.3.2`")
    .addField(":spiral_note_pad: Node","`v12.x`")
    .addField(':satellite_orbital: Server Dominance ',`**5${bot.guilds.size}** servers with **9${bot.users.size}** users`)
    .addField(':white_check_mark: API Status', `ONLINE & bot latency to this server is ${Math.round(bot.ping)}ms`)
    .addField(":link: Useful Links:-","[FLASH MUSIC (New)](https://discord.com/api/oauth2/authorize?client_id=769159571536085014&permissions=8&scope=bot) || [OFFICIAL SERVER LINK](https://discord.gg/TvB75GX) ")
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  }
  
  if (command === "help") {
    let embed = new discord.RichEmbed()
    .setTitle(":book: HELP COMMANDS :book:") //set title of embed
    .setColor("GREEN") //color of embed
    .setDescription("\n \n __*Bot commands list*__ - \n \n `.ping` = Shows my Ping! \n \n `.help` = Shows the help(this command) \n \n `.botinfo` = shows my detailes \n \n `.corona <country name>` = shows covid-19 info \n \n `.invite` = gives my invivite link \n \n __*For Mod commands*__ \n \n `.help2` = Shows the list of mod commands \n \n __*For info commands*__ \n \n `.help3` = shows info commands \n \n __*For Fun Commands*__ \n \n `.help4` = shows fun commands")
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  }
  
   if (command === "help2") {
    let embed = new discord.RichEmbed()
    .setTitle(":book: HELP COMMANDS 2 :book:") //set title of embed
    .setColor("#FFEA4F") //color of embed
    .setDescription("  __**Moderation Commands**__-\n \n`.say` = say what u want \n \n `.clear` = deletes the given \n number of messages \n \n `.kick` = kick's mentioned user \n \n `.dm` = send a dm to mentioned user \n \n`.ban` = Bans the mentioned user \n \n `.Unban` = UnBans the mentioned user \n \n `.mute` = mutes the mentioned user \n for a mentioned time!! \n \n `.slowmode` = sets slowmode for a specific channel ")
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  }
  
  if (command === "help3") {
    let embed = new discord.RichEmbed()
    .setTitle(":book: HELP COMMANDS 3 :book:") //set title of embed
    .setColor("#FF1493") //color of embed
    .setDescription("\n \n __**Information Commands**__ - \n \n `.serverinfo` = shows the server information \n \n `.myinfo` = shows your information \n \n `.info <user name>` = shows the info \n of mentioned user \n \n `.myavatar` = shows your avatar \n \n `.avatar <user name>` = shows the avatar \n of mentioned user ")
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  }
  
    if (command === "help4") {
    let embed = new discord.RichEmbed()
    .setTitle(":book: HELP COMMANDS 4:book:") //set title of embed
    .setColor("GREEN") //color of embed
    .setDescription("\n \n __**Fun commands list**__ - \n \n `.slots` = play slots and test your luck!! \n \n `.ascii`  = converts the given text \n into ascii form!! \n \n  `.coinflip` = play 50/50 coin flip game!! \n  \n `.8ball` = ask 8ball and it will give an advice!! \n \n `.rps` = play rps with bot!! \n \n `.joke` = Gives a random joke \n \n `.meme` = gives a random meme!! \n \n `.amazeme` = gives a random amazing meme!!")
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  }
  
  if (command === "invite") {
    let user = msg.author
    let embed = new discord.RichEmbed()
    .setTitle(":link: INVITE BOT TO YOUR SERVER :link: \n ") //set title of embed
    .setColor("#AD6F25") //color of embed
    .setDescription("INVITE ME TO YOUR SERVER BY USING THIS LINK :beginner: \n  ")
     .addField(":paperclips: __*BOT INVITE LINK*__","[click here to invite me to your server!!!](https://discord.com/api/oauth2/authorize?client_id=728631141313151006&permissions=8&scope=bot)")
    .addField(":office: __*OFFICIAL SERVER LINK*__","[click here to join official server!!!](https://discord.gg/TvB75GX)")
    
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed)
    user.send(embed)
  }
  
  if (command === "dm") {
    
    if (!msg.member.permissions.has("MANAGE_MESSAGES"))
      return msg.channel.send("You do not have enough permissions!");
    let user =
      msg.mentions.members.first() ||
      msg.guild.members.cache.get(args[0]);
    if (!user)
      return msg.channel.send(
        `You did not mention a user, or you gave an invalid id`
      );
    if (!args.slice(1).join(" "))
      return msg.channel.send("You did not specify your message");
    user.user
      let dmsEmbed = new discord.RichEmbed()
  .setTitle("DM")
  .setColor("#16FFE6")
  .setDescription(`:mailbox_with_mail: You got a dm from \`${msg.author.username}\` \n (${msg.guild.name})`)
  .addField("Message:-", args.slice(1).join(" "))
  

  user.send(dmsEmbed)

      .catch(() => msg.channel.send("That user could not be DMed!"))
      .then(() => msg.channel.send(`Sent a DM message to ${user.user.tag} :incoming_envelope:`));
  }
  
  if(command === "kick") {
       if(msg.member.hasPermission("KICK_MEMBERS")) {
    let member = msg.mentions.members.first();
    if(member) {
        member.kick('Optional reason for the audit logs').then(() => {
            msg.channel.send(`Successfully kicked ${member}`);
         
          }).catch(err => {
            msg.channel.send('I was unable to kick the user. Please check my permmisions.');
            console.error(err);
          });
    } else {
        msg.channel.send("You need to mention a user!")
    }
}
   }

    if(command === "ban") {
        if(msg.member.hasPermission("BAN_MEMBERS")) {
     let member = msg.mentions.members.first();
     if(member) {
         member.ban('').then(() => {
             msg.channel.send(`Successfully banned ${member}`);
           }).catch(err => {
             msg.channel.send('I was unable to ban the user. Please check my permmisions.');
             console.error(err);
           });
     } else {
         msg.channel.send("You need to mention a user!")
     }
 }
    }
  if(command === "unban") {
    if(msg.member.hasPermission("BAN_MEMBERS")) {
     let member = msg.mentions.members.first();
     if(member) {
         member.unban('Optional reason for the audit logs').then(() => {
             msg.channel.send(`Successfully unbanned ${member}`);
           }).catch(err => {
             msg.channel.send('I was unable to unban the user. Please check my permmisions.');
             console.error(err);
           });
     } else {
         msg.channel.send("You need to mention a user!")
     }
 }
    }
  
 if  (command === "serverinfo") {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
   let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
       "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "india":":flag_in: india",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
   let serverembed = new discord.RichEmbed()
  .setTitle("SERVER INFORMATION")
  .setColor("0ED4DA")
  .setThumbnail(msg.guild.iconURL)
   .addField('Name', `${msg.guild.name} (${msg.guild.nameAcronym})`, true)
   .addField('Server Owner', msg.guild.owner.user.tag, true)
    .addField("Region", region[msg.guild.region], true)
    .addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
    .addField("Verification Level", verifLevels[msg.guild.verificationLevel], true)
   .addField("Member Count", msg.guild.memberCount, true)
   .addField(':arrow_right: Roles', msg.guild.roles.size, true)
   .addField(':arrow_right: Channels', msg.guild.channels.size, true)
   .addField(':arrow_right: Categories', msg.guild.channels.filter(channel => channel.type === 'category').map(category => category.toString()).join(' **|** '), true)
   .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
  return msg.channel.send(serverembed);
}
    
   if  (command === "clear") {
if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You don't have a permissions to do this.")
    if (isNaN(args[0])) return msg.channel.send("Please input a valid number.") // isNaN = is Not a Number. (case sensitive, write it right)
    if (args[0] > 100) return msg.channel.send("Insert the number less than 100.") // Discord limited purge number into 100.
    if (args[0] < 2) return msg.channel.send("Insert the number more than 1.")

    msg.delete()
    msg.channel.bulkDelete(args[0])
    .then(messages => msg.channel.send(`Deleted ${messages.size}/${args[0]} messages.`)).then(d => d.delete({timeout: 30000})) // How long this message will be deleted (in ms)
    .catch(() => msg.channel.send("Something went wrong, while deleting messages.")) // This error will be displayed when the bot doesn't have an access to do it.
  }
  
  
  
  
  if (command === "myinfo") {
    let region = {
        "brazil": ":flag_br: Brazil",
       "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "india":":flag_in: india",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
    let status = {
        "dnd" : ":no_entry: dnd",
        "online" : ":green_circle: online",
        "idle" : ":crescent_moon: idle",
        "offline" : ":new_moon: offline",
    };
     
    let embed = new discord.RichEmbed()
    .setTitle("YOUR INFO") //set title of embed
    .setColor("RANDOM") //color of embed
    .setThumbnail(msg.author.avatarURL)
    .setDescription("")
    .addField(" __*YourName :-*__",`${msg.author.username + '#' + msg.author.discriminator}`)
    .addField(" __*Your ID :-*__",`||${msg.author.id}||`)
    
    .addField("__*Your Status :-*__",status[`${msg.member.user.presence.status}`], true) 
    .addField("__*Account Created on :-*__",msg.author.createdAt, true)
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  
  }
  
  if (command === "info") {
   let status = {
        "dnd" : ":no_entry: dnd",
        "online" : ":green_circle: online",
        "idle" : ":crescent_moon: idle",
        "offline" : ":new_moon: offline",
    };
     let user = msg.mentions.users.first()
     let mention = msg.mentions.members.first();
    let embed = new discord.RichEmbed()
    .setTitle("INFO") //set title of embed
    .setColor("RANDOM") //color of embed
    .setThumbnail(mention.user.avatarURL)
    .setDescription("")
    .addField(" __*User Name :-*__",`${mention.user.username + '#' + user.discriminator}`)
    .addField(" __*User ID :-*__",`||${mention.user.id}||`, true)
    
    .addField("__*User Status:-*__",status[`${mention.presence.status}`], true)
    .addField("__*Account Created on :-*__",mention.user.createdAt, true)
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
    msg.channel.send(embed);
  
  } 
  
  if (command === "myavatar") {
     let embed = new discord.RichEmbed()
    .setTitle(":star2: __**YOUR AVATAR :-**__") //set title of embed
    .setColor("RANDOM") //color of embed
    .setImage(msg.author.avatarURL)
    .setFooter(`command req by ${msg.author.username}`,`${msg.author.avatarURL}`)
     msg.channel.send(embed);
  }

  if (command === "avatar") {
     let mention = msg.mentions.members.first();
        const avatarMention = new discord.RichEmbed()
        .setColor(0x333333)
        .setAuthor(mention.user.username)
        .setImage(mention.user.avatarURL)
        msg.channel.send(avatarMention);
   }
  
   if (command === 'rps') {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
        const random = Math.floor((Math.random() * acceptedReplies.length));
        const result = acceptedReplies[random];

        const choice = args[0];
        if (!choice) return msg.channel.send(`How to play: \`${prefix}rps <rock|paper|scissors>\``);
        if (!acceptedReplies.includes(choice)) return msg.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
        
        console.log('Bot Result:', result);
        if (result === choice) return msg.reply("It's a tie! We had the same choice.");
        
        switch (choice) {
            case 'rock': {
                if (result === 'paper') return msg.reply('I won!');
                else return msg.reply('You won!');
            }
            case 'paper': {
                if (result === 'scissors') return msg.reply('I won!');
                else return msg.reply('You won!');        
            }
            case 'scissors': {
                if (result === 'rock') return msg.reply('I won!');
                else return msg.reply('You won!');
            }
            default: {
                return msg.channel.send(`Only these responses are accepted: \`${acceptedReplies.join(', ')}\``);
            }
        }
    }
  
  
  if (command === "announce") {

   
     let announcemessage = msg.content.match(/(?<=announce ).*$/)[0];
    let finalmessage = announcemessage.toUpperCase();
 
    
    console.log(announcemessage);
    
    // the embed 
    const announceEmbed = new discord.RichEmbed()
      .setColor("#ff1233")
      .setTitle("Announcement!")
      .setDescription("@everyone, " + finalmessage)
      .setFooter(`Announced by ${msg.author.username}`,`${msg.author.avatarURL}`)
      // add more embed configs if you like
    msg.channel.send(announceEmbed);
  
  }
  
  
  if (command === "roll") {
    if(!args[0]) {
            args[0] = 6;
          }

          let result = (Math.floor(Math.random() * Math.floor(args[0])));
          msg.channel.send(`I rolled ${result + 1}!`);
    }
  
  if (command === "restart") {
   if (msg.author.id !== '699507995024818236') return msg.channel.send("Only bot owner can do this.")
  msg.channel.send(':arrows_counterclockwise: Restarting . . .')
  .then((msg) => {
    setTimeout(function() {
    msg.edit('Restarted Successfully. :white_check_mark:');
  }, 3000)});(() => {
  process.exit(1);
  })
 
  }
 
 if (command === "meme") {
    const embed = new discord.RichEmbed();
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        msg.channel.send(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
    }).catch(console.error);
   
 }
  
  if (command === "amazeme") {
    const client = new discord.Client
    const embed = new discord.RichEmbed();
    
    got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage);
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
        msg.channel.send(embed)
            .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
        console.log('Bot responded with: ' + memeImage);
      
    }).catch(console.error);
  }
  
if (command === "kill") {
  let killed = msg.mentions.members.first();
if(!killed) {

let emb = new discord.RichEmbed()
.setColor("RED")
.setDescription(`${msg.author} decied to kill themself 💔 REST IN PEACE`)

msg.channel.send(emb)

} else {

let emb = new discord.RichEmbed()
.setColor("RED")
.setDescription(`${killed} was killed by ${msg.author} 💔 REST IN PEACE`)

msg.channel.send(emb)


}

}

  


   if (command === "slots") {
       let slots = [" :cherries: ", " :pineapple: ", " :melon: "];
  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));
  let name = msg.author.displayName;
  let icon = msg.author.displayAvatarURL;

  if (slots[result1] === slots[result2] && slots[result1] === slots[result3]) {
    let embed = new discord.RichEmbed()
       .setFooter('You won!', icon)
       .setTitle(':slot_machine: Slots :slot_machine:')
       .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
       .setColor(0xF4E842)
    msg.channel.send(embed);

  } else {
    let embed2 = new discord.RichEmbed()
       .setFooter('You lost!', icon)
       .setTitle(':slot_machine: Slots :slot_machine:')
       .addField('Result:', slots[result1] + slots[result2] + slots[result3], true)
       .setColor(0xF4E842)
    msg.channel.send(embed2);
  }
}
  

    if (command === "ascii") {
 let text = args.join(" ");
 if(!text) {
return msg.channel.send('Please provide text for the ascii conversion!')
}
 let maxlen = 20
if(text.length > 20) {
return msg.channel.send("Please put text that has 20 characters or less because the conversion won't be good!")
}
 // AGAIN, MAKE SURE TO INSTALL FIGLET PACKAGE! 
figlet(text, function(err, data) {
msg.channel.send(data, {
code: 'AsciiArt' 
})
})
}
  
  if (command === "mute") {
             
    const ms = require("ms");
     
     let tomute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!tomute) return msg.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return msg.reply("Can't mute them because they are staff!");
  let muterole = msg.guild.roles.find(`name`, "muted");
  //start of create role

    if(!muterole){
    try{
      muterole = await msg.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      });
     msg.guild.channels.forEach(async (channel, id) => {
    await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return msg.reply("You didn't specify a time!");

  (tomute.addRole(muterole.id));
  msg.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

    
    
  setTimeout(function(){
    
    tomute.removeRole(muterole.id);
    
    msg.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}
  
  
 if (command === "warn") {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("You don't have premission to do that!");
  let reason = args.slice(1).join(' ');
  let user = msg.mentions.users.first();
  if (msg.mentions.users.size < 1) return msg.reply('You must mention someone to warn them.');
  if (reason.length < 1) return msg.reply('You must have a reason for the warning.');

   let embed = new discord.RichEmbed()
    .setTitle(`${user.tag} has been warned.`) //set title of embed
    .setColor("RED") //color of embed
    .addField("Reason :-", reason)
    .setFooter(`Warned by ${msg.author.username}`,`${msg.author.avatarURL}`)
     msg.channel.send(embed);
   
  let dmsEmbed = new discord.RichEmbed()
  .setTitle("Warn")
  .setColor("#00ff00")
  .setDescription(`You have been warned on \`${msg.guild.name}\``)
  .addField("Warned by", msg.author.tag)
  .addField("Reason", reason);

  user.send(dmsEmbed);

  msg.delete();
  

}

  if (command === "reverse") {
    
      if (args.length < 1) {
        throw 'You must input text to be reversed!';
    }
    msg.reply(args.join(' ').split('').reverse().join(''));

}

  if (command === "clap") {
    const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');
      if (args.length < 1) return msg.channel.send("Please provide some text to clapify")
    
    msg.channel.send(args.map(randomizeCase).join(':clap:'));

    msg.delete();

}
 
  if (command === "addrole") {
     let xdemb = new discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle(`Addrole command`)
  .addField("Usage", ".addrole [user] [role]", true)
  .addField("Example", ".addrole @flash mod Member")

  if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send("You don't have premmsions to do that!");
  let rMember = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
  if(!rMember) return msg.channel.send(xdemb);

  let role = args.join(" ").slice(22);
  if(!role) return msg.channel.send("Specify a role!");
  let gRole = msg.guild.roles.find(`name`, role);
  if(!gRole) return msg.channel.send("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return msg.channel.send("This user already have that role.");
  (rMember.addRole(gRole.id));

    msg.channel.send(`***I just gave ${rMember.user.username} the ${gRole.name} role!***`);

    
  
}

     if (command === "removerole") {
        let xdemb = new discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle(`Removerole command`)
  .addField("Usage", ".removerole [user] [role]", true)
  .addField("Example", ".removerole @flash mod Member")

  if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send("You need the `manage members`premission to do that!.");
  let rMember = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
  if(!rMember) return msg.channel.send(xdemb);

  let role = args.join(" ").slice(22);

  if(!role) return msg.channel.send("Specify a role!");
  let gRole = msg.guild.roles.find(`name`, role);
  if(!gRole) return msg.channel.send("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return msg.channel.send("This user doesn't have that role.");
  (rMember.removeRole(gRole.id));

   msg.channel.send(`***I just removed ${rMember.user.username}'s ${gRole.name} role!***`);

  

}
  
  if (command === "moji") {
    const emojis = [
  '( ͡° ͜ʖ ͡°)',
  '¯\\_(ツ)_/¯',
  'ʕ•ᴥ•ʔ',
  '(▀̿Ĺ̯▀̿ ̿)',
  '(ง ͠° ͟ل͜ ͡°)ง',
  'ಠ_ಠ',
  "̿'̿'\\̵͇̿̿\\з=( ͠° ͟ʖ ͡°)=ε/̵͇̿̿/'̿̿ ̿ ̿ ̿ ̿ ̿",
  '[̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]',
  "﴾͡๏̯͡๏﴿ O'RLY?",
  '[̲̅$̲̅(̲̅ ͡° ͜ʖ ͡°̲̅)̲̅$̲̅]',
  '(ᵔᴥᵔ)',
  '(¬‿¬)',
  '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',
  '(づ￣ ³￣)づ',
  'ლ(ಠ益ಠლ)',
  'ಠ╭╮ಠ',
  '♪~ ᕕ(ᐛ)ᕗ',
  'ヾ(⌐■_■)ノ♪',
  '◉_◉',
  '\\ (•◡•) /',
  '༼ʘ̚ل͜ʘ̚༽',
  '┬┴┬┴┤(･_├┬┴┬┴',
  'ᕦ(ò_óˇ)ᕤ',
  '┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻',
  '（╯°□°）╯︵( .o.)',
  'ಠ‿↼',
  '◔ ⌣ ◔',
  '(ノಠ益ಠ)ノ彡┻━┻',
  '(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)',
  "̿ ̿ ̿'̿'\̵͇̿̿\з=(•_•)=ε/̵͇̿̿/'̿'̿ ̿",
  '(;´༎ຶД༎ຶ`)',
  '♥‿♥',
  'ᕦ(ò_óˇ)ᕤ',
  '(•_•) ( •_•)>⌐■-■ (⌐■_■)',
  '⌐╦╦═─ ಠ_ಠ , (¬‿¬)',
  '˙ ͜ʟ˙',
  ":')",
  '(°ロ°)☝',
  'ಠ⌣ಠ',
  '(；一_一)',
  '( ⚆ _ ⚆ )',
  '☜(⌒▽⌒)☞',
  "(ʘᗩʘ')",
  '¯\\(°_o)/¯',
  'ლ,ᔑ•ﺪ͟͠•ᔐ.ლ',
  '(ʘ‿ʘ)',
  'ಠ~ಠ',
  'ಠ_ಥ',
  'ಠ‿↼',
  '(>ლ)',
  '(ღ˘⌣˘ღ)',
  'ಠoಠ',
  'ರ_ರ',
  '◔ ⌣ ◔',
  '(✿´‿`)',
  'ب_ب',
  '┬─┬﻿ ︵ /(.□. ）',
  '☼.☼',
  '^̮^',
  '(>人<)',
  '>_>',
  '(/) (°,,°) (/)',
  '(･.◤)',
  '=U',
  '~(˘▾˘~)',
  '| (• ◡•)| (❍ᴥ❍ʋ)'
];

    let randVal = emojis[Math.floor(Math.random() * emojis.length)];
    msg.channel.send(randVal);
  }
     
if (command === "refresh") {
   if (msg.author.id !== '695990688210354216') return msg.channel.send("Only bot owner can do this.")
  msg.channel.send(':arrows_counterclockwise: Restarting . . .')
  .then((msg) => {
    setTimeout(function() {
    msg.edit('Restarted Successfully. :white_check_mark:');
  }, 3000)});(() => {
  process.exit(1);
  })
   
  }
  
  if (command === "joke") {
     got('https://www.reddit.com/r/jokes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        var title = content[0].data.children[0].data.title;
        var joke = content[0].data.children[0].data.selftext;
        msg.channel.send('**' + title + '**');
        msg.channel.send(joke)
        .then(sent => console.log(`Sent a reply to ${sent.author.username}`))
    }).catch(console.error);
  }
  
  if (command === "corona") {
     let region = {
        "brazil": ":flag_br: Brazil",
       "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "india":":flag_in: india",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
    let countries = args[0] // Your/someone countries prefix.
    if(!countries) return msg.channel.send("You need to mention a country name");
    fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
    .then(response => response.json())
    .then(data => {
      let confirmed = data.confirmed.value.toLocaleString() 
      let recovered = data.recovered.value.toLocaleString() 
      let deaths = data.deaths.value.toLocaleString()
      // Add .toLocaleString() to separate 3 numbers into commas.
      
      const embed = new discord.RichEmbed()
      .setColor("RANDOM") // Blurple.
      .addField(`Country: ${countries}`, `Confirmed: **${confirmed}** \nRecovered: **${recovered}** \nDeaths: **${deaths}**`)
      .setTimestamp()
      
      msg.channel.send(embed)
      // Let's test it out!
    
    })
  }
  

  if (command === "welcome") {
     let channel = msg.mentions.channels.first()
    
    if(!channel) {
      return msg.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${msg.guild.id}`, channel.id)
    
    msg.channel.send(`Welcome Channel is seted as ${channel}`)
  }

   
 

if (command === "asciiface") {
    var randomSet = getRandomNumber(0, asciiFaces.faces.length - 11)
        var faces = asciiFaces.faces.slice(randomSet, randomSet + 10).join("     ")
        msg.reply("Here are some copy-and-paste :clipboard: ascii faces :eyes:\n" + faces)
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } 
    }
  
if (command === "lock") { 
  
const channels = msg.guild.channels.cache.filter((ch) => ch.type !== 'category');
		if (args[0] === 'on') {
			channels.forEach((channel) => {
				channel.updateOverwrite(msg.guild.roles.everyone, {
					SEND_MESSAGES: false,
				}).then(() => {
					channel.setName(channel.name += '🔒');
				});
			});
			return msg.channel.send('locked all channels');
		} if (args[0] === 'off') {
			channels.forEach((channel) => {
				channel.updateOverwrite(msg.guild.roles.everyone, {
					SEND_MESSAGES: true,
				}).then(() => {
					channel.setName(channel.name.replace('🔒', ''));
				});
			});
			return msg.channel.send('unlocked all channels');
		}
		return '';
	}

  
  if (command === "unlock") { 
  
const role = msg.guild.roles.find("name", "Verified ");

msg.channel.overwritePermissions(role,{ 'SEND_MESSAGES': true})
}
  
  if (command === "tts") {
   tts.send('hello')
  }
  
  let count = 0;
setInterval(
  () =>
    require("node-fetch")(process.env.URL).then(() =>
      console.log(`[${++count}] here i pinged ${process.env.URL}`)
    ),
  300000
);
  
 if (command === "slowmode") {
   var time = args[0]
   
   if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send("You need the `manage Channels` premission to do that!.");
   
   if (isNaN(args[0])) return msg.channel.send("please enter a valid time \n ex:- `.slowmode 5`")
    if(!time) return msg.reply('Please enter a time in seconds!')
 msg.channel.setRateLimitPerUser(time)
     msg.channel.send(`slowmode has been set to ${time}sec`)
 }
  
  
  
if (command === "covid") {
  const track = new NovelCovid();
  if(args.join(" ") === "all") {
      let corona = await track.all() //it will give global cases
      
      let embed = new discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return msg.channel.send(embed)
      
      
      
    }
}
  
  
  if (command === "test") {
    
    const ms = require("ms");
    
    const muteRoleId = msg.guild.roles.cache.get('762199219074367508')
    let muteRole;

    const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if (!member) 
      return msg.channel.send('Please mention a user or provide a valid user ID');
    if (member === msg.member)
      return msg.channel.send('You cannot mute yourself');
    if (member === msg.guild.me) return msg.channel.send(msg, 0, 'You cannot mute me');
    if (member.roles.highest.position >= msg.member.roles.highest.position)
      return msg.channel.send('You cannot mute someone with an equal or higher role');
    if (!args[1])
      return msg.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)');
    let time = ms(args[1]);
    if (!time || time > 1209600000) // Cap at 14 days, larger than 24.8 days causes integer overflow
      return msg.channel.send('Please enter a length of time of 14 days or less (1s/m/h/d)');

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None Provided`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    if (member.roles.cache.has(muteRoleId))
      return msg.channel.send('Provided member is already muted');

    // Mute member
    try {
      await member.roles.add(muteRole);
    } catch (err) {
      console.log(err)
      return msg.channel.send('Please check the role hierarchy', err.message);
    }
    const muteEmbed = new discord.MessageEmbed()
      .setTitle('Mute Member')
      .setDescription(`${member} has now been muted for **${ms(time, { long: true })}**.`)
      .addField('Moderator', msg.member, true)
      .addField('Member', member, true)
      .addField('Time', `\`${ms(time)}\``, true)
      .addField('Reason', reason)
      .setFooter(msg.member.displayName,  msg.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(msg.guild.me.displayHexColor);
    msg.channel.send(muteEmbed);

    // Unmute member
    member.timeout = msg.client.setTimeout(async () => {
      try {
        await member.roles.remove(muteRole);
        const unmuteEmbed = new discord.MessageEmbed()
          .setTitle('Unmute Member')
          .setDescription(`${member} has been unmuted.`)
          .setTimestamp()
          .setColor(msg.guild.me.displayHexColor);
        msg.channel.send(unmuteEmbed);
      } catch (err) {
        console.log(err)
        return msg.channel.send('Please check the role hierarchy', err.message);
      }
    }, time);
  }
  
  
  if (command === "llock") {
  if (!msg.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return msg.channel.send("You don't have enough Permissions")
   }
   msg.channel.overwritePermissions([
     {
        id: msg.guild.id,
        deny : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${msg.channel} has been Locked`)
   .setColor("RANDOM");
   await msg.channel.send(embed);
   msg.delete();
}

  
  
  }); // End of bot.on('message')

// Since there is no actual preview for the bot (unless you add your own website code)
// It will be an error or continious refresh loop, consider this part of the code that keeps the bot alive
// Though you will still need an uptime robot in order to truely keep the bot alive
// This is NOT my code, the code is directly from this page: https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/other-guides/hosting-on-glitchcom.html
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// Bot token
// Located in .env file
bot.login(botToken);