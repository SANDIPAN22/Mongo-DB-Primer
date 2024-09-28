// age == 20
const filter = {
  age: 20,
};

// age >= 30
const filter2 = {
  age: { $gte: 30 },
};

// gender == female AND eyeColor == blue
const filter3 = {
  gender: "female",
  eyeColor: "blue",
};

// age >= 30 OR gender == female
const filter4 = {
  $or: [{ age: { $gte: 30 } }, { gender: "female" }],
};

// age == 25 OR age == 30 OR age == 35
const filter6 = {
  age: { $in: [25, 30, 35] },
};

////////////////////////////////////////////////////////////////
// Query on Array
////////////////////////////////////////////////////////////////

// tags contains 'magna'
const filter7 = {
  tags: "magna",
};

// tags ONY has 'magna'
const filter8 = {
  tags: ["magna"],
};

// tags contains 'ad' and 'id'
const filter9 = {
  tags: { $all: ["ad", "id"] },
};

// tags contains 'ad' or 'id'
const filter10 = {
  tags: { $in: ["ad", "id"] },
};

const client = await MongoClient.connect("mongodb://localhost:27017/");
const coll = client.db("AggregationSample").collection("Users");
const cursor = coll.find(filter);
const result = await cursor.toArray();
await client.close();
