/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rShLrFG` ON `teachers` (`user`)",
    "CREATE UNIQUE INDEX `idx_2sDRMhj` ON `teachers` (`mobile_no`)"
  ]

  // remove
  collection.schema.removeField("aias8jts")

  // remove
  collection.schema.removeField("xsnfoyjv")

  // remove
  collection.schema.removeField("cedklvrl")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0fynhuyn",
    "name": "mobile_no",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xnzvVqK` ON `teachers` (`whatsapp_no`)",
    "CREATE UNIQUE INDEX `idx_rShLrFG` ON `teachers` (`user`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aias8jts",
    "name": "whatsapp_no",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xsnfoyjv",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cedklvrl",
    "name": "utc",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0fynhuyn",
    "name": "mobile",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "^[\\+][(]?[0-9]{12,13}$"
    }
  }))

  return dao.saveCollection(collection)
})
