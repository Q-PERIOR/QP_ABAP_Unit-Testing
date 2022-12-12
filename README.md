# QP_ABAP_Unit-Testing

ABAP Unit-Testing integrated on Azure DevOps.
<br><br><br>


## Motivation and Basics

The key motivation is to **_automate Eclipse ABAP Unit-Testing_**.
This is realized by running respective ABAP Unit-Tests via **_Azure DevOps Pipelines_**.

A S/4HANA package containing **_Unit-Testing classes_** is called by an HTTP POST-request in a **_Node.js-App_**.<br>
The respective **_Node.js-App_** is pushed into a **_GitHub repository_**.<br>
An **_Azure DevOps Pipeline_** is placed on the **_GitHub repository_**.<br>

Hence, we can call the **_Unit-Tests_** by running the **_Node.js-App_** through running an **_Azure DevOps Pipeline_**.<br>
By using Azure DevOps, test results can be displayed as expressive **_graphics_**.
<br><br><br>


## Application and Capabilities

**_ABAP Unit-Testing_** is run by a **_Node.js-APP_**, which can later be integrated in an **_Azure DevOps Pipeline_**, so that commits in the underlying GitHub repository automatically trigger and initiate the Node.js-APP and thereby run ABAP Unit-Testing.
<br><br>


### Node.js-App:

The Node.js-App consists of an index.js-file, a Config-file, a XML-file and a XSL-file.
<br>

#### index.js-file:

To run the ABAP Unit-Tests we need to get a CSRF-Token in the first place, which is done via an HTTP GET-request.<br>
This CSRF-Token is then included in the HTTP POST-request to run the ABAP Unit-Tests. In the same POST-request we incorporate our XML-file as body.<br>
Using an XSL-file, we then generate JUnit test results from AUnit test results. These JUnit test results are stored in a new XML-file.<br>
The JUnit format of the test results enables us to create expressive test result graphics later on through the Azure DevOps Pipeline.<br><br>
As usual our index.js-file can be called via `npm start`. As variables, S4H-User and S4H-Password are required for authorization purposes of the HTTP requests, an ABAP S4H packages is required as package which consists the testing class, a path and file-name can be optionally added for storing test results. The URLs for our HTTP requests are manually inserted in the Config-File.<br>
```
npm start -- --username=<S4H-User> --password=<S4H-Password> --package=<Z2607_AZURE_UNIT_TEST> --file=<result/abapResultFile.xml>
```

#### Config-file:

Besides defining a structure to carry the specified command line variables, the Config-file serves as destination to manually insert the URLs used in our HTTP requests.
<br>

#### XML-file:

The XML-file, which is used as body in the ABAP Unit-Testing POST-request, includes a call to run ABAP Unit-Tests contained in the package the user specifies in the command line.
<br>

#### XSL-file:

The XSL-file, contained in the same xml-Folder as the XML-file, is used to transform the ABAP Unit-Testing results from AUnit to JUnit format.
<br><br>


### Azure DevOps Pipeline:

- refer to azure-pipelines.yml file
- key code snippets of the azure-pipelines.yml file
- publish results as graphics
- ...
