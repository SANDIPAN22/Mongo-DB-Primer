// Show all book with their Author details (as an object)
db.getCollection("Books").aggregate(
  [
    {
      $lookup: {
        from: "Authors",
        localField: "author_id",
        foreignField: "_id",
        as: "author_details",
      },
    },
    {
      $addFields: {
        author_details: {
          $first: "$author_details",
        },
      },
    },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
