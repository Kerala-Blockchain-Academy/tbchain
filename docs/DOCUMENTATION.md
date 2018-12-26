                   
TB CHAIN

TB Chain is an application for the innovative implementation of conventional DOTS Programme with the help of blockchain technology.

DOTS Programme (Direct Observation Treatment System)

This programme was devised in order to monitor the treatment schedule of Tuberculosis undergone by the patient. Doctor issues a blister packet of tablets at the beginning of month to the patient and the patient is asked to produce the empty packet at the end of month before the doctor. Thus the doctor ensures that the patient has completed his dose of medicine for that month. But this system proves to be inefficient as there is no proper check on consumption of medicine on regular basis. There are many chances that the patient may forget to take medicine on right time and make it up along with the next dose. This makes the curing of disease more difficult.

How TB Chain Tries To Overcome this Problem?

Main aim of TB Chain is to ensure regular consumption of medicine by the patient. ie., Right Amount of Medicine at Right Time. It is intended to put in practice in the following manner.
Every tablet is given a unique number code at the time of manufacture and this number is uploaded into the network by the manufacturer himself. The patient gets the number while he is taking the tablet and he is asked to enter the code to the network at the time of consumption. Thus the consumption details of tablet is uploaded in the networkby patient  and can be used for monitoring the regular consumption. Furthermore, this details can be accessed by doctors, medicine manufacturers, government and other agencies involved in promotion of TB treatment.

This system provides certain additional benefits along with completion of the main objective. Network provides details about the individual patient and the details of medicine he had taken.

Components:

The project contains two parts:
   I)Client Application ,written in Angular
   II)Transaction Processor ,written in JavaScript


I. The client application has two parts:

	* `angular application` : contains the client application that can make transactions to ther validator through REST API
	* `node subscription service` : A node service that subscribes to events and listens.


	This angular application for TBDOTS with Manufacture Register/Login, Medicine details entering, Patient Register/Login, Intake details entering & Patient Report functionalities

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


II. The Transaction Processor in javascript.

   	TransactionProcessor is a generic class for communicating with a validator and routing transaction processing requests to a registered handler. index.js has the Transaction Processor class.

   
	   The handler class is application-dependent and contains the business logic for a particular family of transactions. 
	   TbDotsHandler.js has the handler class.

   	The javascript transaction processor has the following files :
    
                a)index.js  (transaction processor class)
                b)package.json
                c)Dockerfile
		d)TbDotsHandler.js (handler class)


	# Brief Description about TP

	1. Mainly two JavaScript file are used in the Transaction Processor index.js and TbDotsHandler.js.

	2. index.js: The registration of the Transaction Processor, adding handler, registering the transaction processor to a particular validator is done here and the Transaction Processor is started.

	3. TbDotsHandler.js: Action based routines including the state based operations are done here.

	4. After importing all the necessary constants we define the hashing funtions, the family name, prefix, addressing schemes, encoding and decoding functions.

	5. Then all function definitions are done. Functions for creating and updating a product by the users are defined.

	6. Next the handler for encoded payloads and the apply function is defined.

	7. Finally according to the action specified in the payload corresponding function call will be made.


	# TP Workflow


	1. The Transaction Processor works on basis of the payload it receives from the validator. 

	2. The client is where the generation of the payload is done, according to the action the user wants to do.

	3. This payload will be sent to the validator via the REST-API, which the validator passess on to the Transaction Processor(TbDotsHandler.js).

	4. The Transaction Processor upon receiving the payload checks whether it is in correct format.

	5. Then the validater will extract the action from the payload and calls the appropriate function with the necessary variables.

	6. The functions will then be executed.
