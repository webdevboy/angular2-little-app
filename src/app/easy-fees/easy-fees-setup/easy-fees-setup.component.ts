import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EasyFeesManagerService } from '../easy-fees-manager.service';
import { TMerchantForm } from '../../shared/models/general.model';
const COMPANY_TYPES = [
  {
    name: 'Private/Limited Liability Company',
    value: 'LIMITED_COMPANY',
    documents: ['Bank Statement']
  },
  {
    name: 'Sole Trader',
    value: 'SOLETRADER',
    documents: ['Bank Statement', 'Passport']
  },
  {
    name: 'Community Centre / Charities',
    value: 'CHARITY_RELIGIOUS',
    documents: [
      'Bank Statement',
      'Scanned copy of constitution documents',
      'Copy of the latest annual return',
      'Passport for all individuals in control of the body',
      'Utility Bill'
    ]
  },
  {
    name: 'Clubs & Societies',
    value: 'CLUB_OR_SOC',
    documents: [
      'Bank Statement',
      'Passport',
      'Scanned copy of constitution documents'
    ]
  },
  {
    name: 'Partnerships & Associations',
    value: 'PARTNER_OR_ASSOC',
    documents: [
      'Bank Statement',
      'Scanned copy of constitution documents',
      'Copy of the latest annual return',
      'Passport for all individuals in control of the body',
      'Utility Bill'
    ]
  }
];
const FREQUENCIES = ['WEEKLY', 'MONTHLY', 'QUARTERLY', 'BIANNUALLY', 'ANNUALLY'];

@Component({
  selector: 'app-easy-fees-setup',
  templateUrl: './easy-fees-setup.component.html',
  styleUrls: ['./easy-fees-setup.component.scss']
})

export class EasyFeesSetupComponent implements OnInit {

  public COMPANY_TYPES: any = [...COMPANY_TYPES];
  public FREQUENCIES: string[] = [...FREQUENCIES];
  public CURRENCIES: string[] = [];
  public showModal: boolean = false;
  public setupStep: number = 1;
  public merchantSignupForm: FormGroup;
  // Step 1
  public alreadyCollecting = new FormControl(false);
  public differentName = new FormControl(false);
  public merchantName = new FormControl('', Validators.required);
  public companyNumber = new FormControl('', Validators.required)
  public currency = new FormControl('', Validators.required);
  public companyName = new FormControl({ value: '', disabled: true });
  public creditorSchemeId = new FormControl({ value: '', disabled: true });
  // Step 2
  public website = new FormControl('');
  public address = new FormControl('', Validators.required);
  public city = new FormControl('', Validators.required);
  public state = new FormControl('');
  public countryCode = new FormControl('IR', Validators.required);
  public contactName = new FormControl('', Validators.required);
  public contactEmail = new FormControl('',
    Validators.compose([
      Validators.required,
      Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$')
    ])
  );
  // Step 3
  public estimatedCustomers = new FormControl('', Validators.required);
  public estimatedMaxValue = new FormControl('', Validators.required);
  public estimatedAvgValue = new FormControl('', Validators.required);
  public frequency = new FormControl('WEEKLY', Validators.required);
  public iban = new FormControl('', Validators.required);
  public differentContact = new FormControl(false);
  public reportContact = new FormControl('');
  public reportEmail = new FormControl('',
    Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$')
  );
  public reportPhone = new FormControl('');
  // Step 4
  public businessType =  new FormControl('', Validators.required);
  public vatNumber = new FormControl('', Validators.required);
  public highlightDropZone: boolean;
  public uploadFiles: File[] = [];
  @ViewChild('fileInput') public fileInput;

