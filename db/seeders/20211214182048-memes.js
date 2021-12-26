"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Memes",
      [
        {
          userId: 1,
          headline: "Wrong Database",
          caption: "(83884099 rows affected)",
          link: "https://i.ibb.co/WzSQX8c/iwrong-database-selected-memes-72310500b53bd781-bb89705469b127d4.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          headline: "SQL Queries",
          caption: "There is only one option",
          link: "https://i.ibb.co/CWBDKLW/select-from.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          headline: "When you write 10 lines of code",
          caption: "It ain't much, but it's honest work",
          link: "https://i.ibb.co/MkFjLdm/0-Ua695vjz-FHV6-VNOX.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          headline: "node_modules",
          caption: "Not sure if we've imported everything",
          link: "https://i.ibb.co/8YXjYW7/2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          headline: "Debugging",
          caption: "Do you mind taking a look at my pull request?",
          link: "https://i.ibb.co/MGp12pv/rif-1639324664897.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          headline: "🥸",
          caption: "When it's been 7 hours and you still can't understand your own code",
          link: "https://i.ibb.co/LvQ8g34/0-SHcvkzua-TQRg-Bg-Cq.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          headline: "Me, I Did That",
          caption: "When I see the feature I developed live in production",
          link: "https://i.ibb.co/Xtcg50n/Eh-TKLz-UVo-AIXGaq.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          headline: "Farewell",
          caption: "Alexa, play 'Drop It Like It's Hot'",
          link: "https://i.ibb.co/5jF2gs8/1627109107-714-Daily-Dose-of-Programming-Jokes-Best-programming-meme-compilations.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          headline: "Flowchart",
          caption: "It's quite simple, actually...",
          link: "https://i.ibb.co/q08Jh6Q/asked-draw-flowchart-my-code-tdev-meme-y-start-magic-end.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          headline: "The Horror",
          caption: "The Horror...",
          link: "https://i.ibb.co/LCc4MXT/image0.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          headline: "The Duality Of Man",
          caption: "Dog spelled backwards is God",
          link: "https://i.ibb.co/QmqBwmk/states-of-a-programmer.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          headline: "Cultured",
          caption: "Yes, I Really Do Write My For Loops Like This",
          link: "https://i.ibb.co/1TmsjHj/maxresdefault.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          headline: "Hello, world",
          caption: "Some things aren't binary",
          link: "https://i.ibb.co/d6htf48/0-MU2vn-VDQMHG13p-Pw.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          headline: "HackOverflow",
          caption: "Don't mind if I do...",
          link: "https://i.ibb.co/6Rs1HQ6/0-ix-Oqy-N9r-Hc-Vy-Y6a-B.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          headline: "Leetcode",
          caption: "haha hash tables go brrr",
          link: "https://i.ibb.co/NWm8dZt/13ftadx45cq71.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          headline: "JavaScript",
          caption: "It all makes perfect sense",
          link: "https://i.ibb.co/cQJ5dLC/best-js-meme-to-date-2.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          headline: "Map 🤝 Reduce",
          caption: "Yolemmegetabaconeggandcheese",
          link: "https://i.ibb.co/ZcG2fC6/map-reduce-sandwich.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          headline: "init?",
          caption: "God, Save the Queen",
          link: "https://i.ibb.co/s9VBdg3/m3vxtt66jsg61.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          headline: "I Am Learning CSS",
          caption: "* { display: flex }",
          link: "https://i.ibb.co/Q8b7y40/th80i7i6pja71.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          headline: "Review, please!",
          caption: "Not a single merge conflict, I promise.",
          link: "https://i.ibb.co/nzx00bx/ll7f77rl7d871.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          headline: "* { background-color: teal }",
          caption: "That should do the job",
          link: "https://i.ibb.co/9w12WbJ/2p0feb7k7o781.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          headline: "The Great Indentation War",
          caption: ";;;;;;;;;;;;;",
          link: "https://i.ibb.co/vwXZbH3/1jh2k8j4dzo71.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          headline: "Absolute Psycho",
          caption: "I heard they went to a bootcamp.",
          link: "https://i.ibb.co/7YQNy7t/865qq9sljm781.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 4,
          headline: "Minor Changes",
          caption: "Applied some formatting",
          link: "https://i.ibb.co/nMz7mWw/fhv1xk9uek781.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 5,
          headline: "O(n)",
          caption: "That's inefficient, Mom",
          link: "https://i.ibb.co/nCzR8s3/L-GLr8d1-Jg-w-Yg-Vv32-BX-lmv-Hs-IHJtv-MQKd7-PUMLhs.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Memes", null, {});
  },
};
