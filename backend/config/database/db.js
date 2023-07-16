const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    if (connection) {
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
