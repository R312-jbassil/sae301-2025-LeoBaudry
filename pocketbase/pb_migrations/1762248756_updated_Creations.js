/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2867589264")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3265544445",
    "max": 150,
    "min": 0,
    "name": "nom_creation",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text54863248",
    "max": 10000,
    "min": 0,
    "name": "svg",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation112446027",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_541086270",
    "hidden": false,
    "id": "relation909455541",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_modele",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2867589264")

  // remove field
  collection.fields.removeById("text3265544445")

  // remove field
  collection.fields.removeById("text54863248")

  // remove field
  collection.fields.removeById("relation112446027")

  // remove field
  collection.fields.removeById("relation909455541")

  return app.save(collection)
})
