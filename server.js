const express = require(`express`);
const app = express();
const cookieParser = require(`cookie-parser`);
const cors = require(`cors`);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(cors());

const user = {
  id: 1,
  email: `Oliver.conner@gmail.com`,
  name: `Oliver.conner`,
  password: `Oliver.conner@gmail.com`,
  token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJPbGl2ZXIuY29ubmVyQGdtYWlsLmNvbSIsIm5hbWUiOiJPbGl2ZXIuY29ubmVyIn0.-Rpdph0zEHIU04AeOcBn3kM2SzPe1tnpH25fO014GZk`,
};

app.get(`/api/guess-melody/questions`, function (req, res) {
  res.status(200).json(questions);
});

app.get(`/api/guess-melody/login`, function (req, res) {
  const {token} = req.cookies;
  if (token === user.token) {
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      checkAuth: true,
    });
  } else {
    res.status(401).json({error: `You are not logged in or you do not have permission to this page.`});
  }
});

app.post(`/api/guess-melody/login`, function (req, res) {
  const {email, password} = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: `child "email" fails because ["email" is required]`
    });
  }

  if (user.email === email && user.password === password) {
    res
      .status(200)
      .cookie(`token`, user.token, {
        expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
      })
      .json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
  } else {
    res.status(400).json({
      error: `child "email" fails because ["email" is required]`
    });
  }
});

app.listen(3000, function () {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port 3000!`);
});


const questions = [
  {
    id: Math.floor(Math.random() * 100 + 10),
    type: `genre`,
    genre: `rap`,
    answers: [
      {
        id: `id1`,
        src: `http://localhost:1337/music/Bones - Air.mp3`,
        genre: `rap`,
      },
      {
        id: `id2`,
        src: `http://localhost:1337/music/Bones - BringMeToLife.mp3`,
        genre: `rap`,
      },
      {
        id: `id3`,
        src: `http://localhost:1337/music/Dead Man's Bones - Werewolf Heart.mp3`,
        genre: `indie-rock`,
      },
      {
        id: `id4`,
        src: `http://localhost:1337/music/Denorecords ft. Mc Xhedo & Tony T - Like A Bomba.mp3`,
        genre: `electronic`,
      },
    ]
  },
  {
    id: Math.floor(Math.random() * 100 + 10),
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        id: `id5`,
        src: `http://localhost:1337/music/Imagine Dragons - Beliver.mp3`,
        genre: `rock`,
      },
      {
        id: `id6`,
        src: `http://localhost:1337/music/Imagine Dragons - Thunder.mp3`,
        genre: `rock`,
      },
      {
        id: `id7`,
        src: `http://localhost:1337/music/Скриптонит - не забирай меня с пати.mp3`,
        genre: `rap`,
      },
    ]
  },
  {
    id: Math.floor(Math.random() * 100 + 10),
    type: `artist`,
    song: {
      artist: `Bones`,
      src: `http://localhost:1337/music/Bones - Air.mp3`,
    },
    answers: [
      {
        id: `id1`,
        picture: `http://localhost:1337/img/avatars/Bones.jpg`,
        artist: `Bones`,
      },
      {
        id: `id2`,
        picture: `http://localhost:1337/img/avatars/Dead Man's Bones.jpg`,
        artist: `Dead Man's Bones`,
      },
      {
        id: `id3`,
        picture: `http://localhost:1337/img/avatars/Скриптонит.jpg`,
        artist: `Скриптонит `,
      },
    ]
  },
];
