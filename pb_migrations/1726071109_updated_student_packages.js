/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8j31blv3ox7cipm")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_ndLufcV` ON `student_packages` (`student`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8j31blv3ox7cipm")

  collection.indexes = []

  return dao.saveCollection(collection)
})