  constructor(
    public fb: FormBuilder,
    public easyFeesManager: EasyFeesManagerService
  ) {
    this.merchantSignupForm = this.fb.group({
      step1: new FormGroup({
        differentName: this.differentName,
        alreadyCollecting: this.alreadyCollecting,
        merchantName: this.merchantName,
        companyNumber: this.companyNumber,
        companyName: this.companyName,
        creditorSchemeId: this.creditorSchemeId,
        currency: this.currency
      }),
      step2: new FormGroup({
        website: this.website,
        address: this.address,
        city: this.city,
        state: this.state,
        countryCode: this.countryCode,
        contactEmail: this.contactEmail,
        contactName: this.contactName
      }),
      step3: new FormGroup({
        differentContact: this.differentContact,
        estimatedCustomers: this.estimatedCustomers,
        estimatedAvgValue: this.estimatedAvgValue,
        estimatedMaxValue: this.estimatedMaxValue,
        frequency: this.frequency,
        iban: this.iban,
        reportContact: this.reportContact,
        reportEmail: this.reportEmail,
        reportPhone: this.reportPhone
      }),
      step4: new FormGroup({
        businessType: this.businessType,
        vatNumber: this.vatNumber
      })
    });

    const formChanges$ = this.merchantSignupForm.valueChanges.subscribe( formData => {
      let collecting = formData.step1.alreadyCollecting;
      let different = formData.step1.differentName;
      if(collecting && this.creditorSchemeId.disabled) {
        this.creditorSchemeId.enable();
      } else if(!collecting && this.creditorSchemeId.enabled) {
        this.creditorSchemeId.disable();
      }

      if(different && this.companyName.disabled) {
        this.companyName.enable();
      } else if(!different && this.companyName.enabled) {
        this.companyName.disable();
      }
    });

    this.easyFeesManager.getCurrenciesList().subscribe( res => {
      if(res.ok) {
        let currencies = res.json();
        this.CURRENCIES = currencies;
      } else {
        // Fallback to EURO
        this.CURRENCIES = ['EUR'];
      }
    }, e => {
      // Fallback to EURO
      this.CURRENCIES = ['EUR'];
      console.error(e);
    });

    this.recoverFormData();

    this.easyFeesManager.getCurrentStatus().subscribe( res => {
      console.log(res);
    }, e => {
      console.error(e);
    });
  }

  ngOnInit() {
  }

  recoverFormData() {
    let dependentKeys = ['creditorSchemeId', 'companyName'];
    let dependencyResolver = (key) => {
     let dependencies = {
        creditorSchemeId: 'alreadyCollecting',
        companyName: 'differentName'
      }
      return dependencies[key];
    };
    this.easyFeesManager.retreiveFormData().subscribe(res => {
      let recoveryData = res.json();
      let fields = Object.keys(recoveryData).filter(key => recoveryData[key]);
      console.log(recoveryData, fields);
      fields.forEach(key => {
        if(this.hasOwnProperty(key)) {
          try {
            if(dependentKeys.indexOf(key) !== -1) {
              console.log(key, recoveryData[key]);
              (<FormControl>this[dependencyResolver(key)]).setValue(true);
            }
            (<FormControl>this[key]).setValue(recoveryData[key]);
          } catch(e) {
            console.log(`Couldn't set ${key} value`);
          }
        }
      });
      this.merchantSignupForm.updateValueAndValidity();
    }, e => {
      console.error('Could not recover form: ', e);
    });
  }

  chooseOrgType() {
    this.showModal = true;
  }

  modalClosed(orgType: string) {
    this.showModal = false;
    if(orgType) {
      this.businessType.setValue(orgType);
    }
  }

  canSkip(): boolean {
    let formKey = 'step' + this.setupStep;
    let form = this.merchantSignupForm.get(formKey);

    return form && form.valid;
  }

  onDragOver(event) {
    this.highlightDropZone = true;
    return false;
  }

  onDragLeave(event) {
    this.highlightDropZone = false;
    return false;
  }

  onDragDrop(event) {
    event.preventDefault();
    this.highlightDropZone = false;

    let dataTransfer = event.dataTransfer;
    let files = dataTransfer.files;
    this.handleFiles(files);
  }

  onInputChange(event) {
    event.preventDefault();
    this.handleFiles(event.target.files);
  }

  selectFiles() {
    let nativeElement = this.fileInput.nativeElement;
    nativeElement.click();
  }

  handleFiles(files: FileList) {

    for(let i = 0; i < files.length; i++) {
      // Check extensions here
      this.uploadFiles.push(files[i]);
    }
    console.log(this.uploadFiles);
  }

  removeFile(index: any) {
    this.uploadFiles = [...this.uploadFiles.slice(0, index), ...this.uploadFiles.slice(index+1)];
  }

  composeForm() {
    let merchantForm = this.merchantSignupForm.value;
    let composed: TMerchantForm = Object.assign(
      {
        uploadFiles: this.uploadFiles
      },
      merchantForm['step1'],
      merchantForm['step2'],
      merchantForm['step3'],
      merchantForm['step4']
    );
    let excessiveKeys = ['alreadyCollecting', 'differentName', 'differentContact'];

    excessiveKeys.forEach(key => {
      delete composed[key];
    });

    this.easyFeesManager.submitSignupData(composed);
  }

  canSubmit() {
    return true;
  }

  getDocuments(): string[] {
    let type = this.COMPANY_TYPES.find( _type => {
      return _type.value === this.businessType.value;
    });
    return type ? type.documents : [];
  }
}
