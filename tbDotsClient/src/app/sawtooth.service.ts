import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createHash } from 'crypto-browserify';
import { CryptoFactory, createContext } from "sawtooth-sdk/signing";
import * as protobuf  from "sawtooth-sdk/protobuf";
import { TextEncoder, TextDecoder} from "text-encoding/lib/encoding";
import { Buffer } from 'buffer/';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { InvalidTransaction } from 'sawtooth-sdk/processor/exceptions';
import { Medicine } from './tbdots';

@Injectable({
  providedIn: 'root'
})
export class SawtoothService {
  public TB_FAMILY      = 'tbdots';
  public TB_MEDICINE    = '000001MEDICINE';
  public TB_USER        = '000111USER';
  public TB_PATIENT     = '000333PATIENT';
  public TB_PATIENTS     = '000888PATIENT';
  public TB_INTAKE      = '000555INTAKE';
  public TB_PASSPHARSE  = 'This is my dummy passpharse for batcher key pair';

  private currUser: string ="";
  private medPrefix: string = "";
  private finalAadharAray: any;
  private idx:number = 0; 
  private batchSigner: any;
  public  batchPublicKey: any;
  private batchPrivateKey: any;

  private txnSigner: any;
  public  txnPublicKey: any;
  private txnPrivateKey: any;
  
  public srcAddress: any;
  public destAddress:string = "";
  public transactionHeaderBytes: any;
  private context: any; 
  private finalMedidAray: any;

  //private FAMILY_NAME = 'tbdots'; // tbdots
  private FAMILY_VERSION = '1.0';
  private REST_API_BASE_URL = 'http://localhost:4200/api';
 
  public hash = (x) => createHash('sha512').update(x,'utf-8').digest('hex');
  private _returnVBAddress = (type,input) => { type + this.hash(input) }

  public addPatient(key,value,value1){
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_PATIENT).substr(0,7) + this.hash(key).substr(0, 57);
    //this.sendData('AddPatient', value);

