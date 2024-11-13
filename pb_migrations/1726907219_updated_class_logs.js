/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zf6hhxeq",
    "name": "started",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  // remove
  collection.schema.removeField("zf6hhxeq")

  return dao.saveCollection(collection)
})
