/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ygpldchq",
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
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  // remove
  collection.schema.removeField("ygpldchq")

  return dao.saveCollection(collection)
})
