require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`${client.user.tag} is online and ready`);
    // Fetch and cache uncached messages from #rules channel
    const channel = client.channels.cache.get('712009032273100971');
    if(channel) channel.messages.fetch({limit: 1}, true);
});

client.on('message', message => {
    if(!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
});

client.on('messageReactionAdd', (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.channel.id === '712009032273100971')
        if(reaction.emoji.name === '✅') {
            const member = reaction.message.guild.member(user);
            if(!member.roles.cache.has('719887496053260328'))
                member.roles.add('719887496053260328');
        }
        else reaction.remove();
});

client.on('messageReactionRemove', (reaction, user) => {
    if(user.bot) return;
    if(reaction.message.channel.id === '712009032273100971')
        if(reaction.emoji.name === '✅') {
            const member = reaction.message.guild.member(user);
            if(member.roles.cache.has('719887496053260328'))
                member.roles.remove('719887496053260328');
        }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'lab');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

client.login(process.env.TOKEN);