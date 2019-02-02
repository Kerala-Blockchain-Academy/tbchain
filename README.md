# Getting started

Get the code from:

`git clone https://github.com/Kerala-Blockchain-Academy/tbchain`

`cd tbDotsClient`

`npm install`

`ng build`

After successfull build, you should see a tbdots folder inside the dist folder
Open nginx.conf file in the repository, replace '<dots_proj_dist_path>' with this folder path

`apt-get install nginx`
After successfull install, replace the nginx.conf file in /etc/nginx/nginx.conf with the one in previous step
(`sudo cp nginx.conf /etc/nginx/nginx.conf`)

Restart nginx using `/etc/init.d/nginx restart`
( if the port is still in use:
 get PID using `sudo netstat -tulpn`
 Do `sudo kill -2 <PID>` and then do the restart
 )

`sudo docker-compose up`

The application should be available at `http://localhost:4200`

Running `node subscriptionProxy.js` will start the event subscription

## Introduction

Project Name : TB Chain

Team Members : Abhijith B M, Sandhya S Sugunan, Litti Tom

This project invloves writing client application for TBDOTS, with Manufacture Register/Login, Medicine details entering, Patient Register/Login, Intake details entering & Patient Report functionalities

Manufacture can:
 1. Register into the system
 2. Login into the system
 3. Add the medicine details

Patient can:
 1. Register into the system
 2. Login into the system
 3. Add the consumption of medicine details

General visitor can:
 1. View the patient report like which patient took which medicines

All the transactions have the same 6 hex digit prefix, which is the first 6 hex characters of the SHA-512 hash of "tbdots".
Each Manufacture & Patient is identified by with a corresponding public/private keypair which will be generated dynamically at the time of their registration.

The manufacture details is stored at a 70 hex digit address derived from:
* a 6-hex character prefix of the "tbdots" Transaction Family namespace and
* a 7-hex character prefix of the text "000111USER" and
* the first 57-hex characters of the patient name.

The patient details is stored at a 70 hex digit address derived from:
* a 6-hex character prefix of the "tbdots" Transaction Family namespace and
* a 7-hex character prefix of the text "000333PATIENT" and
* the first 57-hex characters of the patient name.

The medicine details entered by the manufacture, is stored at a 70 hex digit address derived from:
* a 6-hex character prefix of the "tbdots" Transaction Family namespace and
* a 6-hex character prefix of the text "000001MEDICINE" and
* a 6-hex character prefix of the first 6 letters of medicine unique id and
* the first 52-hex characters prefix of the medicine unique id.

## Components
The tbdots transaction family contains two parts :

	I)Client Application ,written in Angular
	II)Transaction Processor ,written in JavaScript

1. The client application has two parts:

* `angular application` : contains the client application that can make transactions to ther validator through REST API
* `node subscription service` : A node service that subscribes to events and listens.


2. The Transaction Processor in javascript.

   TransactionProcessor is a generic class for communicating with a validator and routing transaction processing requests to a registered handler. 
   index.js has the Transaction Processor class.

   
   The handler class is application-dependent and contains the business logic for a particular family of transactions. 
   TbDotsHandler.js has the handler class.

   The javascript transaction processor has the following files :
    
                a)index.js  (transaction processor class)
                b)package.json
                c)Dockerfile
		d)TbDotsHandler.js (handler class)

   Files which needs modification
                
                a)docker-compose.yaml -the name of the transaction processor needs to be specified.
                b)Dockerfile-the working directory of the tp needs to be specified.

   Files newly included
                a)package.json
                b)index.js
                c)TbDotsHandler.js
       
## Docker Usage
### Prerequisites
This example uses docker-compose and Docker containers. If you do not have these installed please follow the instructions here: https://docs.docker.com/install/

**NOTE**

The preferred OS environment is Ubuntu Linux 16.04.3 LTS x64.
Although other Linux distributions which support Docker should work.

### Building Docker containers

Before starting  the project make sure the Docker service is up and running.

To start up the environment, perform the following tasks:

    a)Open a terminal window.
    b)Change your working directory to the same directory where you saved the Docker Compose file.
    c)Run the following command:


	$sudo docker-compose up --build

	The `docker-compose.yaml` file creates a genesis block, which contain initial Sawtooth settings, generates Sawtooth and client keys, 
	and starts the Validator, Settings TP, Tbdots TP, and REST API.


To stop the validator and destroy the containers, type `^c` in the docker-compose window, wait for it to stop, then type

	$sudo docker-compose down


