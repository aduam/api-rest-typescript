import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.HOST_DB}/${process.env.NAME_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(db => console.log('database is connected'))
  .catch(err => console.log(err))