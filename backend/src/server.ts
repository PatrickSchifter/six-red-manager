import {app} from './app';

const port = process.env.PORT || 3010;

const server = app.listen(port, () => console.log(`App running on port ${port}`));

process.on('SIGINT', () => {
    server.close();
    console.log('App finished');
})