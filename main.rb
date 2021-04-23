require 'discordrb'

# made by @lisqu16, and @programistazpolski

bot = Discordrb::Commands::CommandBot.new token: 'not', prefix: 's!';

#bot.command :ping do |event|
    #m = event.respond "h"
    #event.channel.send_embed do |embed|
        #embed.colour = 0x000000
        #embed.description = "Ping: #{Time.now - event.timestamp} ms\n\nWersja Ruby: #{RUBY_VERSION}"
        #embed.timestamp = Time.now
    #end
    #m.delete
    #nil
#end

# vacacje
deadline = Time.new(2021, 06, 25, 13, 30, 0, "+02:00")
m = bot.send_message "wstaw se id kanalu", "h"
while Time.now < deadline do 
    puts Time.now.to_i, deadline.to_i
    d = deadline.to_i - Time.now.to_i
    seconds = (d % 60).round
    minutes = (d % (60 * 60) / 60).round 
    hours = (d % (60 * 60 * 24) / (60 * 60)).round
    days = (d / (60 * 60 * 24)).round
    weeks = (days / 7).round
    months = (weeks / 4).round
    m.edit "Pozostało #{days} dni, #{hours} godzin, #{minutes} minut i #{seconds} sekund! :tada:
To około: #{weeks} tygodni, bądź #{months} miesięcy!"
    sleep 60
end

bot.run