const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'embed',
    description: 'Renvoie un embed',
    execute(client, message, args) {
        const channel = client.channels.cache.get('712009032273100971');
        if (!channel) return;

        const welcomeEmbed = new MessageEmbed()
            .setTitle('🥳   BIENVENUE SUR LE SERVEUR !')
            .setColor('#7289da')
            .setDescription('Bienvenue sur **1visible Corp** !\nPour rejoindre les salons de discussion, tu dois d\'abord lire et accepter le règlement du serveur ci-dessous.');

        const rulesEmbed = new MessageEmbed()
            .setTitle('📜   RÈGLEMENT DU SERVEUR')
            .setColor('#ffd983')
            .setFooter('Dernière modification le')
            .setTimestamp();

        const fields = JSON.parse(fs.readFileSync('./commands/rulesEmbed.json', 'utf-8')).fields;
        rulesEmbed.addFields(fields);
        channel.send(welcomeEmbed)
        .then(channel.send(rulesEmbed)
        .then(embed => { embed.react('✅'); }));
        
    }
}