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
        "id": "json3257917790",
        "maxSize": 1,
        "name": "total",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_2012512149",
    "indexes": [],
    "listRule": null,
    "name": "Commandes_totaux",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n  Lignes_commande.id_commandes as id, \n  \n  SUM(Modeles.prix * Lignes_commande.quantite) AS total\nFROM Lignes_commande\nLEFT JOIN Creations ON Creations.id = Lignes_commande.id_creation\nLEFT JOIN Modeles ON Modeles.id = Creations.id_modele\nGROUP BY\n  Lignes_commande.id_commandes",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2012512149");

  return app.delete(collection);
})
