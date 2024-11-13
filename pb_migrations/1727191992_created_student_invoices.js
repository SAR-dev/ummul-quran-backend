/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qcfeo7fgy5w8qwl",
    "created": "2024-09-24 15:33:12.875Z",
    "updated": "2024-09-24 15:33:12.875Z",
    "name": "student_invoices",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mvoz9gv4",
        "name": "student",
        "type": "relation",
        "required": true,
        "presentable": true,
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
        "id": "6bzpknx7",
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
        "id": "chnx4iia",
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
      "CREATE UNIQUE INDEX `idx_xZuOrSB` ON `student_invoices` (\n  `student`,\n  `year`,\n  `month`\n)"
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
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl");

  return dao.deleteCollection(collection);
})
