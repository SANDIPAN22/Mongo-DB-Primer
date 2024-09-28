db.getCollection("Users").aggregate(
  [
    {
      $group: {
        _id: null,
        avgAge: { $avg: "$age" },
      },
    },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
