const argv = require("yargs")
    .describe('username','S4H-Username')
    .describe('password','S4H-Password')
    .describe('package', 'ABAP Package containing the unit tests')
    .describe('file', 'Output file with results from abapunit')
    .default('file', 'result/abapresult.xml')
    .demandOption(['username','password','package'], '').argv;

var configuration;
function Config(  ) {
    this.configuration = initialize();
}



/**
 * Initialize variables needed
 * @param Setting parameters
 */
function initialize(  ) {
    const config =
        {
            network : {
                urlCsrf : 'https://s4htcsaptui.westeurope.cloudapp.azure.com:44301/sap/opu/odata/SAP/adt_srv',
                urlTest : 'https://s4htcsaptui.westeurope.cloudapp.azure.com:44301/sap/bc/adt/abapunit/testruns',
            },
            auth : {
                username : argv.username,
                password : argv.password, 
            },
            test : {
                package: argv.package,
            },
            result :{
                file : argv.file
            }

        }
        return config; 
}

module.exports = Config; // config-Setup als Modul bereitstellen
