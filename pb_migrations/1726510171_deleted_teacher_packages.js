/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tzxkadjhujtd93d");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "tzxkadjhujtd93d",
    "created": "2024-09-11 16:12:56.929Z",
    "updated": "2024-09-15 12:02:44.035Z",
    "name": "teacher_packages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wa71i5qe",
        "name": "teacher",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "fm11wkmen3ececj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "8ncit6h8",
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
        "id": "ckk0z0rc",
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
      "CREATE UNIQUE INDEX `idx_eMXWdFA` ON `teacher_packages` (\n  `teacher`,\n  `monthly_package`\n)"
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
