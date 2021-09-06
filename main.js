const axios = require("axios");
const request = require("request");
const fs = require("fs");
const os = require("os");
const chalk = require("chalk");
const speed = require("performance-now");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Jakarta").locale("id");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("1927381289:AAFpviZRw2a_xP6evuR2IqhWuHP_HzHYk1Q"); // get token in BotFather Telegram

bot.on('text', async nino => {
  let body = nino.update.message.text || ''
  let id = body
  const userName = nino.message.from.username

// Please don't delete the credit :)

function sendStart(ctx) {
  bot.telegram.sendMessage(ctx.chat.id, "TELEGRAM BOT\n\ni have some download features",
    {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Owner ♥️', url: 'http://t.me/Nino_chann'
          },
            {
              text: 'Source Code 💻', url: 'https://github.com/Nino-chan02/TeleBot'
            }]
        ]
      },
      parse_mode: "Markdown", reply_to_message: ctx.message_id
    })
}

function sendMenu(ctx){
	let name = ctx.message.from.username
	let ucapWaktu = moment.tz("Asia/Jakarta").format("a")
	let tanggal = moment.tz("Asia/Jakarta").format("LLLL")
	let menu = `Selamat ${ucapWaktu} ${name}\n`
	menu += `${tanggal}\n\n`
	menu += `Menu Bot\n`
	menu += `• /ytmp4\n`
	menu += `• /ytmp3\n`
	menu += `• /play\n`
	menu += `• /tiktok\n`
    menu += `• /ping\n\n`
	menu += `Made with ❤️ by @Nino_chann`
	bot.telegram.sendMessage(ctx.chat.id, menu)
}

function sendMessageping(ctx){
	function format(seconds){
		function pad(s){
			return (s < 10 ? `0` : ``) + s;
		}
	var hours = Math.floor(seconds / (60*60));
	var minutes = Math.floor(seconds % (60*60) / 60);
	var seconds = Math.floor(seconds % 60);
	return pad(hours) + ` Jam, ` + pad(minutes) + ` Menit, ` + pad(seconds) + ` Detik`;
	}
	var uptime = process.uptime();
	let timestamp = speed();
	let latensi = speed() - timestamp
	let tutid = moment().millisecond()
	var tmenu = `─────｢ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐈𝐧𝐟𝐨 ｣─────\n\n`
	tmenu += `➪ Host: ${os.hostname()}\n`
	tmenu += `➪ Platfrom: ${os.platform()}\n`
	tmenu += `➪ CPU: ${os.cpus()[0].model}\n`
	tmenu += `➪ Speed: ${os.cpus()[0].speed} MHz\n`
	tmenu += `➪ Core: ${os.cpus().length}\n`
	tmenu += `➪ RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(require(`os`).totalmem / 1024 / 1024)} MB\n\n`
	tmenu += `❒ Ping: ${tutid} MS\n`
	tmenu += `❒ Runtime: ${format(uptime)}\n`
	tmenu += `❒ Speed: ${latensi.toFixed(4)} Second`
	bot.telegram.sendMessage(ctx.chat.id, tmenu)
}

async function getArgs(ctx) {
	try {
		args = ctx.message.text
		args = args.split(" ")
		args.shift()
		return args
	} catch { return [] }
}

bot.start((ctx) => {
	sendStart(ctx)
})
bot.command("help", async ctx => {
	sendMenu(ctx)
})
bot.command("menu", async ctx => {
	sendMenu(ctx)
})

bot.command("ping", async ctx => {
	sendMessageping(ctx)
})

bot.command("tiktok", async (ctx) => {
    try {
    let args = await getArgs(ctx)
	if(args.length < 1){
		ctx.reply("Please enter a link, an example /tiktok https://vt.tiktok.com/ZSJTALMY8")
	}else{
		ctx.reply("Wait, the bot is being searched")
		res = await axios.get("https://justnino.herokuapp.com/api/tiktok?url=" + args[0])
		data = res.data.result
	if(!data){
		ctx.reply("Not found")
		}else{
		capt = `🎥 *ID*: ${data.id}\n`
		capt += `⚜️ *Nickname*: ${data.nickname}\n`
		capt += `❤️ *Like*: ${data.statistic.diggCount}\n`
		capt += `💬 *Komentar*: ${data.statistic.commentCount}\n`
		capt += `🔁 *Share*: ${data.statistic.shareCount}\n`
		capt += `🎞️ *Views*: ${data.statistic.playCount}\n`
		capt += `📑 *Desc*: ${data.desk}`
		ctx.replyWithVideo({ url: data.nowm }, { caption: capt, parse_mode: "Markdown" })
		}
	}
	} catch(e) {
		ctx.reply(String(e))
	}
})

