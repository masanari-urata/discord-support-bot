import { Client, GatewayIntentBits, Events } from "discord.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

const client = new Client({
  intents: [GatewayIntentBits.Guilds] // 参加検知は GuildMembers も追加
});

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") await interaction.reply("Pong!");
});

app.get("/", (_req, res) => res.send("Bot is running"));
app.listen(PORT, () => console.log(`🌐 Express ${PORT}`));

client.login(process.env.DISCORD_TOKEN);
