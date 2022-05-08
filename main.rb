require "dotenv/load"
require "discordrb"

bot = Discordrb::Bot.new token: ENV["TOKEN"]

# todo: dni bez weekendow, gdy wakacje odliczanie do konca wakacji

# countdown
Thread.new {
    deadline = Time.new(Time.now.year, 06, 24, 12, 30, 0, "+02:00")
    m = bot.send_message ENV["CHANNELID"], "..."
    while Time.now < deadline do
        d = deadline.to_i - Time.now.to_i # difference
        sec = (d % 60).round 
        min = (d % (60 * 60) / 60).round
        hrs = (d % (60 * 60 * 24) / (60 * 60)).round
        days = (d / (60 * 60 * 24)).round
        weeks = (days / 7).round
        mnths = (days / 30).round

        m.edit "Pozostało #{days} dni, #{hrs} godzin, #{min} minut i #{sec} sekund :tada:
czyli ok. #{mnths} miesięcy lub #{weeks} tygodni"
        sleep 30
    end
}

bot.run