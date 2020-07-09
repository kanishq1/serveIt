const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const uri =
  'mongodb+srv://kanishq:kanishq@serveitbackend.ovsub.mongodb.net/serveIt?retryWrites=true&w=majority';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Successfully connected to the MONGODB');
  })
  .catch((err) => {
    console.log('Could not connect to the MONGODB. Exiting now...', err);
    process.exit();
  });
