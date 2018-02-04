const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const respond = (request, response, status, object, type) => {
    const headers = {
        'Content-Type': type,
    };
    console.dir(object);
    response.writeHead(status, headers);
    if (type === 'text/xml') {
        response.write(object);
    } else if (type === 'application/json') {
        response.write(JSON.stringify(object));
    }
    response.end();
};

//const respondMeta = (request, response, status, type) => {
//    const headers = {
//        'Content-Type': type,
//    };
//    response.writeHead(status, headers);
//    response.end();
//};

const getIndex = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const getCSS = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.write(css);
    response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} this is a success`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    const responseJSON = {
        message: 'This is a success',
    };
    return respond(request, response, 200, responseJSON, 'application/json');
};
//const getSuccessMeta = (request, response, acceptedTypes) => {
//    respondMeta(request, response, 200, acceptedTypes[0]);
//};

const getBadRequest = (request, response, acceptedTypes, params) => {
    const responseJSON = {
        message: 'this request has the required parameters',
    };
    if (!params.test || params.test !== 'true') {
        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>`;
            responseXML = `${responseXML} missing test query parameter set to true`;
            responseXML = `${responseXML} </message>`;
            responseXML = `${responseXML} <id>`;
            responseXML = `${responseXML} badRequest`;
            responseXML = `${responseXML} </id>`;
            responseXML = `${responseXML} </response>`;
            return respond(request, response, 400, responseXML, 'text/xml');
        }
        responseJSON.message = 'missing test query parameter set to true';
        responseJSON.id = 'badRequest';
        return respond(request, response, 400, responseJSON, 'application/json');
    }
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} this request has the required parameters`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    return respond(request, response, 200, responseJSON, 'application/json');
};

//const getBadRequestMeta = (request, response, acceptedTypes, params) => {
//    if (!params.test || params.test !== 'true') {
//        return respondMeta(request, response, 400, acceptedTypes[0]);
//    }
//    return respondMeta(request, response, 200, acceptedTypes[0]);
//};


const getUnauthorized = (request, response, acceptedTypes, params) => {
    const responseJSON = {
        message: 'this request has the required parameters',
    };
    if (!params.loggedIn || params.loggedIn !== 'yes') {
        if (acceptedTypes[0] === 'text/xml') {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>`;
            responseXML = `${responseXML} missing loggedin query parameter set to yes`;
            responseXML = `${responseXML} </message>`;
            responseXML = `${responseXML} <id>`;
            responseXML = `${responseXML} Unauthorized`;
            responseXML = `${responseXML} </id>`;
            responseXML = `${responseXML} </response>`;
            return respond(request, response, 401, responseXML, 'text/xml');
        }
        responseJSON.message = 'missing loggedin query parameter set to yes';
        responseJSON.id = 'Unauthorized';
        return respond(request, response, 401, responseJSON, 'application/json');
    }
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} this request has the required parameters`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
    }
    return respond(request, response, 200, responseJSON, 'application/json');
};

//const getUnauthorizedMeta = (request, response, acceptedTypes, params) => {
//    if (!params.loggedIn || params.loggedIn !== 'yes') {
//        return respondMeta(request, response, 401, acceptedTypes[0]);
//    }
//    return respondMeta(request, response, 200, acceptedTypes[0]);
//};

const getForbidden = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} you do not have access to this content`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} <id>`;
        responseXML = `${responseXML} Forbidden`;
        responseXML = `${responseXML} </id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 403, responseXML, 'text/xml');
    }
    const responseJSON = {
        message: 'you do not have access to this content',
        id: 'Forbidden',
    };
    return respond(request, response, 403, responseJSON, 'application/json');
};

//const getForbiddenMeta = (request, response, acceptedTypes) => {
//    respondMeta(request, response, 403, acceptedTypes[0]);
//};

const getInternal = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} Internal server error. something went wrong`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} <id>`;
        responseXML = `${responseXML} internalError`;
        responseXML = `${responseXML} </id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 500, responseXML, 'text/xml');
    }
    const responseJSON = {
        message: 'Internal server error. something went wrong',
        id: 'internalError',
    };
    return respond(request, response, 500, responseJSON, 'application/json');
};

//const getInternalMeta = (request, response, acceptedTypes) => {
//    respondMeta(request, response, 500, acceptedTypes[0]);
//};

const getNotImplemented = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} A get request for this page has not been implemented yet, check again for updated content`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} <id>`;
        responseXML = `${responseXML} notImplemented`;
        responseXML = `${responseXML} </id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 501, responseXML, 'text/xml');
    }
    const responseJSON = {
        message: 'A get request for this page has not been implemented yet, check again for updated content',
        id: 'notImplemented',
    };
    return respond(request, response, 501, responseJSON, 'application/json');
};

//const getNotImplementedMeta = (request, response, acceptedTypes) => {
//    respondMeta(request, response, 501, acceptedTypes[0]);
//};

const notFound = (request, response, acceptedTypes) => {
    if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>`;
        responseXML = `${responseXML} this is not the content you are looking for`;
        responseXML = `${responseXML} </message>`;
        responseXML = `${responseXML} <id>`;
        responseXML = `${responseXML} notFound`;
        responseXML = `${responseXML} </id>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 404, responseXML, 'text/xml');
    }
    const responseJSON = {
        message: 'This is not the content you are looking for',
        id: 'notFound',
    };
    return respond(request, response, 404, responseJSON, 'application/json');
};

//const notFoundMeta = (request, response, acceptedTypes) => {
//    respondMeta(request, response, 404, acceptedTypes[0]);
//};

module.exports = {
    getIndex,
    getCSS,
    getSuccess,
    //getSuccessMeta,
    getBadRequest,
    //getBadRequestMeta,
    getUnauthorized,
    //getUnauthorizedMeta,
    getForbidden,
    //getForbiddenMeta,
    getInternal,
    //getInternalMeta,
    getNotImplemented,
    //getNotImplementedMeta,
    notFound,
    //notFoundMeta,
};
