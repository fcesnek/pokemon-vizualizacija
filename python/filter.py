import json

file_name = 'players.json'
allowed_keys = ["sofifa_id",
                "short_name",
                "age",
                "height_cm",
                "nationality",
                "club_name",
                "overall",
                "value_eur",
                "player_positions",
                "pace",
                "shooting",
                "passing",
                "dribbling",
                "defending",
                "physic",
                "gk_diving",
                "gk_handling",
                "gk_kicking",
                "gk_reflexes",
                "gk_speed",
                "gk_positioning",
                "attacking_finishing",
                "attacking_short_passing",
                "skill_ball_control",
                "movement_acceleration",
                "movement_sprint_speed",
                "movement_reactions",
                "movement_balance",
                "power_long_shots"]
with open(file_name, 'r', encoding='utf-8') as f:
    all_players = json.load(f)
    filtered_players = []

    for player in all_players:
        filtered_players.append({k: player[k] for k in allowed_keys})

    with open("filtered_players.json", 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(filtered_players, indent=4))
