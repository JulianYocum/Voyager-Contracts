async function tillGrassNearWater(bot) {
  // Check if the bot has a hoe in its inventory
  var hoe = bot.inventory.items().find(item => item.name.includes('hoe'));
  if (!hoe) {
    // Collect a hoe from the chest
    await collectDiamondHoeFromChest(bot);
    hoe = bot.inventory.items().find(item => item.name.includes('hoe'));
    bot.chat("Hoe collected");
  }

  // Find a water source and go to a block next to it
  const water = bot.findBlock({
    matching: mcData.blocksByName.water.id,
    maxDistance: 32
  });
  if (!water) {
    bot.chat("No water source found");
    return;
  }
  await bot.pathfinder.goto(new GoalGetToBlock(water.position.x, water.position.y, water.position.z + 1));
  bot.chat("Arrived at water source");

  // Find a nearby grass block that is on the same level as the bot and go to a block next to it
  const grass = bot.findBlock({
    matching: mcData.blocksByName.grass_block.id,
    maxDistance: 32,
    position: bot.entity.position.offset(0, -1, 0) // The grass block should be on the same level as the bot
  });

  if (!grass) {
    bot.chat("No grass block found");
    return;
  }
  await bot.pathfinder.goto(new GoalGetToBlock(grass.position.x, grass.position.y, grass.position.z - 1));
  bot.chat("Arrived at grass block");

  // Equip the hoe
  await bot.equip(hoe, 'hand');

  // Look at the grass block
  await bot.lookAt(grass.position.offset(0, 1, 0));

  // Use the hoe to till the grass block
  await bot.activateBlock(grass);
  bot.chat("Grass block tilled");
}