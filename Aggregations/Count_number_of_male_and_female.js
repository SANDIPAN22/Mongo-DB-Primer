db.getCollection("Users").aggregate(
  [
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
