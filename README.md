# QP_ABAP_Unit-Testing

ABAP Unit-Testing integrated on Azure DevOps.


## Motivation and Basics

The key motivation is to **_automate Eclipse ABAP Unit-Testing_**.
This is realized by running respective ABAP Unit-Tests via **_Azure DevOps Pipelines_**.

A S/4HANA package containing **_Unit-Testing classes_** is called by an HTTP POST-request in a **_Node.js-App_**.<br>
The respective **_Node.js-App_** is pushed into a **_GitHub repository_**.<br>
An **_Azure DevOps Pipeline_** is placed on the **_GitHub repository_**.<br>

Hence, we can call the **_Unit-Tests_** by running the **_Node.js-App_** through running an **_Azure DevOps Pipeline_**.<br>
Test results can be displayed as expressive **_graphics_**.


## Application and Capabilities

- general application and capabilities


### VSC-App

- application and capabilities of VSC-App:
- refer to the several files
- key code snippets of the vsc-app
- npm start -- ...
- ...


### Azure DevOps Pipeline

- application and capabilities of Azure DevOps Pipeline:
- refer to azure-pipelines.yml file
- key code snippets of the azure-pipelines.yml file
- publish results as graphics
- ...
