require('dotenv').config({ path: '.env', encoding: 'utf8' });


const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
