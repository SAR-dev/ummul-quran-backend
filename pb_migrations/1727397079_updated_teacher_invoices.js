/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8o3ncf4d",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "SUCCESS",
        "ERROR"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  // remove
  collection.schema.removeField("8o3ncf4d")

  return dao.saveCollection(collection)
})
