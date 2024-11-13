/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  collection.indexes = []

  // remove
  collection.schema.removeField("838bs8k2")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvnlkzozsz56h5i")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_p7KEFtm` ON `teacher_invoices` (\n  `teacher`,\n  `target_date`\n)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "838bs8k2",
    "name": "target_date",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": "\\d{4}-\\d{2}-\\d{2}"
    }
  }))

  return dao.saveCollection(collection)
})
