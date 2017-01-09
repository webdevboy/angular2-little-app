import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClientService } from '../shared/http-client.service';
import { LiteAppAPI } from '../shared/lite-app-api';
import { TMerchantForm } from '../shared/models/general.model';
import { Observable } from 'rxjs';

@Injectable()
export class EasyFeesManagerService {

  constructor(private httpClient: HttpClientService) { }

  submitSignupData(data: TMerchantForm) {
    let formData = new FormData();
    let formKeys = Object.keys(data).filter( val => val !== 'uploadFiles' );
    let details = {};
    formKeys.forEach( key => details[key] = data[key] );
    formData.append('detail', new Blob([JSON.stringify(details)], {
      type: "application/json"
    }));
    data.uploadFiles.forEach(_key => {
      formData.append('uploadFiles[]', _key, _key.name);
    });
    this.httpClient.postMultipart(LiteAppAPI.MERCHANT_SIGNUP, formData).subscribe( res => {
      console.log(res);
    }, e => {
      console.error(e);
    }, () => {
      console.log('Upload complete');
    });
  }


  getCurrenciesList() {
    return this.httpClient.get(LiteAppAPI.MERCHANT_CURRENCY);
  }

  retreiveFormData() {
    return this.httpClient.get(LiteAppAPI.MERCHANT_FORM);
  }

  getCurrentStatus() {
    return this.httpClient.get(LiteAppAPI.MERCHANT_STATUS);
  }

}