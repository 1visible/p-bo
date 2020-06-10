const { TOKEN, PREFIX } = require('./config');
const { Client } = require('discord.js');
const bot = new Client();

bot.on('ready', () => {
    console.log(`${bot.user.tag} est connecté`);
});

bot.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'lab');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});

bot.login(TOKEN);