/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2867589264")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_72930587",
    "hidden": false,
    "id": "relation3157925092",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_log_ia",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2867589264")

  // remove field
  collection.fields.removeById("relation3157925092")

  return app.save(collection)
})
