/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xnzvVqK` ON `teachers` (`whatsapp_no`)",
    "CREATE UNIQUE INDEX `idx_GiM8Rkp` ON `teachers` (`name`)",
    "CREATE UNIQUE INDEX `idx_rShLrFG` ON `teachers` (`user`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fm11wkmen3ececj")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_xnzvVqK` ON `teachers` (`whatsapp_no`)",
    "CREATE UNIQUE INDEX `idx_GiM8Rkp` ON `teachers` (`name`)"
  ]

  return dao.saveCollection(collection)
})
