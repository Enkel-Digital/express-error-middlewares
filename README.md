# express-error-middlewares
Express JS generic error middlewares for HTTP 404 not found and 500 server internal error.  
Created to skip always re-writing boilerplate code, and to make it easy to handle errors thrown from async route handlers.


## Examples
### Adding error middleware to express
```js
const express = require("express");
const app = express();

const { _404, _500 } = require("express-error-middlewares");

app.use("/", require("./routes.js"));

// Mount 404 and 500 error middleware last
app.use(_404);
app.use(_500);

app.listen(3000, () => console.log("Server running on port 3000"));
```

### Wrapping async route handlers to use _500 error handling middleware if anything throws asynchronously
```js
const express = require("express");
const router = express.Router();

const { asyncWrap } = require("express-error-middlewares");

router.get(
  "/some-route",
  asyncWrap(async (req, res) => {
    const err = new Error("Throwing from an async route handler");

    // Set any code you want on the error object, will be 500 if left empty
    err.code = 501;
    
    // Any error thrown, either explicitly or from another function called within this async route handler
    // Will be caught, and passed to the error middleware handler
    throw err;

    res.status(200).json({ ok: true });
  })
);

module.exports = router;
```


## License, Author and Contributing
This project is developed and made available under the "MIT" License  
Pull requests are welcomed and open a issue if you have any questions!  
If you more questions, contact us via [email](mailto:developer@enkeldigital.com)  
Authors:
- [JJ](https://github.com/Jaimeloeuf)