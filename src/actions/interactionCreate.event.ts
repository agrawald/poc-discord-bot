import type { Interaction } from 'discord.js';

import { commands } from '../commands';

export const OnInteractionCreate = async (interaction: Interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
};