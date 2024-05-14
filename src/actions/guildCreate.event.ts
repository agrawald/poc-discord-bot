import type { Guild } from 'discord.js';

import { deployCommands } from '../deploy-commands';


export const OnGuildCreate = async (guild: Guild) => {
    await deployCommands({ guildId: guild.id });
};