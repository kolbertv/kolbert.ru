import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

// import bodyParser from 'body-parser';
// import session from 'express-session';
// import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';


// const FileStore = sessionFileStore(session);

polka() // You can also use Express
	// .use(bodyParser.json())
	// .use(session({
	// 	secret:'secret',
	// 	resave: false,
	// 	saveUninitialized: true,
	// 	cookie: {
	// 		maxAge: 1000000000
	// 	},
	// 	store: new FileStore({
	// 		path:process.env.NOW ? '/tmp/session' : '.session'
	// 	})

	// }))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
		// 	session: req => ({
		// 		user: req.session && req.session.user
		// 	})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
