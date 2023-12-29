import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
   app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  app.get("/filteredimage", async (req, res) => {
    const image_url = req.query.image_url;
    if (typeof image_url == "undefined" || !validateURL(image_url)) {
      return res
        .status(422)
        .send({ message: "Unable to process the requested image url." });
    }
    const filteredpath = await filterImageFromURL(image_url);
  
    return res.status(200).sendFile(filteredpath, async () => {
      await deleteLocalFiles([filteredpath]);
    });
  });
  app.get( "/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  // 1. validate the image_url query
//     inputURL: a url string to validate
export function validateURL(inputURL) {
  try {
    const url = new URL(inputURL)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch (_) {
    return false
  }
}
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
