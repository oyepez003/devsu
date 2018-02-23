var express = require("express")
  , bodyParser = require('body-parser')
  , app = express()
  , swagger_node_express = require("swagger-node-express")
  , paramTypes = swagger_node_express.paramTypes
  , errors = swagger_node_express.errors;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


helloWorld = {
                'spec': {
                  path : "/hello/{name}",
                  notes : "says hello",
                  method: "GET",
                  summary : "Helllo World",
                  parameters : [paramTypes.path('name', 'name to say hello to', 'string')],
                  responseMessages : [errors.invalid('name'), errors.notFound('name')],
                  nickname : "hello"
                },
                'action': function(req, res) {
                  res.send({'message': 'Hello ' + req.params.name + ' from ' + req.headers.host });
                }
              };

apiInfo = {
            title: "Hello World App",
            description: "Hello World App",
            termsOfServiceUrl: "http://localhost/terms/",
            contact: "elizer.chavez@gmail.com",
            license: "Apache 2.0",
            licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
          }

swagger = swagger_node_express.createNew(app)

swagger.addGet(helloWorld)

swagger.setApiInfo(apiInfo)
swagger.configureSwaggerPaths("", "api-docs", "")
swagger.configure("http://localhost:8002", "1.0.0");


// Serve up swagger ui at /docs via static route
var docs_handler = express.static(__dirname + '/node_modules/swagger-node-express/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});

//don't start server when running from mocha

if(process.mainModule.filename.indexOf('node_modules/mocha/bin/_mocha')==-1)
{
  app.listen(8002);
  console.log('starting on port 8002')
}

app.swagger = swagger
module.exports = app