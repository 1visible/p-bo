require('dotenv').config();
const { Client } = require('discord.js');
const bot = new Client();

bot.on('ready', () => {
    console.log(`${bot.user.tag} est connecté`);
});

bot.on('message', message => {
    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

});

bot.on('messageReactionAdd', (messageReaction, user) => {
    if(user.bot) return;
    if(messageReaction.message.channel.id === '712009032273100971') {
        messageReaction.remove();
        if(messageReaction.message.id === '719894542077263933' && messageReaction.emoji === '✅') {
            const member = messageReaction.message.guild.member(user);
            member.roles.add('719887496053260328');
            messageReaction.message.react('✅');
        }
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'lab');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

bot.login(process.env.TOKEN);