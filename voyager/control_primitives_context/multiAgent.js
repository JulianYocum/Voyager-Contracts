// send a message to another player indicating that the bot has finished its turn
async function sendSignal(bot) {
  bot.chat("[player signal]")
}

// Example usage:
// Suppose you want to alterate task1 and task2 with another player
async function task1() {
  console.log("Starting task1...");
  await new Promise(r => setTimeout(r, 5000)); // Simulate a 5 second task
  sendSignal(bot);
}
async function task2() {
  console.log("Starting task2...");
  await new Promise(r => setTimeout(r, 5000)); // Simulate a 5 second task
  sendSignal(bot);
}
// Player 1 code
async function player1() {
  await waitSignal(bot, task1);
  await waitSignal(bot, task2);
// Player 2 code
async function player2() {
  await waitSignal(bot, task2);
  await waitSignal(bot, task1);
}