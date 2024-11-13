/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w962q8thgapm7e2")

  collection.name = "monthly_packages"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_UWcALso` ON `monthly_packages` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w962q8thgapm7e2")

  collection.name = "packages"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_UWcALso` ON `packages` (`name`)"
  ]

  return dao.saveCollection(collection)
})
