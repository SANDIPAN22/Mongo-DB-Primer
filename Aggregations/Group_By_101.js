db.getCollection("Users").aggregate([{ $group: { _id: "$age" } }], {
  maxTimeMS: 60000,
  allowDiskUse: true,
});
