/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xnzvVqK` ON `teachers` (`whatsapp_no`)",
    "CREATE UNIQUE INDEX `idx_rShLrFG` ON `teachers` (`user`)"
  ]

  // remove
  collection.schema.removeField("osz2aqxw")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xnzvVqK` ON `teachers` (`whatsapp_no`)",
    "CREATE UNIQUE INDEX `idx_GiM8Rkp` ON `teachers` (`name`)",
    "CREATE UNIQUE INDEX `idx_rShLrFG` ON `teachers` (`user`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "osz2aqxw",
    "name": "name",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
