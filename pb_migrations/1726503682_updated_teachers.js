/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  // remove
  collection.schema.removeField("kmu5rynd")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kmu5rynd",
    "name": "timezone",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vgw6dsbejt89j6g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
