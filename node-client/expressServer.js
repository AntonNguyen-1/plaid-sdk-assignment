// const { Middleware } = require('swagger-express-middleware');
const http = require("http");
const fs = require("fs");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const jsYaml = require("js-yaml");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("./logger");
const config = require("./config");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

class ExpressServer {
  constructor(port, openApiYaml) {
    this.port = port;
    this.app = express();
    this.openApiPath = openApiYaml;

    try {
      this.schema = jsYaml.safeLoad(fs.readFileSync(openApiYaml));
    } catch (e) {
      logger.error("failed to start Express Server", e.message);
    }
    this.setupMiddleware();
  }

  setupMiddleware() {
    // this.setupAllowedMedia();
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: "14MB" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    //Simple test to see that the server is up and responding
    this.app.get("/hello", (req, res) =>
      res.send(`Hello World. path: ${this.openApiPath}`)
    );
    //Send the openapi document *AS GENERATED BY THE GENERATOR*
    this.app.get("/openapi", (req, res) =>
      res.sendFile(path.join(__dirname, "api", "openapi.yaml"))
    );
    //View the openapi document in a visual interface. Should be able to test from this page
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(this.schema));
    this.app.get("/login-redirect", (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    this.app.get("/oauth2-redirect.html", (req, res) => {
      res.status(200);
      res.json(req.query);
    });
    this.app.post("/institutions/search", async (req, res) => {
      const { query, country_codes, products, options } = req.body;
      const configuration = new Configuration({
        basePath: PlaidEnvironments.sandbox,
        baseOptions: {
          headers: {
            "PLAID-CLIENT-ID": req.headers["plaid-client-id"],
            "PLAID-SECRET": req.headers["plaid-secret"],
          },
        },
      });
      const plaidClient = new PlaidApi(configuration);

      const countryCodesArray = Array.isArray(country_codes)
        ? country_codes
        : [country_codes];

      const productsArray = Array.isArray(products) ? products : [products];

      if (countryCodesArray.length === 0) {
        return res.status(400).json({
          error: "country_codes must contain at least one country code",
        });
      }
      try {
        const response = await plaidClient.institutionsSearch({
          query,
          country_codes: countryCodesArray,
          products: products ? productsArray : null,
          options,
        });
        res.send(response.data);
      } catch (error) {
        if (error.response.data.error_message) {
          res.status(500).json({ error: error.response.data.error_message });
        } else {
          console.log(error);

          res.sendStatus(500);
        }
      }
    });
  }

  launch() {
    this.app.use((err, req, res, next) => {
      // format errors
      res.status(err.status || 500).json({
        message: err.message || err,
        errors: err.errors || "",
      });
    });

    http.createServer(this.app).listen(this.port);
    console.log(`Listening on port ${this.port}`);
  }

  async close() {
    if (this.server !== undefined) {
      await this.server.close();
      console.log(`Server on port ${this.port} shut down`);
    }
  }
}

module.exports = ExpressServer;
