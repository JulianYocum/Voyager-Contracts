async function collectDiamondHoeFromChest(bot) {
  // The chest position is not given, so we need to find it first
  const chest = bot.findBlock({
    matching: mcData.blocksByName.chest.id,
    maxDistance: 32
  });
  if (!chest) {
    bot.chat("No chest found");
    return;
  }
  // Get the diamond hoe from the chest
  await getItemFromChest(bot, chest.position, {
    "diamond_hoe": 1
  });
  bot.chat("Diamond hoe collected");
}