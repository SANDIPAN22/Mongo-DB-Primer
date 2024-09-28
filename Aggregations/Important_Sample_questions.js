// Top country with highest number of users
db.getCollection("Users").aggregate(
  [
    {
      $group: {
        _id: "$company.location.country",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// The country where most "active" users stays
db.getCollection("Users").aggregate(
  [
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$company.location.country",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 1 },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// Average tag counts using Unwind
db.getCollection("Users").aggregate(
  [
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$_id",
        tagCount: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        avgTagCount: { $avg: "$tagCount" },
      },
    },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// show name and ages of the inactive and have 'velit' as tag
db.getCollection("Users").aggregate(
  [
    {
      $match: { tags: "velit", isActive: false },
    },
    { $project: { name: 1, _id: 0, age: 1 } },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// Phone that starts with "+1 (940)"
db.getCollection("Users").aggregate(
  [
    {
      $match: {
        "company.phone": RegExp("^|\\+1 \\(940\\)"),
      },
    },
    { $count: "Special phone Number" },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// name 2 recently registered users
db.getCollection("Users").aggregate(
  [
    { $sort: { registered: -1 } },
    { $limit: 2 },
    { $project: { name: 1, _id: 0 } },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// categorized gender wise and show list of users (name and age) of each gender + count + average of age
db.getCollection("Users").aggregate(
  [
    {
      $group: {
        _id: "$gender",
        names: {
          $push: {
            "Full Name": "$name",
            "Current Age": "$age",
          },
        },
        count: { $sum: 1 },
        avgAge: { $avg: "$age" },
      },
    },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

//Count all users whose 2nd tag is "ad"
db.getCollection("Users").aggregate(
  [{ $match: { "tags.1": "ad" } }, { $count: "Second Tag 'Ad'" }],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 'ad' and 'id' both present as tags
db.getCollection("Users").aggregate(
  [{ $match: { tags: { $all: ["ad", "id"] } } }],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// user count based on all USA companies categorized by the company name and eye color
db.getCollection("Users").aggregate(
  [
    {
      $match: {
        "company.location.country": "USA",
      },
    },
    {
      $group: {
        _id: {
          "Comapny Title": "$company.title",
          "Eye Color": "$eyeColor",
        },
        userCount: { $sum: 1 },
      },
    },
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
