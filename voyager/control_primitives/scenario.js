async function replaceMinedBlock(bot, name, position, facing = null) {
    await bot.chat("/gamerule doTileDrops false");

    for (let i = 0; i < name.length; i++) {
        await replaceMinedBlockSingle(bot, name[i], position[i], facing);
    }

    await bot.chat("/gamerule doTileDrops true");

    async function replaceMinedBlockSingle(bot, name, position, facing = null) {
        const x = Math.floor(position.x);
        const y = Math.floor(position.y);
        const z = Math.floor(position.z);

        if (name === "chest" && facing) {
            await bot.chat(`/setblock ${x} ${y} ${z} ${name}[facing=${facing}]`);
        } else {
            await bot.chat(`/setblock ${x} ${y} ${z} ${name}`);
        }
        
        await bot.waitForTicks(1);
    }
}


async function getBlockPositions(bot, name, position) {

    const centerPoint = new Vec3(position.x, position.y, position.z);

    for (let i = 0; i < name.length; i++) {
        await replaceMinedBlockSingle(bot, name[i]);
    }

    async function replaceMinedBlockSingle(bot, name) {
        // return if name is not string
        if (typeof name !== "string") {
            throw new Error(`name for mineBlock must be a string`);
        }
        const blockByName = mcData.blocksByName[name];
        if (!blockByName) {
            throw new Error(`No block named ${name}`);
        }
        const blocks = bot.findBlocks({
            point: centerPoint,
            matching: blockByName.id,
            maxDistance: 32,
            count: 1024,
        });

        // Split blocks into chunkSize chunks and send them to chat
        const chunkSize = 12;
        for (let i = 0; i < blocks.length; i += chunkSize) {
            const chunk = blocks.slice(i, i + chunkSize);
            await bot.chat(`${name}: ${chunk}`);
        }
        // await bot.chat(`${name}: ${blocks}`)

        // for (let i = 0; i < blocks.length; i++) {
        //     const target = bot.blockAt(blocks[i]);
        //     await bot.chat(`Found ${name} at ${target.position}`);
        // }
    }
}

async function clearBlocks(bot, name, position) {

    const centerPoint = new Vec3(position.x, position.y, position.z);

    for (let i = 0; i < name.length; i++) {
        await replaceMinedBlockSingle(bot, name[i]);
    }

    async function replaceMinedBlockSingle(bot, name) {
        // return if name is not string
        if (typeof name !== "string") {
            throw new Error(`name for mineBlock must be a string`);
        }
        const blockByName = mcData.blocksByName[name];
        if (!blockByName) {
            throw new Error(`No block named ${name}`);
        }

        const blocks = bot.findBlocks({
            point: centerPoint,
            matching: blockByName.id,
            maxDistance: 64, // 32 (max distance for findBlocks) + 16 (buffer)
            count: 1024,
        });

        // await bot.chat(`${name}: ${blocks}`)
        // await bot.chat(`Destroying ${blocks.length} ${name}...`);

        for (let i = 0; i < blocks.length; i++) {
            const target = bot.blockAt(blocks[i]);
            await bot.chat(`/setblock ${target.position.x} ${target.position.y} ${target.position.z} air`);
        }
    }
}

const fs = require('fs');
const path = require('path');

async function saveRewards(bot, rewardNames, save_dir) {
    setInterval(() => {
        const items = bot.inventory.items();
        
        // Iterate over each rewardName in rewardNames
        rewardNames.forEach(rewardName => {
            let rewardCount = 0;
            
            items.forEach((item) => {
                if (item.name === rewardName) {
                    rewardCount += item.count;
                }
            });
            
            const botName = bot.username; // Get the bot's username
            // Modify the fileName to include the rewardName as well
            const fileName = path.join(save_dir, `${botName}_${rewardName}_reward.txt`);
            
            // Write the count to a file
            fs.writeFile(fileName, `${rewardCount}\n`, { flag: 'a' }, err => {
                if (err) console.error('Error writing to file:', err);
            });
        });
    }, 1000);
}