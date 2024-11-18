import { hostname }  from 'os';
import { Request, Response, NextFunction } from 'express';
import express = require('express');
import concat = require('concat-stream');
import morgan = require('morgan');

const app = express();
app.set('json spaces', 2);
app.use(morgan('combined'));

app.use((req: Request, _: Response, next: NextFunction) => {
  req.pipe(concat((data: Buffer) => {
    req.body = data.toString('utf8');
    next();
  }));
});

app.all('*', (req: Request, res: Response) => {
  const echo = {
    path: req.path,
    headers: req.headers,
    method: req.method,
    body: req.body,
    cookies: req.cookies,
    fresh: req.fresh,
    hostname: req.hostname,
    ip: req.ip,
    ips: req.ips,
    protocol: req.protocol,
    query: req.query,
    subdomains: req.subdomains,
    xhr: req.xhr,
    os: {
      hostname: hostname()
    }
  };
  res.json(echo);
});

const server = app.listen(process.env.PORT || 80);
let calledClose = false;

process.on('exit', () => {
  if (calledClose) return;
  console.log('Got exit event. Trying to stop Express server.');
  server.close(() => console.log("Express server closed"));
});

process.on('SIGINT', () => {
  console.log('Got SIGINT. Trying to exit gracefully.');
  calledClose = true;
  server.close(() => {
    console.log("Express server closed. Asking process to exit.");
    process.exit();
  });
});
