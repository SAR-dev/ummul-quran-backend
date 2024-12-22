/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "puhklr8i",
    "name": "invoice",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "929km9pp8hqphu3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  // remove
  collection.schema.removeField("puhklr8i")

  return dao.saveCollection(collection)
})
