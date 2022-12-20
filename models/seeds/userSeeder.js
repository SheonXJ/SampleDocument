const bcrypt = require('bcryptjs')
const User = require('../user')
const Score = require('../score')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'User1',
    account: 'user1',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150'
  },
  {
    name: 'User2',
    account: 'user2',
    password: '12345678',
    avatar: 'https://i.pravatar.cc/150'
  }
]
const SEED_SCORE = [0, 20, 40, 60, 80, 100]

db.once('open', async () => {
  await Promise.all(
    SEED_USER.map(async seedUser => {
      seedUser.password = bcrypt.hashSync(seedUser.password, bcrypt.genSaltSync(10, null))
      const user = await User.create(seedUser)
      for (let i = 0; i < 5; i++) {
        Score.create({
          userId: user._id,
          score: SEED_SCORE[Math.floor(Math.random() * SEED_SCORE.length)]
        })
      }
    })
  )
  console.log('SEED_USER done!')
  process.exit()
})
