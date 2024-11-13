/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  collection.indexes = []

  // remove
  collection.schema.removeField("6bzpknx7")

  // remove
  collection.schema.removeField("chnx4iia")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jarvym5e",
    "name": "message_status",
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
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xZuOrSB` ON `student_invoices` (\n  `student`,\n  `year`,\n  `month`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6bzpknx7",
    "name": "year",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 2020,
      "max": 2099,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "chnx4iia",
    "name": "month",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 12,
      "noDecimal": true
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jarvym5e",
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
})
