async function collectAndPlantSeeds(bot) {
  // Check if there are seeds in the inventory
  const seeds = bot.inventory.items().find(item => item.name === 'wheat_seeds');
  if (!seeds) {
    // Collect seeds from the chest
    await getItemFromChest(bot, new Vec3(5, -62, -10), {
      "wheat_seeds": 1
    });
    bot.chat("Seeds collected");
  } else {
    // Find a farmland block and go to it
    const farmland = bot.findBlock({
      matching: mcData.blocksByName.farmland.id,
      maxDistance: 32
    });
    if (!farmland) {
      bot.chat("No farmland found");
      return;
    }
    await bot.pathfinder.goto(new GoalGetToBlock(farmland.position.x, farmland.position.y, farmland.position.z));
    bot.chat("Arrived at farmland");

    // Equip the seeds
    await bot.equip(seeds, 'hand');

    // Look at the farmland block
    await bot.lookAt(farmland.position.offset(0, 1, 0));

    // Use the seeds to plant them
    await bot.activateBlock(farmland);
    bot.chat("Seeds planted");
  }
}