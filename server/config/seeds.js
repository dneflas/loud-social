const { faker } = require("@faker-js/faker");
const db = require("../config/connection");
const { User, Post } = require("../models");

db.once("open", async () => {
  await User.deleteMany({});
  await Post.deleteMany({});

  // User Data (username, email, password)
  let userData = [];
  for (let i = 0; i < 20; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);

    userData.push({ username, email, password });
  }

  await User.insertMany(userData);

  // Admin User Data (username, email, password, admin)
  let adminUserData = [];
  for (let i = 0; i < 4; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);
    const admin = true;

    adminUserData.push({ username, email, password, admin });
  }

  await User.insertMany(adminUserData);

  const createdUsers = await User.find();

  // Post Data (postTitle, postBody, author)
  for (let i = 0; i < 50; i++) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const randomUser = createdUsers[randomUserIndex];

    const postTitle = faker.lorem.sentence();
    const postBody = faker.lorem.paragraphs();
    const author = randomUser.username;
    const adminPost = randomUser.admin;

    const createdPost = await Post.create({
      postTitle,
      postBody,
      author,
      adminPost,
    });

    // add the newly created post to the user
    await User.findByIdAndUpdate(
      { _id: randomUser._id },
      { $addToSet: { posts: { _id: createdPost._id } } },
      { runValidators: true }
    );
  }

  const createdPosts = await Post.find();

  // Comment Data
  for (let i = 0; i < 100; i++) {
    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const randomPost = createdPosts[randomPostIndex];
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const randomUser = createdUsers[randomUserIndex];

    const commentBody = faker.lorem.sentence();
    const author = randomUser.username;

    await Post.findByIdAndUpdate(
      { _id: randomPost._id },
      { $push: { comments: { commentBody, author } } },
      { runValidators: true }
    );
  }

  // Reaction Data (👍, 📣, 👏, ❤️, )
  let reactionStrings = ["👍", "📣", "👏", "❤️"];
  for (let i = 0; i < 200; i++) {
    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const randomPost = createdPosts[randomPostIndex];
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const randomUser = createdUsers[randomUserIndex];

    const reaction =
      reactionStrings[Math.floor(Math.random() * reactionStrings.length)];
    const { username } = randomUser;

    await Post.findByIdAndUpdate(
      { _id: randomPost._id },
      { $push: { reactions: { reaction, username } } },
      { runValidators: true }
    );
  }

  // user favorites Data

  for (let i = 0; i < 75; i++) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const { _id: userId } = createdUsers[randomUserIndex]._id;
    const randomPostIndex = Math.floor(Math.random() * createdPosts.length);
    const { _id: postId } = createdPosts[randomPostIndex]._id;

    await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { favorites: { _id: postId } } },
      { runValidators: true }
    );
  }

  console.log("Database seeded! 🌱");
  process.exit(0);
});
