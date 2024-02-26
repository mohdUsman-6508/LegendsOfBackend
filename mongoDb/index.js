import mongoose from "mongoose";

//// mongoDB ko connect kar rahe he nodejs ke through using mongoose

mongoose
  .connect("mongodb://127.0.0.1:27017/", {
    //return a promise
    // useNewUrlParser: true,    // deprecated
    // useUnifiedTopology: true, // deprecated
  })
  .then(() => {
    console.log("conneted to mongoDB successfully :)");
  })
  .catch((err) => {
    console.log(err);
  });

/// schema bana lete he
const game = new mongoose.Schema({
  name: { type: String, require: true },
  players: Number,
  olympic: Boolean,
});

/// model banate he

const Game = new mongoose.model("Game", game);

//data fill kar lete he

const add = async () => {
  //one way of creating

  // const games = new Game({
  //   name: "cricket",
  //   players: 11,
  //   olympic: false,
  // });

  // await games.save();

  //another way of create
  // const outdoorGames = await Game.create({
  //   name: "football",
  //   players: 9,
  //   olympic: "true",
  // });
  // creating at every reload
  // await Game.create({
  //   name: "chess",
  //   players: 2,
  //   olympic: false,
  // });

  // await Game.create({
  //   name: "Swimming",
  //   player: 7,
  //   olympic: true,
  // });

  // read
  const rd = await Game.find({ olympic: { $eq: true } });
  const read = await Game.find({ players: { $lte: 9 } });
  console.log(read); /// for more see documentation of mongoDB

  ///
};

add();