    this.destAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_PATIENTS).substr(0,64);

    var name = new Array('AddPatient','UpdatePatients');

    var values = new Array(value,value1);

    this.sendData(name,values);
  }

  public addUser(key,value){
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_USER).substr(0,7) + this.hash(key).substr(0, 57);
    this.sendData('AddUser', value);
  }
  
  public addMedicine(key,value){
    this.medPrefix = key.toString().substr(0, 6);
    console.log('in add medicine : ' + value);
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_MEDICINE).substr(0,6) + this.hash(this.medPrefix).substr(0, 6) + this.hash(key).substr(0, 52);
    this.sendData('AddMedicine', value);
  }

  public getUser(value){
    this.sendData('GetUser', value);
  }

  public getMedicine(key,value){
    this.medPrefix = key.toString().substr(0, 6);
    console.log('in get medicine : ' + value);
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_MEDICINE).substr(0,6) + this.hash(this.medPrefix).substr(0, 6) + this.hash(key).substr(0, 52);
    this.sendData('GetMedicine', value);
  }

  public setCurrentUser(value){
    this.currUser = value;
  }
  
  public retCurrentUser(){
    return this.currUser;
  }

  public addIntakeDetails(patientName,newPatient,medid,medicineDetails){
    console.log("in addIntakeDetails");
    this.medPrefix = medid.toString().substr(0, 6);

    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_MEDICINE).substr(0,6) + this.hash(this.medPrefix).substr(0, 6) + this.hash(medid).substr(0, 52);

    // this.destAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,6) + this.hash(patientName.toString()).substr(0, 6) + this.hash(medid.toString()).substr(0, 52);
    this.destAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_INTAKE).substr(0,6) + this.hash(patientName.toString()).substr(0, 58);
          
    //this.sendData('AddIntake', newPatient); 
    var name = new Array('UpdateMedicine','AddIntake');

    var values = new Array(medicineDetails,newPatient);

    this.sendData(name,values);
  }

  //get medicine status
  public getMedidStatus(medicineId,newPatient,patientid){
      
    this.finalMedidAray = new Array();

    this.medPrefix = medicineId.toString().substr(0, 6);
    console.log('in get medicine status');
    this.srcAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_MEDICINE).substr(0,6) + this.hash(this.medPrefix).substr(0, 6) + this.hash(medicineId).substr(0, 52);
    console.log('src address '+ this.srcAddress);

    let pro = this.getState(this.srcAddress);
    let stateVal: string = '';

    pro.then((stateDetails) => {
      console.log("state value " + stateDetails);
      //check the status and update
      let stateArr = stateDetails.split('"Status":"Active"');
      let newState = "";
      console.log(stateArr.length);
      if(stateArr.length == 2){
        this.destAddress = this.hash(this.TB_FAMILY).substr(0, 6) + this.hash(this.TB_PATIENT).substr(0,6) +this.hash(patientid.toString()).substr(0, 58);
                
        newState = stateArr[0] + '"Status":"Inactive"' + stateArr[1];
        console.log("New Value : " + newState);     
       // this.sendData('AddPatient', newState);   
        let stateArr1 = stateDetails.split(',');

        let stateArr2 = stateArr1[0].split(':');
        let stateArr3 = stateArr1[1].split(':');
        let stateArr4 = stateArr1[2].split(':');
        let stateArr5 = stateArr1[3].split(':');
        let stateArr6 = stateDetails.split('"TimeStamp":');

        var newMedicine = <Medicine>{};
        newMedicine.medid = stateArr2[1];
        newMedicine.Name = stateArr3[1];
        newMedicine.combination = stateArr4[1];
        newMedicine.CreatedBy = stateArr5[1];
        newMedicine.Status = "Inactive";
        newMedicine.TimeStamp = stateArr6[1].substring(0, stateArr6[1].length - 1);
      
        console.log("New newMedicine : " + newMedicine.medid+","+newMedicine.Name+","+newMedicine.combination+","+newMedicine.CreatedBy+","+newMedicine.Status+","+newMedicine.TimeStamp);   

        var name = new Array('UpdateMedicine','AddPatient');

        var values = new Array(newMedicine,newPatient);
        this.sendData(name,values);
        //this.sendData('PatientDetails', newPatient);   
      }
      pro.catch((error) => {
        console.error(error);
      })
    });

  }

  constructor(public http: HttpClient) {     
    this.context = createContext('secp256k1');
    let passPharse = this.hash(this.TB_PASSPHARSE).slice(0,64);
    this.batchPrivateKey = Secp256k1PrivateKey.fromHex(passPharse); 
    this.batchSigner = new CryptoFactory(this.context).newSigner(this.batchPrivateKey);
    this.batchPublicKey = this.batchSigner.getPublicKey().asHex();
    console.log("Batch public key : " + this.batchPublicKey);    
  }

  public genKeyPair(keyData)
  {
    console.log(keyData);
    this.txnPrivateKey = Secp256k1PrivateKey.fromHex(keyData); 
    this.txnSigner = new CryptoFactory(this.context).newSigner(this.txnPrivateKey);
    this.txnPublicKey = this.txnSigner.getPublicKey().asHex();
    console.log("Txn public key : " + this.txnPublicKey);
  }

  /******************************************************************************************** */
  private getTransaction(transactionHeaderBytes, payloadBytes): any {
    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: this.txnSigner.sign(transactionHeaderBytes),
      payload: payloadBytes
    });

    return transaction;
  }

  /*-------------Creating transactions & batches--------------------*/
  private getTransactionsList(payload): any {
    // Create transaction header
    const transactionHeader = this.getTransactionHeaderBytes([this.srcAddress], [this.srcAddress], payload);
    let transaction = this.getTransaction(transactionHeader, payload);
    let transactionsList = [transaction];
    return transactionsList;
  }

  /* Create batch list */
  private getBatchList(transactionsList): any {
    // List of transaction signatures
    const transactionSignatureList = transactionsList.map((tx) => tx.headerSignature);
    // Create batch header
    const batchHeader = this.getBatchHeaderBytes(transactionSignatureList);
    // Create the batch
    const batch = this.getBatch(batchHeader, transactionsList);
    // Batch List
    const batchList = this.getBatchListBytes([batch]);
    return batchList;
  }

  /* Batch Header*/
  private getBatchHeaderBytes(transactionSignaturesList): any {
    const batchHeader = protobuf.BatchHeader.encode({
      signerPublicKey: this.batchPublicKey,
      transactionIds: transactionSignaturesList
    }).finish();

    return batchHeader;
  }

  /* Get Batch */
  private getBatch(batchHeaderBytes, transactionsList): any {
    const batch = protobuf.Batch.create({
      header: batchHeaderBytes,
      headerSignature: this.batchSigner.sign(batchHeaderBytes),
      transactions: transactionsList
    });

    return batch;
  }

  /* Encode the payload */
  private getEncodedData(action, values): any { 
    const data = action + "|" + values;
    console.log(" getEncodedData " + data);
    return new TextEncoder('utf8').encode(data);
  }

  private getBatchListBytes(batchesList): any {
    const batchListBytes = protobuf.BatchList.encode({
      batches: batchesList
    }).finish();

    return batchListBytes;
  }

  public async sendData(action, values) {
    var transactionsList = new Array();
    var payload;
    var batchList;

    console.log("in send data");
    // Encode the payload
    if (values instanceof Array) {
    // this.destAddress = this.srcAddress;

// var name = new Array('UpdateMedicine','AddPatient');
// var values = new Array("Inactive",newPatient);
// this.sendData(name,values);

      payload = this.getEncodedData(action[0], JSON.stringify(values[0]) );
      const tempArray = this.getTransactionsList(payload);

      this.srcAddress = this.destAddress;
      payload = this.getEncodedData(action[1], JSON.stringify(values[1]) );
      const tempArray1 = this.getTransactionsList(payload);
      transactionsList = tempArray.concat(tempArray1);
    }
    else
    {
      //this.destAddress = this.srcAddress;
      payload = this.getEncodedData(action, JSON.stringify(values) );
      transactionsList = this.getTransactionsList(payload);
    }
    
    batchList = this.getBatchList(transactionsList);
    
    // Send the batch to REST API
    await this.sendToRestAPI(batchList)
    .then((resp) => {
        console.log("Response from API sendToRestAPI ", resp);
        let respCode = resp["status"]
        if ( respCode != null ){
          if ( parseInt(respCode) > 300 )
          alert("Previous transaction was rejected with reason[" + resp["statusText"] + "]")
        }
        return resp;
      })
      .catch((error) => {
        console.log("error here", error);
      })
  }

  public async sendToRestAPI(batchListBytes): Promise<any> {
     
    return this.postBatchList(batchListBytes)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response from API -- inside sendToRestAPI function ", JSON.stringify(responseJson));
      if ( responseJson.data){console.log(" response data ")}
      if ( responseJson.error){alert(responseJson.error.message )}
      if ( responseJson.link){console.log(" response link ")}
      //var data = responseJson.data;
      //var value = new Buffer(data, 'base64').toString();
      //return value;
      return responseJson;
    })
    .catch((error) => {
      alert("Unexpected error while processing your transaction");
      throw new InvalidTransaction("Unexpectded Error");
    });  
  }

  //Get the state 
  public async getState(address): Promise<any> {
    const getStateURL = this.REST_API_BASE_URL + '/state/' + address;
    console.log("Getting from: " + getStateURL);

    return fetch(getStateURL, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((responseJson) => {
      var data = responseJson.data;
      var value = new Buffer(data, 'base64').toString();
      return value;
    })
    .catch((error) => {
      alert("Unexpected error while fetching the state");
      throw new InvalidTransaction("Unexpectded Error");
    }); 	
  }
 
  //send the tranaction
  private postBatchList(batchListBytes): Promise<any> {
    const postBatchListURL = this.REST_API_BASE_URL + '/batches';
    const fetchOptions = {
      method: 'POST',
      body: batchListBytes,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }
    return window.fetch(postBatchListURL, fetchOptions);
  }  

  private getTransactionHeaderBytes(inputAddressList, outputAddressList, payload): any {
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      familyName: this.TB_FAMILY,
      familyVersion: this.FAMILY_VERSION,
      inputs: inputAddressList,
      outputs: outputAddressList,
      signerPublicKey: this.txnPublicKey,
      batcherPublicKey: this.batchPublicKey,
      dependencies: [],
      payloadSha512: this.hash(payload),
      nonce: (Math.random() * 1000).toString()
    }).finish();

    return transactionHeaderBytes;
  }

  private getDecodedData(responseJSON): string {
    const dataBytes = responseJSON.data;
    console.log(dataBytes)
    const decodedData = new Buffer(dataBytes, 'base64').toString();
    return decodedData;
  }
    
}