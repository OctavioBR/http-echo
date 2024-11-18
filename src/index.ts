import { app } from './app';

const server = app.listen(process.env.PORT || 3000);

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
