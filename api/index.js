const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(
	cors({
		origin: process.env.origin,
		credentials: true,
	})
);
app.options('*', cors());

app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use('/files', express.static(path.join(__dirname, 'public/files')));

const router = require("../api/routes/routes.js");

app.use("/", router);

app.listen(1000, () => console.log("listening to 1000.."));