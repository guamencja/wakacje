const { Telegraf } = require("telegraf");
const config = require("./config.json");

const fs = require("fs");

const { isSummer } = require("./summer.js");
const { setupCountdown } = require("./countdown.js");

const bot = new Telegraf(config.token);
let countdown = countDown();

function countDown() {
    return setupCountdown((update) => {
        console.log(isSummer());
        const { days, hours, minutes, seconds } = update;
        bot.telegram.editMessageText(
            config.chat_id,
            config.message_id,
            null,
            `${days} dni, ${hours} godz, ${minutes} min, ${seconds} sek do${isSummer() ? " końca" : ""} wakacji ☀️`,
        );
    });
}

bot.command("init", async (ctx) => {
    if (ctx.message.from.id != config.admin_id) return;

    // clear the old countdown
    clearInterval(countdown);

    // unpin the old message
    /*try {
        ctx.telegram.unpinChatMessage(config.chat_id, config.message_id);
    } catch (err) {};*/

    // send a message
    let msg = await ctx.reply('loading...');

    // set counter id to the id of the message
    config.chat_id = ctx.chat.id;
    config.message_id = msg.message_id;
    fs.writeFileSync("./config.json", `{
    "token":"${config.token}",
    "chat_id":"${config.chat_id}",
    "message_id":"${config.message_id}",
    "admin_id":"${config.admin_id}",
    "refresh_rate":"${config.refresh_rate}"
}`);

    // pin the message
    ctx.telegram.pinChatMessage(config.chat_id, config.message_id);

    // setup a new countdown
    countdown = countDown();
});

bot.launch();