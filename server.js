import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
import posts from './routes/posts.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js'
import notFound from './middleware/notFound.js';

//Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8000;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false})); // this will allow us to send form data

// Logger middleware
app.use(logger);

// setup static folder - now we don't need to create routes, just type about.html at the last of the url
app.use(express.static(path.join(__dirname, 'public'))); 


//Routes
app.use('/api/posts', posts);

// Error Handler
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
