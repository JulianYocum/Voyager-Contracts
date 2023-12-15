async function collectAndPlantSeedsOnUnoccupiedFarmland(bot) {
  // Find the chest
  const chest = bot.findBlock({
    matching: mcData.blocksByName.chest.id,
    maxDistance: 32
  });
  if (!chest) {
    bot.chat("No chest found");
    return;
  }
  // Get the seeds from the chest
  await getItemFromChest(bot, chest.position, {
    "wheat_seeds": 10
  });
  bot.chat("Seeds collected");

  // Find 20 farmland blocks that aren't occupied by seeds already
  const farmlands = bot.findBlocks({
    matching: mcData.blocksByName.farmland.id,
    maxDistance: 32,
    count: 20
  }).filter(farmland => {
    const blockAbove = bot.blockAt(farmland.offset(0, 1, 0));
    return !(blockAbove && blockAbove.name === 'wheat');
  });
  if (farmlands.length < 10) {
    bot.chat("Not enough unoccupied farmland found");
    return;
  }

  // Equip the seeds
  const seeds = bot.inventory.items().find(item => item.name === 'wheat_seeds');
  await bot.equip(seeds, 'hand');

  // Plant seeds on each unoccupied farmland
  for (let i = 0; i < 10; i++) {
    const farmland = farmlands[i];
    // Go to the farmland block
    await bot.pathfinder.goto(new GoalGetToBlock(farmland.x, farmland.y, farmland.z));
    bot.chat("Arrived at farmland");

    // Look at the farmland block
    await bot.lookAt(farmland.offset(0, 1, 0));

    // Use the seeds to plant them
    await bot.activateBlock(bot.blockAt(farmland));
    bot.chat("Seeds planted");
  }
}