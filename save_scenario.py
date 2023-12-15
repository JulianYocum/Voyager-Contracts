import argparse
from voyager import MultiAgentVoyager

# Argument parser
parser = argparse.ArgumentParser(description='Running Voyager with different sets of parameters.')
parser.add_argument('--port', type=int, default=49172, help='MC port number (default: 49172)')
# parser.add_argument('--server_port', type=int, default=3000, help='Server port number (default: 3000)')
args = parser.parse_args()

# You can also use mc_port instead of azure_login, but azure_login is highly recommended
azure_login = {
    "client_id": "d0f74e80-fffc-4ace-8361-7e4f0b21fc5c",
    "redirect_url": "https://127.0.0.1/auth-response",
    "secret_value": "[OPTIONAL] YOUR_SECRET_VALUE",
    "version": "fabric-loader-0.14.18-1.20.1", # the version Voyager is tested on
}

mc_port = args.port
openai_api_key = "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"
options = {
    'azure_login':  None,
    'mc_port': mc_port,
    'openai_api_key': openai_api_key,
    # skill_library_dir=skill_library_dir, # Load a learned skill library.
    # ckpt_dir: ckpt_dir, # Feel free to use a new dir. Do not use the same dir as skill library because new events will still be recorded to ckpt_dir. 
    'resume':False, # Do not resume from a skill library because this is not learning.
    'env_wait_ticks':80,
    # 'env_request_timeout': 600,
    'action_agent_task_max_retries':50,
    'action_agent_show_chat_log':True,
    'action_agent_temperature':0.1,
}

multi_agent = MultiAgentVoyager(options=options)

# save_options = {
#     'file_name' : "cleanup3.json",
#     'scenario_block_types' : ["wet_sponge", "sweet_berry_bush"],
#     'center_position' : {'x':342, 'y': 119, 'z': 107},
#     'remove_blocks' : False
# }
save_options = {
    'file_name' : "temp.json",
    'scenario_block_types' : ["slime_block", "red_mushroom_block", "mushroom_stem"],
    'center_position' : {"x": 333, "y": 119, "z": 123},
    'remove_blocks' : True
}
multi_agent.save_scenario(save_options)
# multi_agent.load_scenario()