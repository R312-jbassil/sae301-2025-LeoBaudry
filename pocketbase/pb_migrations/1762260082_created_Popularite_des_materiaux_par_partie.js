/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_cftM",
        "maxSelect": 1,
        "name": "partie_ciblee",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "Verres",
          "Branches",
          "Monture"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_NauN",
        "max": 0,
        "min": 0,
        "name": "libelle",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number4100715805",
        "max": null,
        "min": null,
        "name": "utilisations",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_2694906022",
    "indexes": [],
    "listRule": null,
    "name": "Popularite_des_materiaux_par_partie",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  (Materiau.id || '-' || Choisir.partie_ciblee) as id, \n  \n  Choisir.partie_ciblee,\n  Materiau.libelle,\n  COUNT(*) AS utilisations\nFROM Choisir\nLEFT JOIN Materiau ON Materiau.id = Choisir.id_materiau\nGROUP BY\n  Choisir.partie_ciblee, Materiau.id\nORDER BY\n  utilisations DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2694906022");

  return app.delete(collection);
})
