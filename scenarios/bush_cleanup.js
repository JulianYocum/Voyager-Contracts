async function runCleanupScenario(bot) {

    bot.chat("Starting Cleanup scenario...");

    const waste_cutoff = 4;
    // const reward_respawn_rate = 0.15;
    const waste_respawn_rate = 0; //0.05;
    const dirty_tick_speed = 0;
    const clean_tick_speed = 100;

    const reward_block = mcData.blocksByName.sweet_berry_bush;
    const waste_block = mcData.blocksByName.wet_sponge;

    // Set the tick speed to high to grow berries
    bot.chat(`/gamerule randomTickSpeed 40000`);
    await bot.waitForTicks(60);
    bot.chat(`/gamerule randomTickSpeed ${dirty_tick_speed}`);
  
    // Find the waste and reward blocks
    const wasteBlocks = bot.findBlocks({
        matching: waste_block.id,
        maxDistance: 32,
        count: 100
    });
    const rewardBlocks = bot.findBlocks({
        matching: reward_block.id,
        maxDistance: 32,
        count: 100
    });

    // Save the locations of these blocks
    const wasteLocations = wasteBlocks.map(block => block);
    const rewardLocations = rewardBlocks.map(block => block);

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
                bot.chat(`/gamerule randomTickSpeed ${clean_tick_speed}`);
                clean = true;
            }

            
        
            // Respawn the reward blocks using /setblock
            // rewardLocations.forEach(location => {
            //     const { x, y, z } = location;

            //     // Check if the block is missing at this location
            //     const currentBlock = bot.blockAt(location);
            //     if (currentBlock && currentBlock.name !== 'sweet_berry_bush') {
                
            //         // Generate a random number between 0 and 1
            //         const rand = Math.random();

            //         // Respawn the block with probability
            //         if (rand < reward_respawn_rate) {
            //             bot.chat(`/setblock ${x} ${y} ${z} sweet_berry_bush`);
            //         }
            //     }
            // });
        }
        else {
            if (clean) {
                // Set the tick speed to low to stop berries
                bot.chat("The river is too dirty!");
                bot.chat(`/gamerule randomTickSpeed ${dirty_tick_speed}`);
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
                bot.chat(`/setblock ${x} ${y} ${z} wet_sponge`);
            }
        });
    }, 1000);
}

await runCleanupScenario(bot);


// async function maximizeEmeralds(bot) {
//     // set to survival mode
//     bot.chat("/gamemode survival");

//     while (true) {
//       // Find a sweet berry bush and collect berries from it
//       const berryBush = bot.findBlock({
//         matching: mcData.blocksByName.sweet_berry_bush.id,
//         maxDistance: 32
//       });
//       if (berryBush) {
//         // goto near the berry bush
//         bot.pathfinder.setGoal(new GoalNear(berryBush.position, 1), true);
//         await bot.activateBlock(berryBush);
//         bot.chat(`Activated berry bush ${berryBush.position}.`);
//         const berries = bot.nearestEntity(entity => entity.type === 'object' && entity.itemId === mcData.itemsByName.sweet_berries.id);
//         if (berries) {
//           bot.chat('berries found');
//           await bot.collectBlock.collect(berries.position);
//           bot.chat("Collected sweet berries.");
//         }
//       }
//     }
//   }

//   await maximizeEmeralds(bot);