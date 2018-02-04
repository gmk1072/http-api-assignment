const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getSuccess': responseHandler.getSuccess,
    '/badRequest': responseHandler.getBadRequest,
    '/getUnauthorized': responseHandler.getUnauthorized,
    '/getForbidden': responseHandler.getForbidden,
    '/getInternal': responseHandler.getInternal,
    '/getNotImplemented': responseHandler.getNotimplemented,
    '/notFound': responseHandler.notFound,
    notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const params = query.parse(parsedUrl.query);
    const acceptedTypes = request.headers.accept.split(',');

    switch (request.method) {
        case 'GET':
            if (parsedUrl.pathname === '/') {
                htmlHandler.getIndex(request, response);
            } else if (parsedUrl.pathname === '/style.css') {
                htmlHandler.getCSS(request, response);
            } else if (parsedUrl.pathname === '/success') {
                responseHandler.getSuccess(request, response, acceptedTypes);
            } else if (parsedUrl.pathname === '/badRequest') {
                responseHandler.getBadRequest(request, response, acceptedTypes, params);
            } else if (parsedUrl.pathname === '/unauthorized') {
                responseHandler.getUnauthorized(request, response, acceptedTypes, params);
            } else if (parsedUrl.pathname === '/forbidden') {
                responseHandler.getForbidden(request, response, acceptedTypes);
            } else if (parsedUrl.pathname === '/internal') {
                responseHandler.getInternal(request, response, acceptedTypes);
            } else if (parsedUrl.pathname === '/notImplemented') {
                responseHandler.getNotImplemented(request, response, acceptedTypes);
            } else {
                responseHandler.notFound(request, response, acceptedTypes);
            }
            break;
        default: {

            if (urlStruct[parsedUrl.pathname]) {
                urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
            } else {
                urlStruct.notFound(request, response, acceptedTypes, params);
            }
            break;
        }
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);


            //case 'HEAD':
            //    if (parsedUrl.pathname === '/getSuccess') {
            //        responseHandler.getSuccessMeta(request, response, acceptedTypes);
            //    } else if (parsedUrl.pathname === '/getBadRequest') {
            //        responseHandler.getBadRequestMeta(request, response, acceptedTypes, params);
            //    } else if (parsedUrl.pathname === '/getUnauthorized') {
            //        responseHandler.getUnauthorizedMeta(request, response, acceptedTypes, params);
            //    } else if (parsedUrl.pathname === '/getForbidden') {
            //        responseHandler.getForbiddenMeta(request, response, acceptedTypes);
            //    } else if (parsedUrl.pathname === '/getInternal') {
            //        responseHandler.getInternalMeta(request, response, acceptedTypes);
            //    } else if (parsedUrl.pathname === '/getNotimplemented') {
            //        responseHandler.getNotimplementedMeta(request, response, acceptedTypes);
            //    } else {
            //        responseHandler.notFoundMeta(request, response, acceptedTypes);
            //    }
            //    break;