bot.command("ytmp3", async (ctx) => {
	try {
	let args = await getArgs(ctx)
	if(args.length < 1){
		ctx.reply("Please enter a link, an example /ytmp3 https://www.youtube.com/watch?v=U5TkJ2HhMEw&list=RDen9KJdbrZj0&index=27")
	}else{
		ctx.reply("Wait, the bot is being searched")
		res = await axios.get("https://api.zeks.me/api/ytmp3/2?apikey=Nyarlathotep&url=" + args[0])
		data = res.data.result
	if(!data){
		ctx.reply("Music not found")
	}else{
		capt = `「 YOUTUBE MP3 」\n\n`
		capt += `Title: ${data.title}\n`
		capt += `Size: ${data.size}\n`
		capt += `Link: ${data.link}`
		ctx.replyWithPhoto({ url: data.thumb }, { caption: capt, parse_mode: "Markdown" })
		if (Number(data.size.split(` MB`)[0]) >= 25.00) return ctx.reply("Sorry the bot cannot send more than 25 MB!")
		ctx.reply("Wait, audio is being sent")
		ctx.replyWithAudio({ url: data.link, filename: data.title }, { thumb: data.thumb })
		}
	}
	} catch(e) {
		ctx.reply(String(e))
	}
})

bot.command("ytmp4", async (ctx) => {
	try{
	let args = await getArgs(ctx)
	if(args.length < 1){
		ctx.reply("Please enter a link, an example /ytmp4 https://www.youtube.com/watch?v=U5TkJ2HhMEw&list=RDen9KJdbrZj0&index=27")
	}else{
		ctx.reply("Wait, the bot is being searched")
		res = await axios.get("https://api.zeks.me/api/ytmp4/2?apikey=Nyarlathotep&url=" + args[0])
		data = res.data.result
	if(!data){
		ctx.reply("Video not found")
	}else{
		capt = `「 YOUTUBE MP4 」\n\n`
		capt += `Title: ${data.title}\n`
		capt += `Size: ${data.size}\n`
		capt += `Link: ${data.link}`
		ctx.replyWithPhoto({ url: data.thumb }, { caption: capt, parse_mode: "Markdown" })
		if (Number(data.size.split(` MB`)[0]) >= 25.00) return ctx.reply("Sorry the bot cannot send more than 25 MB!")
		ctx.reply("Wait, video is being sent")
		ctx.replyWithVideo({ url: data.link })
		}
	}
	} catch(e) {
		ctx.reply(String(e))
	}
})

bot.command("play", async (ctx) => {
	try{
	let args = await getArgs(ctx)
	if(args.length < 1){
		ctx.reply("Please enter a query, an example /play Gotoubun No Katachi")
	}else{
		ctx.reply("Wait, the bot is being searched")
		res = await axios.get("https://api.zeks.me/api/ytplaymp3?apikey=Nyarlathotep&q=" + args.join(" "))
		data = res.data.result
	if(!data){
		ctx.reply("Music not found")
	}else{
		capt = `「 YOUTUBE PLAY 」\n\n`
		capt += `Title: ${data.title}\n`
		capt += `Size: ${data.size}\n`
		capt += `Duration: ${data.duration}\n`
		capt += `Link: ${data.source}`
		ctx.replyWithPhoto({ url: data.thumbnail }, { caption: capt, parse_mode: "Markdown" })
		if (Number(data.size.split(` MB`)[0]) >= 25.00) return ctx.reply("Sorry the bot cannot send more than 25 MB!")
		ctx.reply("Wait, audio is being sent")
		ctx.replyWithAudio({ url: data.url_audio, filename: data.title }, { thumb: data.thumbnail })
		}
	}
	} catch(e) {
		ctx.reply(String(e))
	}
})

bot.command("exec", async (ctx) => {
	let args = await getArgs(ctx)
    let query = args.join(" ")
    let cp = require('child_process')
	let exec = require('util').promisify(cp.exec).bind(cp)
		let o
	try {
		o = await exec(query)
	} catch (e) {
		o = e
	} finally {
		let { stdout, stderr } = o
		if (stdout) ctx.reply(stdout)
		if (stderr) ctx.reply(stderr)
	}
})

bot.command("eval", async (msg) => {
	let args = await getArgs(msg)
	let query = args.join(" ")
	try{
		msg.reply(require('util').format(eval(`;(async () => { ${query} })()`)))
	} catch (e) {
		msg.reply(require('util').format(e))
	}
})

  // log
  console.log(chalk.whiteBright("├"), chalk.keyword("aqua")("[ TELEBOT ]"), chalk.whiteBright(body), chalk.greenBright("from"), chalk.keyword("yellow")(userName))

  if (body && !body.match(/^[0-9]/)) {
  simih = await axios.get("https://zenzapi.xyz/api/simih?text=" + encodeURI(body) + "&apikey=Nyarlathotep")
  await nino.reply(simih.data.result.message);
  }
})

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
