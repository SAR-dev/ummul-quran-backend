/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  // remove
  collection.schema.removeField("gsu7r0g7")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsu7r0g7",
    "name": "paid",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
