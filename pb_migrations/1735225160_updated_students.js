/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eas3mxvd",
    "name": "mobile_no",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{6,13}$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lu1b72i3623tjbd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eas3mxvd",
    "name": "mobile_no",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  return dao.saveCollection(collection)
})
