/**
 * Describes a basic person type
 */
export type TPerson = {
  id:string;
  name:string;
  picture:string;
  firstLogin?:boolean;
  [propName:string]:any;
}
/**
 * Describes a Navigation Route for NavbarSmallComponent
 */
export type TNavRoute = {
  path:string;
  link:string;
};
/**
 * Describes a Room
 */
export type TRoom = {
  id:string;
  name:string;
  ageGroup:string;
  capacity:number;
  ecceCapitations:string;
  selected?:boolean;
}
/**
 * Describes a Grant
 */
export type TGrant = {
  id:string;
  name: string;
  capitation: string;
  normalFee: number;
  monthly: boolean;
  room: string;
  roomId: string;
  annualModel: string;
  startDate: number;
  status: boolean;
  days: string[];
  extras: any;
}
/**
 * Describes an Authorization State
 */
export type TAuthState = {
  authorized: boolean;
  token?: string;
};
/**
 * Enum for Attendance States
 */
export enum AttendanceStates {
  IN,
  OUT,
  ABSENT,
  UNKNOWN
}
/**
 * Describes Form used in Easy Fee's setup
 */
export type TMerchantForm = {
  merchantName: string;
  businessType: string;
  currency: string;
  companyNumber?: string; // if applicable
  registeredName?: string; // if different
  creditorSchemeId?: string; // if already collecting

  website?: string;
  address: string;
  city: string;
  countryCode: string; // 2-digit international
  contactName: string;
  contactEmail: string;

  estimatedCustomers: number;
  estimatedAvgValue: number;
  estimatedMaxValue: number;
  frequency: string;
  iban: string;
  reportContact?: string; //if different
  reportEmail?: string; //if different
  reportPhone?: string; // optional

  vatNumber?: string; // if applicable
  uploadFiles: File[]
}
/**
 * Describes Options used for FlexCard component
 * If caption is not provided capitalized value is used instead.
 */
export type TFlexOptions = {
  shadow?: number;
  tooltips: [
    {
      value:string;
      caption?:string;
      sortTransform?: Function;
      className?:string;
      inactive?:boolean;
    }
  ]
}
