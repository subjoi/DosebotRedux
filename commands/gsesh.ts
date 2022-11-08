import Discord from 'discord.js';

function shuffleArray<T>(ary: T[]): T[] {
    for (let i = ary.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * ary.length);
        [ary[i], ary[j]] = [ary[j], ary[i]];
    }
    return ary;
}

export const applicationCommandData = {
    name: "gsesh",
    description: "Light the bowl and pass it around."
} as Discord.ApplicationCommandData;

export async function legacy(client: Discord.Client, message: Discord.Message, args: string[]) {
    let response = await message.reply("Group toke is now a slash command! Type /gsesh.");
    await new Promise((resolve) => { setTimeout(resolve, 5 * 1000) });
    response.delete();
}


export async function performInteraction(interaction: Discord.CommandInteraction) {
    if (!interaction.channel) {
        console.log("this interaction took place without a channel?");
        return;
    }

    const emoji = shuffleArray([
        '<:weed:1029492893448155186>', '<:smoke:992597345789284382>', '<:baked:992111394889678889>', '<:zoinkedfons:763507244951797771>'

    ]).map((emojislug) =>
        interaction.client.emojis.cache.find((candidate) => emojislug == `<:${candidate.name}:${candidate.id}>`)
    ).filter(x => x instanceof Discord.GuildEmoji) as Discord.GuildEmoji[];
    
    if (!emoji) {
        console.log("could not find emoji!");
        return;
    }

    const firstMessageText = `Time for a group session. Drug up in two minutes! Use the reaction button to join in.`;
    await interaction.reply(firstMessageText);
    const firstMessage = await interaction.fetchReply() as Discord.Message;
    const firstReaction = await firstMessage.react(emoji[0]);

    await new Promise((resolve) => { setTimeout(resolve, 60 * 1000) });

    const secondMessage = await interaction.channel.send("Toke up in one minute! Use the reaction button to join in.");
    const secondReaction = await secondMessage.react(emoji[1]);

    await new Promise((resolve) => { setTimeout(resolve, 30 * 1000) });

    const thirdMessage = await interaction.channel.send("Drug up in 30 seconds! Use the reaction button to join in.");
    const thirdReaction = await thirdMessage.react(emoji[2]);

    await new Promise((resolve) => { setTimeout(resolve, 25 * 1000) });

    const countdownMessage = await interaction.channel.send("5..");
    for (let i = 4; i > 0; i--) {
        await new Promise((resolve) => { setTimeout(resolve, 1 * 1000) });
        countdownMessage.edit(`${i}..`);
    }
    await new Promise((resolve) => { setTimeout(resolve, 1 * 1000) });
    await countdownMessage.delete();

    // compile list of users to mention
    const mentionUsers = Array.from(new Set( // conversion to set eliminates duplicates
        [
            await (await firstReaction.fetch()).users.fetch(),
            await (await secondReaction.fetch()).users.fetch(),
            await (await thirdReaction.fetch()).users.fetch()
        ]
        .map(x => Array.from(x.values()))
        .reduce((x, y) => x.concat(y), [ interaction.user ]) // collapse arrays, include initiating user
        .filter(u => u.id != interaction.client.user?.id) // exclude dosebot's initial reacts
    ));

    if (Math.random() > 0.9 && !!(interaction.client.user)) {
        mentionUsers.push(interaction.client.user);
    }

    const mentionString = shuffleArray(mentionUsers).map(u => `<@${u.id}>`).join(", ");
    await interaction.channel.send(`Drug up ${mentionString}!`);

    await new Promise((resolve) => { setTimeout(resolve, 2 * 1000) });
    await thirdMessage.delete();
    await new Promise((resolve) => { setTimeout(resolve, 2 * 1000) });
    await secondMessage.delete();
    await new Promise((resolve) => { setTimeout(resolve, 2 * 1000) });
    await firstMessage.delete();
}
