/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  collection.indexes = []

  // remove
  collection.schema.removeField("uek1gpet")

  // remove
  collection.schema.removeField("dk3pwirx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8o3ncf4d",
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
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_X4iJAR0` ON `teacher_invoices` (\n  `teacher`,\n  `year`,\n  `month`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uek1gpet",
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
    "id": "dk3pwirx",
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
})
