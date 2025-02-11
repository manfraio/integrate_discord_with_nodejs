require('dotenv').config()
const axios = require('axios')
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

async function register(name) {
    try {
        await axios.post(process.env.CHANNEL_WEBHOOK_URL, {
            embeds: [
                {
                    title: 'Yayyy!!!',
                    description: 'A new user just registered',
                    color: 0x78a3cf,
                    fields: [
                        {
                            name: 'User Name',
                            value: name,
                            inline: true
                        },
                        {
                            name: 'Date Registered',
                            value: new Date(),
                            inline: true
                        }
                    ],
                    footer: {
                        text: 'We have 100 users registered',
                        icon_url: 'your_icon_url'
                    },
                    image: {
                        url: 'your_image_url'
                    }
                }
            ]
        })

        console.log('Message sent successfully to channel')
    } catch (error) {
        console.error(error.message)
    }
}

async function createSlashCommand(name, description, options) {
    try {
        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
            body: [
                {
                    name,
                    description,
                    options
                }
            ]
        })

        console.log('Slash command created')
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
}

async function getBotServers() {
    try {
        const servers = await rest.get(Routes.userGuilds())

        console.log(servers)
    } catch (error) {
        console.error('An error ocurred: ', error)
    }
}

// register('John Doe')

// createSlashCommand(
//     'quote', 
//     'Get a random motivational quote',
//     [
//         {
//             name: 'private',
//             description: 'If true, the quote will only be visible to you.',
//             type: ApplicationCommandOptionType.Boolean,
//             required: false
//         }
//     ]
// )

//getBotServers()