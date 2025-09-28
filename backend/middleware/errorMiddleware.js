// voglio che gli errori middleware siano un oggetto JSON piuttosto che un messaggio 
// se siamo nell'ambiente development allora possiamo anche vedere lo stack  

const notFound = (req, res, next) => { // catch per ogni route che non esiste --> next è una callback function chaiamata quando abbiamo finito
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => { // catch per errori nelle route --> custom ErrorHandler
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // if it's equal to 200 change it in 500 else use res.statusCode
    let message = err.message;
  
    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') { // CastError è un errore subdolo di Mongoose per questo lo gestiamo singolarmente 
      statusCode = 404;                                        // es. se proviamo ad accedere a uno user con un ObjectId che non esiste allora avremo questo errore
      message = 'Resource not found';
    }
  
    res.status(statusCode).json({
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };
  
  export { notFound, errorHandler };