require('dotenv').config()
const { Client, GatewayIntentBits, MessageFlags } = require('discord.js')
const axios = require('axios')

const offensiveContent = ['badword1', 'badword2', 'example offensive word']

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.once('ready', () => {
    console.log('Bot is online')
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return

    try {
        if (offensiveContent.some(content => message.content.toLowerCase().includes(content))) {
            await message.delete()
            
            await message.author.send(`${message.author.globalName}, please avoid using offensive language`)

            return
        }

        if (message.content.toLowerCase() === 'hello') {
            message.channel.send('Hello')
        }
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
})

client.on('guildMemberAdd', async (member) => {
    try {
        await member.user.send(`Welcome ${member.user.globalName}. We're happy to have you here!`)
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
})

client.on('guildMemberRemove', async (member) => {
    try {
        const systemChannel = member.guild.systemChannel

        if (systemChannel) {
            await systemChannel.send(`${member.user.username} has left the server.`)
        }
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
})

client.on('interactionCreate', async (interaction) => {
    try {
        if (interaction.commandName === 'quote') {
            const private = interaction.options.getBoolean('private')

            const response = await axios.get('https://zenquotes.io/api/random')

            await interaction.reply({
                content: `***"${response.data[0].q}"*** - ${response.data[0].a}`,
                flags: private ? MessageFlags.Ephemeral : 0
            })
        }
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
})

client.login(process.env.DISCORD_TOKEN)