/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jvnlkzozsz56h5i",
    "created": "2024-09-24 15:34:18.829Z",
    "updated": "2024-09-24 15:34:18.829Z",
    "name": "teacher_invoices",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h34su69m",
        "name": "teacher",
        "type": "relation",
        "required": true,
        "presentable": true,
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
        "id": "uek1gpet",
        "name": "year",
        "type": "number",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "dk3pwirx",
        "name": "month",
        "type": "number",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 12,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_X4iJAR0` ON `teacher_invoices` (\n  `teacher`,\n  `year`,\n  `month`\n)"
    ],
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
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i");

  return dao.deleteCollection(collection);
})
