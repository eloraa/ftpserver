const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const basicAuth = require('express-basic-auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const serveIndex = require('serve-index');
const res = require('express/lib/response');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Serve JS


const serveIndexStylesheet = './views/serveIndex/ftp.css'
const serveIndexTemplate = './views/serveIndex/ftp.html'
const auth = basicAuth({
  challenge: true,
  users: { 'neon': '10101010' },
  unauthorizedResponse: (req, res, next) => {
    throw new createError(401)
  }
})

app.use('/ftp', express.static(__dirname + '/ftpcontent'), serveIndex(__dirname + '/ftpcontent', {
  stylesheet: serveIndexStylesheet,
  template: serveIndexTemplate
}));

app.use('/ftp2', auth, express.static(path.resolve('D://', 'mp3')), serveIndex(path.resolve('D://', 'mp3'), {
  stylesheet: serveIndexStylesheet,
  template: serveIndexTemplate
}));

app.use('/ftp3', auth, express.static(path.resolve('D://', 'Sabbir/New Folder')), serveIndex(path.resolve('D://', 'Sabbir/New Folder'), {
  stylesheet: serveIndexStylesheet,
  template: serveIndexTemplate
}));

app.use('/ftp4', express.static(path.resolve('H://', '/pull')), serveIndex(path.resolve('H://', '/pull'), {
  stylesheet: serveIndexStylesheet,
  template: serveIndexTemplate
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
  res.render('error', { path: req.path.split('/') });
});

module.exports = app;
