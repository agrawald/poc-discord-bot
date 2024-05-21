import type { Command } from './commands/command';

export const TYPES = {
  Bot: Symbol.for("Bot"),
  Client: Symbol.for("Client"),
  Rest: Symbol.for("Rest"),
  Commands: Symbol.for("Commands"),
  Config: Symbol.for("Config"),
  GuildIds: Symbol.for("GuildIds"),
};

export type DeployCommands = {
  guildId: string;
};

export type Commands = {
  [name: string]: Command
}