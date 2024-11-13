/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vgw6dsbejt89j6g",
    "created": "2024-09-14 20:01:13.329Z",
    "updated": "2024-09-14 20:01:13.329Z",
    "name": "timezones",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6ierxhwv",
        "name": "offset",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "6nyuz25c",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("vgw6dsbejt89j6g");

  return dao.deleteCollection(collection);
})
