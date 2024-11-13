/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w962q8thgapm7e2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f6htqsoe",
    "name": "class_mins",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w962q8thgapm7e2")

  // remove
  collection.schema.removeField("f6htqsoe")

  return dao.saveCollection(collection)
})
