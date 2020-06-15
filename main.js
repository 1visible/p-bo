require('dotenv').config();
const fs = require('fs');
const { Client, Collection } = require('discord.js');
const client = new Client();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`${client.user.tag} is online and ready`);
    // Fetch and cache uncached messages from #rules channel
    const channel = client.channels.cache.get('712009032273100971');
    if (channel) channel.messages.fetch('722081233458429972');
});

client.on('message', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;
    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
});

client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.channel.id === '712009032273100971')
        if (reaction.emoji.name === '✅' && reaction.message.id === '722081233458429972') {
            const member = reaction.message.guild.member(user);
            if (!member.roles.cache.has('719887496053260328'))
                member.roles.add('719887496053260328');
        }
        else reaction.remove();
});

client.on('messageReactionRemove', (reaction, user) => {
    if (user.bot) return;
    if (reaction.message.channel.id === '712009032273100971')
        if (reaction.emoji.name === '✅' && reaction.message.id === '722081233458429972') {
            const member = reaction.message.guild.member(user);
            if (member.roles.cache.has('719887496053260328'))
                member.roles.remove('719887496053260328');
        }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'lab');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

client.login(process.env.TOKEN);