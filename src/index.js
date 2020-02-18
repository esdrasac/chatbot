require('dotenv').config({ encoding: 'utf8' });


const app = require('./app');

app.listen(7979, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
