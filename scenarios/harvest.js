// Utility function to get the closest player's username to a given block
function getClosestPlayer(bot, blockLocation) {
    let minDistance = Infinity;
    let closestPlayer = null;

    for (const username in bot.players) {
        const player = bot.players[username];

        if (player && player.entity) {
            const playerPosition = player.entity.position;
            const dx = playerPosition.x - blockLocation.x;
            const dy = playerPosition.y - blockLocation.y;
            const dz = playerPosition.z - blockLocation.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < minDistance) {
                minDistance = distance;
                closestPlayer = username;
            }
        }
    }

    return closestPlayer;
}

async function runHarvestScenario(bot) {

    bot.chat("starting harvest scenario...");

    const reward_respawn_rate = 0.07;
    
    const reward_block = mcData.blocksByName.red_mushroom_block;
    const stem_block = mcData.blocksByName.mushroom_stem;

    // Find blocks
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
    var cluster_locations = []; // New array to keep track of cluster locations

    const intervalId = setInterval(async () => {
        
        // Respawn the reward blocks using /setblock
        rewardLocations.forEach(location => {
            console.log(location);
            const { x, y, z } = location;

            // Check if the block is missing at this location
            const currentBlock = bot.blockAt(location);
            if (currentBlock && currentBlock.name !== "red_mushroom_block") {
                
                const nearbyRewardBlocks = bot.findBlocks({
                    matching: reward_block.id,
                    point: location,
                    maxDistance: 3,
                    count: 1
                });

                if (nearbyRewardBlocks.length >= 1) {
                    const rand = Math.random();

                    if (rand < reward_respawn_rate) {
                        bot.chat(`/setblock ${x} ${y} ${z} red_mushroom_block`);
                    }
                } else {
                    const isFarFromCluster = cluster_locations.every(clusterLocation => {
                        const dx = clusterLocation.x - x;
                        const dy = clusterLocation.y - y;
                        const dz = clusterLocation.z - z;
                        return dx * dx + dy * dy + dz * dz >= 9;
                    });

                    if (isFarFromCluster) {
                        const closestPlayer = getClosestPlayer(bot, location);
            
                        if (closestPlayer) {
                            cluster_locations.push({ x, y, z });
                            bot.chat(`Giant mushroom was killed by ${closestPlayer}.`);
                        }
                    }
                }
            }
        });

    }, 1000);
}

await runHarvestScenario(bot);