/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1675504367")

  // update collection data
  unmarshal({
    "name": "lignes_commande"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1675504367")

  // update collection data
  unmarshal({
    "name": "Contenir"
  }, collection)

  return app.save(collection)
})
