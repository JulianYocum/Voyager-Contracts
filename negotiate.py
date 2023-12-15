from voyager.negotiation import Negotiation, Negotiator

scenario_description = """There is a chest nearby which contains a stone pickaxe (can mine iron ore) and iron pickaxe (can mine iron ore and diamonds). There are separate mounds of iron and diamond ore nearby with an unknown number of each."""

task1 = "Maximize points where 'iron ore' is worth 3 and 'diamond ore' is worth 5. Points are calculated at the end of the game by resources in the player inventory."
task2 = "Maximize points where 'iron ore' is worth 4 and 'diamond ore' is worth 4. Points are calculated at the end of the game by resources in player inventory."

agent1 = Negotiator(name="Alice", task=task1, other_name="Bob", other_task=task2, scenario=scenario_description, model="gpt-4-0613")
agent2 = Negotiator(name="Bob", task=task2, other_name="Alice", other_task=task1, scenario=scenario_description, model="gpt-4-0613")

conversation = Negotiation(agent1, agent2, max_turns=6)
conversation.simulate()