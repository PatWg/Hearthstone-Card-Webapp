# Hearthstone API

## Description

This node.js application is used to serve as the API between our Android application and the
MySQL database that contains all the information about the very first set of cards used in Standard mode.

The application is hosted here: https://boiling-shelf-89461.herokuapp.com/

## Endpoints

There are only one endpoint in this application:

- GET `/Cards`: which outputs a JSON array with all the cards in the database;
- POST `/Cards`: which outputs a JSON array with the cards in the database in
  compliance with the potential HTTP parameters.

The parameters can be for:

- `playerClass`, which is a String array;
- `cost`, which is a String;
- `name`, which is a String that search in the card name and description.

## Examples

The following cURL commands should work:

```
curl -X POST -d '{"playerClass":["Druid"], "cost":"7+"}' -H "Content-type:application/json" https://boiling-shelf-89461.herokuapp.com/Cards

curl -X POST -d '{"playerClass":["Druid", "Rogue"], "cost":"0"}' -H "Content-type:application/json" https://boiling-shelf-89461.herokuapp.com/Cards

curl -X POST -d '{"search": "Ancestral"}' -H "Content-type:application/json" https://boiling-shelf-89461.herokuapp.com/Cards
```
