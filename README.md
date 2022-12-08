# QP_ABAP_Unit-Testing

ABAP Unit-Testing integrated on Azure DevOps.


## Motivation and Basics

The key motivation is to **_automate Eclipse ABAP Unit-Testing_**.
This is realized by running respective ABAP Unit-Tests via **_Azure DevOps Pipelines_**.

A S/4HANA package containing **_Unit-Testing classes_** is called by an HTTP POST-request in a **_Node.js-App_**.
The respective **_Node.js-App_** is pushed into a **_GitHub repository_**.
An **_Azure DevOps Pipeline_** is placed on the **_GitHub repository_**.

Hence, we can call the **_Unit-Tests_** by running the **_Node.js-App_** through running the **_pipeline_**.


## Application and Capabilities

- general application and capabilities


### VSC-App

- application and capabilities of VSC-App
- npm start as code-snippet
- ...


### Azure DevOps Pipeline

- application and capabilities of Azure DevOps Pipeline
- refer to azure-pipelines.yml code file
- ...
