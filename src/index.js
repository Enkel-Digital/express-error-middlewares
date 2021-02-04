"use strict"; // Enforce use of strict verion of JavaScript

/**
 * @function 404 Handler for all not resource not founds
 * @notice Normal request middleware, called when no other route's are matched
 * @notice Wrapped in try/catch in case response fails.
 */
module.exports._404 = function (req, res, next) {
  try {
    // @todo Log error either to stderr or to a service
    console.error(req.method, req.originalUrl);

    res.status(404).end();
  } catch (err) {
    // 500 error middleware is called upon catching any errors
    next(err);
  }
};

/**
 * @function 500 internal server error route handler
 * @dev For error status code other than 500, use
 * @dev     err.code = 401; // Set the code as property of the object
 *
 * @dev This error mw is ran, when a synchronous route handler throws
 * @dev next(err); // Call next middleware function with err object to call this error mw, if the route handler is async
 *
 * ----------------------------------------------------------------------------------------------
 *
 * @notice
 * MOST HANDLERS / ROUTES should do their own error handling and response.
 * Because they may have specific needs and want to respond differently.
 * The 500 error catch, should ONLY be used for unexpected errore or as a default generic error handler.
 * Error will be logged here too since if it reached this middleware, it means the error was not previously handled
 * By not relying on this, we also reduce the need for next function to be passed in to route handlers
 */
module.exports._500 = function (err, _, res, _) {
  // Log error either to error logs or to a logging service
  console.error(err);

  // End request after setting status code either using value set on error or defaults to 500
  res.status(err.code || 500).json({ ok: false, error: err.message });
};

/**
 * Function to wrap your async route handler, so that if it throws any error, 500 error handler is called automatically
 * @param {Function} fn Async route handler
 */
module.exports.asyncWrap = (fn) => (req, res, next, ...args) =>
  Promise.resolve(fn(req, res, next, ...args)).catch(next);
