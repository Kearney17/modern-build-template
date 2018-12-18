module.exports = () => {
	const	src = `./src`,
		build = `./dist`;

	let config = {
		app: 'app.localhost.com',
		build: build,
		css: {
			compiled: `${src}/css`,
		}
	};

	config.src = {
		app: ['./index.html'],
		css: `${config.css.compiled}/**/*.css`,
		js: `${src}/js/**/*.js`,
		sass: `${src}/scss/**/*.scss`
	};

	return config;
}