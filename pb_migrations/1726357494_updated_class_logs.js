/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6hnoxdml",
    "name": "monthly_package",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "w962q8thgapm7e2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // remove
  collection.schema.removeField("6hnoxdml")

  return dao.saveCollection(collection)
})
