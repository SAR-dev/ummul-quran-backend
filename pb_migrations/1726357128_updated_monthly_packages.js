/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w962q8thgapm7e2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qmyrefg6",
    "name": "memo",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w962q8thgapm7e2")

  // remove
  collection.schema.removeField("qmyrefg6")

  return dao.saveCollection(collection)
})
