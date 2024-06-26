import type { CommandInteraction } from "discord.js";
import { Command } from './command';

export class PingCommand extends Command {
  constructor() {
    super("ping", "Replies with Pong!");
  }

  public async execute(interaction: CommandInteraction) {
    return interaction.reply("Pong!");
  }
}