/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xjxvL9L` ON `student_invoices` (\n  `student`,\n  `target_date`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qcfeo7fgy5w8qwl")

  collection.indexes = []

  return dao.saveCollection(collection)
})
