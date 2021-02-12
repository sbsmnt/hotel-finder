const mongoose = require('mongoose');

const connectDb = () =>{
  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.cb3pu.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(()=>{
    console.log('connected to DB:', process.env.MONGO_DB);
  })
  .catch(()=>{
    console.log('connection failed');
  });
}

module.exports = connectDb;