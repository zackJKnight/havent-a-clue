# Translations
You provide the ENUM_NAMES to the API, and it will provide them back. (as JSON strings)

## Locations
```kotlin
BALLROOM("nuclear-power-plant")
BILLIARD_ROOM("simpson-house")
CONSERVATORY("retirement-castle")
DINING_ROOM("bowl-a-rama")
HALL("burns-manor")
KITCHEN("kwik-e-mart")
LOUNGE("krustylu-studios")
LIBRARY("frying-dutchman")
STUDY("androids-dungeon")
```

## Weapons
```kotlin
REVOLVER("slingshot")
DAGGER("saxophone")
LEAD_PIPE("donut")
ROPE("necklace")
CANDLESTICK("extend-o-glove")
WRENCH("plutonium-rod")
```

## Characters
```kotlin
PEACOCK("peacock")
MUSTARD("mustard")
GREEN("green")
PLUM("plum")
SCARLET("scarlet")
WHITE("white")
```

# Types
## Possibility
character: Any valid enum name from the characters above
location: Any valid enum name from the locations above
weapon: Any valid enum name from the weapons above

##

# API Endpoints
possibilities are essentially the current game state
## /newgame
Empty GET request
Response:
```json5
{
  // Contains ALL possibilities (start of game)
  possibilities: [ Possibiliy, Possibility, ... ],
}
```
## /locations
Request:
```json5
{
  possibilities: [ Possibiliy, Possibility, ... ],
}
```
Response:
```json5
{
  // Sorted by best option first
  locations: [
    {
      name: Location,
      eliminates: 8
    },
    {
      name: Location,
      eliminates: 8
    },
    {
      name: Location,
      eliminates: 5
    }
    // Locations cards that we (or someone else) has aren't listed.
    ...
  ]
}
```
## /eliminate
Request:
```json5
{
  possibilities: [ Possibiliy, Possibility, ... ],
  // 1 item eliminates a shown card, 2 eliminates w/AND, 3 eliminates that exact guess
  predicate: [ Weapon/Character/Location, Weapon/Character/Location, ... ]
}
```
Response:
```json5
{
  possibilities: [ Possibiliy, Possibility, ... ],
}
```
## /guess
Request:
```json5
{
  possibilities: [ Possibiliy, Possibility, ... ],
  // 1 item eliminates a shown card, 2 eliminates w/AND, 3 eliminates that exact guess
  currentLocation: Location
}
```
Response:
```json5
{
  character: Character,
  weapon: Weapon,
}
```
