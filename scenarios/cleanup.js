const fs = require('fs');

async function runCleanupScenario(bot) {

    bot.chat("starting cleanup scenario...");

    const waste_cutoff = 7;
    const reward_respawn_rate = 0.05;
    const waste_respawn_rate = 0.05;
    const dirty_tick_speed = 0;
    const clean_tick_speed = 100;

    const reward_block = mcData.blocksByName.red_mushroom_block;
    const stem_block = mcData.blocksByName.mushroom_stem;
    const waste_block = mcData.blocksByName.slime_block;

    // Set the tick speed to high to grow berries
    // bot.chat(`/gamerule randomTickSpeed 40000`);
    // await bot.waitForTicks(60);
    // bot.chat(`/gamerule randomTickSpeed ${dirty_tick_speed}`);
  
    // Find the waste and reward blocks
    const wasteLocations = bot.findBlocks({
        matching: waste_block.id,
        maxDistance: 32,
        count: 100
    });
    const rewardLocations = bot.findBlocks({
        matching: reward_block.id,
        maxDistance: 32,
        count: 100
    });
    const stemLocations = bot.findBlocks({
        matching: stem_block.id,
        maxDistance: 32,
        count: 100
    });

    var clean = false;

    const intervalId = setInterval(async () => {

        // Check if there are less than cutoff waste blocks
        if (bot.findBlocks({
            matching: waste_block.id,
            maxDistance: 32,
            count: 100
        }).length <= waste_cutoff) {

            if (!clean) {
                // Set the tick speed to high to grow berries
                bot.chat("The river is clean!");
                // bot.chat(`/gamerule randomTickSpeed ${clean_tick_speed}`);
                clean = true;
            }
        
            // Respawn the reward blocks using /setblock
            rewardLocations.forEach(location => {
                const { x, y, z } = location;

                // Check if the block is missing at this location
                const currentBlock = bot.blockAt(location);
                if (currentBlock && currentBlock.name !== "red_mushroom_block") {
                
                    // Generate a random number between 0 and 1
                    const rand = Math.random();

                    // Respawn the block with probability
                    if (rand < reward_respawn_rate) {
                        bot.chat(`/setblock ${x} ${y} ${z} red_mushroom_block`);
                    }
                }
            });
        }
        else {
            if (clean) {
                // Set the tick speed to low to stop berries
                bot.chat("The river is too dirty!");
                // bot.chat(`/gamerule randomTickSpeed ${dirty_tick_speed}`);
                clean = false;
            }
        }

        // Respawn the waste blocks using /setblock
        wasteLocations.forEach(location => {
            const { x, y, z } = location;
            
            // Generate a random number between 0 and 1
            const rand = Math.random();

            // Respawn the block with probability
            if (rand < waste_respawn_rate) {
                bot.chat(`/setblock ${x} ${y} ${z} slime_block`);
            }
        });
        // stemLocations.forEach(location => {
        //     const { x, y, z } = location;
            
        //     // Generate a random number between 0 and 1
        //     const rand = Math.random();

        //     // Respawn the block with probability
        //     if (rand < reward_respawn_rate) {
        //         bot.chat(`/setblock ${x} ${y} ${z} mushroom_stem`);
        //     }
        // });
    }, 1000);
}
await runCleanupScenario(bot);