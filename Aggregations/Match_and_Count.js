db.getCollection("Users").aggregate(
  [{ $match: { isActive: true } }, { $count: "Activeuser" }],
  { maxTimeMS: 60000, allowDiskUse: true }
);
