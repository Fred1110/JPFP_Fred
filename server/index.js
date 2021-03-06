const app = require('./app')
const syncAndSeed = require('./db/syncAndSeed')

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
};

init();
