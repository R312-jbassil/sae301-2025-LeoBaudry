/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2716722970")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select1542800728",
    "maxSelect": 3,
    "name": "type_cible",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Verres",
      "Monture",
      "Branches"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2716722970")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "select1542800728",
    "maxSelect": 3,
    "name": "field",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Verres",
      "Monture",
      "Branches"
    ]
  }))

  return app.save(collection)
})
