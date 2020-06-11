require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`${client.user.tag} est connecté`);
    client.channels.cache.get('712009032273100971').messages.fetch('719894542077263933');
});

client.on('message', message => {
    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
});

client.on('messageReactionAdd', (reaction, user) => {
    console.log('init');
    if(user.bot) return;
    if(reaction.message.channel.id === '712009032273100971')
        if(reaction.message.id === '719894542077263933' && reaction.emoji.name === '✅') {
            const member = reaction.message.guild.member(user);
            member.roles.add('719887496053260328');
        }
        else reaction.remove();
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'lab');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

client.login(process.env.TOKEN);