import type { Client } from 'discord.js';

import * as fs from 'node:fs';
import * as readline from 'node:readline';


export const OnClientReady = async (client: Client) => {
    console.log("Discord bot is ready! 🤖");
    const fileStream = fs.createReadStream("./config/guilds.txt");
    const rl = readline.createInterface({
        input: fileStream
    });

    for await (const guildId of rl) {
        const guild = await client.guilds.fetch(guildId);
        console.log(`Indexing ${guild}`);
        const avatars = guild.members.cache.map(member => {
            return {
                username: member.user.tag,
                avatarUrl: member.user.displayAvatarURL()
            };
        });
        console.log(JSON.stringify(avatars));
    }
};