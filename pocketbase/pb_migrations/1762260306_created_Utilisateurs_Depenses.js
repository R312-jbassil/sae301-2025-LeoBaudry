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
        "exceptDomains": null,
        "hidden": false,
        "id": "_clone_8SuU",
        "name": "email",
        "onlyDomains": null,
        "presentable": false,
        "required": true,
        "system": true,
        "type": "email"
      },
      {
        "hidden": false,
        "id": "json3222877733",
        "maxSize": 1,
        "name": "total_depense",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_2455603458",
    "indexes": [],
    "listRule": null,
    "name": "Utilisateurs_Depenses",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n    Commandes.id_user as id,\n    \n    users.email,\n    SUM(Sous_Requete_Totaux.total) as total_depense\nFROM Commandes\nLEFT JOIN users ON users.id = Commandes.id_user\n\nLEFT JOIN (\n    SELECT\n        Lignes_commande.id_commandes as id, \n        SUM(Modeles.prix * Lignes_commande.quantite) AS total\n    FROM Lignes_commande\n    LEFT JOIN Creations ON Creations.id = Lignes_commande.id_creation\n    LEFT JOIN Modeles ON Modeles.id = Creations.id_modele\n    GROUP BY\n        Lignes_commande.id_commandes\n) AS Sous_Requete_Totaux ON Sous_Requete_Totaux.id = Commandes.id\n\nGROUP BY\n    Commandes.id_user\nORDER BY\n    total_depense DESC",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2455603458");

  return app.delete(collection);
})
