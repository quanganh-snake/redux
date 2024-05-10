const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get("/", (req, res) => {
	res.json({ message: "Hello World" });
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	if (["POST", "PUT", "PATCH"].includes(req.method)) {
		if (new Date(req.body.publishDate).getTime() < new Date().getTime()) {
			return res.status(422).send({
				error: {
					publishDate: "Không được publish với ngày trong quá khứ!",
				},
			});
		}
	}
	setTimeout(() => {
		next();
	}, 3000);
});

server.use(router);
server.listen(8000, () => {
	console.log("JSON Server is running on port 8000");
});
