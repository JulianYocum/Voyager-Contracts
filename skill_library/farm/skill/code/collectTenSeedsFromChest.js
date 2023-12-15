async function collectTenSeedsFromChest(bot) {
  // Find the chest
  const chest = bot.findBlock({
    matching: mcData.blocksByName.chest.id,
    maxDistance: 32
  });
  if (!chest) {
    bot.chat("No chest found");
    return;
  }
  // Get 10 seeds from the chest
  await getItemFromChest(bot, chest.position, {
    "wheat_seeds": 10
  });
  bot.chat("10 seeds collected");
}