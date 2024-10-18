// // backend/db.js
// const mongoose = require('mongoose');

// let isConnected; // Keep track of connection status

// const connectData = async () => {
//     if (isConnected) {
//         console.log('Already connected to MongoDB');
//         return;
//     }

//     try {
//         await mongoose.connect('mongodb+srv://byarun556:1rJ4JONRBTAF3J1L@productscluster.fgau2.mongodb.net/myDatabase?retryWrites=true&w=majority', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         isConnected = true;
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         process.exit(1); // Exit the process with failure
//     }
// };

// module.exports = connectData;
