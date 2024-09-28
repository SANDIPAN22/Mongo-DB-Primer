db.getCollection("Users").aggregate(
  [
    {
      $group: { _id: "$age", count: { $sum: 1 } },
    },
    { $sort: { count: -1 } },
    { $limit: 3 },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
