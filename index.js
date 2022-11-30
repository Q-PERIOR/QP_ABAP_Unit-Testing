/** Programmaufruf in folgendem Format:
 * (bspw. "Z2607_AZURE_UNIT_TEST" als ABAP Unit-Testing Package in S4H)
 * ('username', 'password', 'package' sind obligatorisch)
 * ('GET-Url' und 'POST-Url' werden in Config-Datei eingegeben!)
 * 
 * npm start -- --username=<S4H-User> --password=<S4H-Password> --package=<Z2607_AZURE_UNIT_TEST> --file=<result/abapResultFile.xml>
 *
 */



// Load dependencies, e.g. Node.js modules
const xsltProcessor = require('xslt-processor'); // to transform XML documents
const fs = require("fs"); // to work with my file system
const rp = require('request-promise').defaults({ jar: true }); // to enable then-catch controll structures
const path = require("path"); // to provide utilities for working with file and directory paths
const Config = require('./app/Config.js'); // call config-Data



/** Reads XML files needed to run AUnit Tests and transform to JUnit
 * @return xml file with call to run abap unit test, xsl to transform from AUnit Result to JUnit Result
 */
function readXml() {
    var config = new Config();

    const xsltData = fs.readFileSync(path.resolve(__dirname, "./xml/aunit2junit.xsl"));  // read xslt-Data 
    const xmlRunAbapUnitBuffer = fs.readFileSync(path.resolve(__dirname, "./xml/runAbapUnit.xml")); // read xml-Data
    const xslt = xsltProcessor.xmlParse(xsltData.toString()); // apply xslt-Processor upon string of xslt-Data
    const xmlRunAbapUnit = xmlRunAbapUnitBuffer.toString('utf8').replace("{{package}}", config.configuration.test.package); // insert the defined ABAP Test-Package in string of xml-Data
    return { xmlRunAbapUnit, xslt};
}



/** HTTP-GET: Get CSRF-Token by calling GET with 'x-csrf-token: fetch'
 * @returns Promise with the result of the call
 */
function getCSRFToken() {
    const optionsGetCSRFToken = getCSRFTokenOptions();
    return rp(optionsGetCSRFToken);
}

function getCSRFTokenOptions() {
    var config = new Config();
    var username = config.configuration.auth.username += '';
    var password = config.configuration.auth.password += '';

    return {
        method: "GET",
        rejectUnauthorized: false,
        url: config.configuration.network.urlCsrf,
        simple: false,
        resolveWithFullResponse: true,
        auth: {
            user: username,
            password: password,
        },
        headers: {
            'X-CSRF-Token': 'fetch'
        }
    };
}



/** HTTP-POST: Run ABAP-Unit-Tests
 * @param csrf token needed for the call
 * @returns Promise with the result
 */
function runAbapUnitTest(xmlRunAbapUnit, xCSRFToken) {
    const optionsRunUnitTest = getRunAbapUnitTestOptions(xmlRunAbapUnit, xCSRFToken);
    return rp(optionsRunUnitTest);
}

function getRunAbapUnitTestOptions(xmlRunAbapUnit, xCSRFToken) {
    var config = new Config();
    var username = config.configuration.auth.username += '';
    var password = config.configuration.auth.password += '';

    return {
        method: 'POST',
        rejectUnauthorized: false,
        url: config.configuration.network.urlTest,
        auth: {
            user: username,
            password: password,
        },
        headers: {
            'x-csrf-token': xCSRFToken,
            'Content-Type': "application/vnd.sap.adt.abapunit.testruns.config.v2+xml",
            'Accept': 'application/vnd.sap.adt.abapunit.testruns.result.v1+xml'
        },
        body: xmlRunAbapUnit
    };
}



/** Runs the ABAP-Unit-Test and converts them to JUnit format
 * 1) Get CSRF-Token
 * 2) Call Netweaver Server and get ABAP-Unit results
 * 3) Transform result and save to output.xml
 */
function main() {
    var config = new Config(); // call config-Data

    const { xmlRunAbapUnit, xslt } = readXml(); // read xml-Data and xslt-Data

    csrfTokenPromise = getCSRFToken(); // GET: receive CSRF-Token

    var runAbapUnitTestPromise = csrfTokenPromise.then(function (response) {
        var csrfToken = response.headers['x-csrf-token']; // define CSRF-Token Variable
        return runAbapUnitTest(xmlRunAbapUnit, csrfToken); // POST: run ABAP Unit-Tests
    }
    ).catch(function (err) {
        console.error("ERROR_1: " + JSON.stringify(err));
    });

    runAbapUnitTestPromise.then(function (parsedBody) {
        const xml = xsltProcessor.xmlParse(parsedBody); // define string of xslt-Data
        const outXmlString = xsltProcessor.xsltProcess(xml, xslt); // define xml-String with ABAP Unit-Testing results
        fs.writeFileSync(config.configuration.result.file, outXmlString); // write xml-File with ABAP Unit-Testing results
        console.log(outXmlString); // write ABAP Unit-Testing results into console
    }
    ).catch(function (err) {
        console.error("ERROR_2: " + JSON.stringify(err));
    });
}

console.log("-----------\n-----------\n-----------\nNEUER AUFRUF:\n...........")
main();