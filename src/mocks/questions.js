const questions = [
  {
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

export default questions;
