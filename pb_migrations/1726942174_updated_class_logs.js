/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  collection.updateRule = "@request.auth.id = student.teacher.user.id "
  collection.deleteRule = "@request.auth.id = student.teacher.user.id "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("67pnpu85z3xaton")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
