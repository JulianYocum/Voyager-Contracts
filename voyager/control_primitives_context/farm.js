// Equip the hoe, and till all grass blocks within half of x >= 0
async function tillBlocksInHalf(bot) {
  // Check if the bot has a hoe in its inventory
  var hoe = bot.inventory.items().find(item => item.name.includes('hoe'));
  if (!hoe) {
    bot.chat("No hoe in inventory.");
    return;
  }

  // Equip the hoe
  await bot.equip(hoe, 'hand');

  // Find all the blocks that are either grass or dirt within a maximum distance of 32
  const blocks = bot.findBlocks({
    matching: block => {
      return block && (block.name === 'grass_block' || block.name === 'dirt');
    },
    maxDistance: 32,
    count: 1000
  });

  // Filter out the blocks that are not in the positive x half of map
  const filteredBlocks = blocks.filter(position => position.x >= 0);

  // For each block in the filtered list, move to the block, look at it, and till it
  for (const position of filteredBlocks) {
    await bot.pathfinder.goto(new GoalGetToBlock(position.x, position.y, position.z));
    await bot.lookAt(position.offset(0, 1, 0));
    await bot.activateBlock(bot.blockAt(position));
  }
  bot.chat("All grass and dirt blocks within the bottom right quadrant of the map have been tilled.");
}


// Check you have seeds, then find farmland which isn't already occupied with wheat, and then plant wheat seeds
async function plantWheatSeeds(bot) {
  // Find all farmland blocks within a maximum distance of 32
  const blocks = bot.findBlocks({
    matching: block => {
      return block && block.name === 'farmland';
    },
    maxDistance: 32,
    count: 1000
  });

  // Check if the bot has wheat seeds in its inventory
  var seeds = bot.inventory.items().find(item => item.name === 'wheat_seeds');
  if (!seeds) {
    bot.chat("No wheat seeds in inventory.");
    return;
  }

  // For each block in the filtered list, move to the block, equip the seeds, and plant them
  for (const position of blocks) {
    const blockAbove = bot.blockAt(position.offset(0, 1, 0));
    if (blockAbove.name !== 'wheat') {
      await bot.pathfinder.goto(new GoalGetToBlock(position.x, position.y, position.z));
      await bot.equip(seeds, 'hand');
      await bot.activateBlock(bot.blockAt(position));
    }
  }
  bot.chat("All available farmland within the specified quadrant of the map has been planted with wheat seeds.");
}


// collect all nearby wheat. important: you must use bot.dig, not bot.activateBlock, to collect wheat
async function collectWheat(bot) {
  while (true) {
    // Find all wheat blocks within a maximum distance of 32
    const blocks = bot.findBlocks({
      matching: block => {
        return block && block.name === 'wheat';
      },
      maxDistance: 32,
      count: 1000
    });

    // If no more wheat blocks are found within the specified quadrant, report the completion of the task
    if (filteredBlocks.length === 0) {
      bot.chat("All wheat within the specified quadrant of the map has been collected.");
      break;
    }

    // For each block in the filtered list, move to the block, look at it, and dig it
    for (const position of filteredBlocks) {
      await bot.pathfinder.goto(new GoalGetToBlock(position.x, position.y, position.z));
      await bot.lookAt(position.offset(0, 1, 0));
      await bot.dig(bot.blockAt(position));
    }
  }
}