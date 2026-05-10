Code requirements:
- **4+ scenes based on `AdventureScene`**:
    - Kitchen1Scene
    - Kitchen2Scene
    - FridgeScene
    - BedroomScnene
- **2+ scenes *not* based on `AdventureScene`**:
    - StartScene
    - WinScene
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - SetupObjectAction(gameObejct, action)
        - Takes an object an an action (taken from scene json files) and sets up all the
        things it needs to run
    - checkStatusItemsAndFlags(gameObject, action)
        - Checks object status, flags, and player items, called by SetupObjectAction to 
        ensure the action only happens when the requirements are met

Experience requirements:
- **4+ locations in the game world**:
    - Kitchen1Scene
    - Kitchen2Scene
    - FridgeScene
    - BedroomScnene
- **2+ interactive objects in most scenes**:
    - plenty of objects in every scene
- **Many objects have `pointerover` messages**: unsatisfied (describe two examples)
    - basically every object has pointer over stuff
- **Many objects have `pointerdown` effects**: unsatisfied (describe two examples)
    - All cooking related objects have pointerdown stuff for pickup, opening cabinets, etc
- **Some objects are themselves animated**: unsatisfied (describe two examples)
    - Objects can swap states to reflect player changes, ie the beef cooking, or a plate being taken

- Asset sources:
    - All image assets (sprites, cursors, etc) made by me without reference
        - made in Pixelorma: https://pixelorama.org
    - Audio:
        * background music by davo32: https://freesound.org/people/davo32/sounds/628445/
        * win sound effect made by EVRetro: https://freesound.org/people/EVRetro/sounds/535840/






You can play the game at: 

Requirements:
    - Player inputs:
        * different player inputs include clicking to place dominoes, interacting with the start domino to knock it over, and interacting with menu buttons
    - 3+ physics based gameplay scenes:
        * game features three physics based levels, with increasing difficulty
        * physics scenes also have a base dominoScene class, that does some setup for them
    - Other scenes:
        * game also includes a start scene, and a scene between levels that shows player stats for the previous level

Asset sources:
    - All image assets made by me without reference
        * made in Pixelorma: https://pixelorama.org
    - Audio:
        * background music made by Seth_Makes_Sounds: https://freesound.org/people/Seth_Makes_Sounds/sounds/683835/
        * victory music made by sonically_sound: https://freesound.org/people/sonically_sound/sounds/625715/ 

