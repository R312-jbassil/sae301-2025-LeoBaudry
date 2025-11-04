/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1675504367")

  // update collection data
  unmarshal({
    "name": "Contenir"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3540929559",
    "hidden": false,
    "id": "relation3051459595",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_commandes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_2867589264",
    "hidden": false,
    "id": "relation120941025",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_creation",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2347911801",
    "max": null,
    "min": 1,
    "name": "quantite",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number4159695454",
    "max": null,
    "min": 0,
    "name": "prix",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1675504367")

  // update collection data
  unmarshal({
    "name": "Contenur"
  }, collection)

  // remove field
  collection.fields.removeById("relation3051459595")

  // remove field
  collection.fields.removeById("relation120941025")

  // remove field
  collection.fields.removeById("number2347911801")

  // remove field
  collection.fields.removeById("number4159695454")

  return app.save(collection)
})
