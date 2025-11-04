/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3540929559")

  // remove field
  collection.fields.removeById("number2397497392")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3540929559")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2397497392",
    "max": null,
    "min": 0,
    "name": "montant_total",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
