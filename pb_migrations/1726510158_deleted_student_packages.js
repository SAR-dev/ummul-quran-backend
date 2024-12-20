/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8j31blv3ox7cipm");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "8j31blv3ox7cipm",
    "created": "2024-09-11 16:11:04.055Z",
    "updated": "2024-09-15 12:02:27.758Z",
    "name": "student_packages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "t81ghcbs",
        "name": "student",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "lu1b72i3623tjbd",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "pp4wtxks",
        "name": "monthly_package",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "w962q8thgapm7e2",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "gjfndzju",
        "name": "price",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ndLufcV` ON `student_packages` (`student`)"
    ],
    "listRule": "@request.auth.id != \"\"",
    "viewRule": "@request.auth.id != \"\"",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
