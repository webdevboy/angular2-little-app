import { environment } from '../../environments/environment';
/**
 * List all the API endpoints, to be used by the services.
 */
export class LiteAppAPI {

    private static get API_BASE_LOCAL(): string             { return 'http://localhost:8080'; }
    private static get API_BASE():string                    {
      return environment.local ? LiteAppAPI.API_BASE_LOCAL : 'https://legapi.littlevista.net';
    }
    private static get PARENT_APP_BASE():string             { return LiteAppAPI.API_BASE + '/lite'; }

    public static get AUTH_ENDPOINT():string                { return LiteAppAPI.API_BASE + '/auth'; }
    public static get REGISTER_ENDPOINT():string            { return LiteAppAPI.API_BASE + '/register'; }
    public static get VERIFICATION_ENDPOINT():string        { return LiteAppAPI.API_BASE + '/register/confirm'; }

    public static UPDATE_SUBVENTION(id):string              { return LiteAppAPI.PARENT_APP_BASE + '/subvention/child/' + id; }
    public static get ECCE_CHILDREN_ENDPOINT():string       { return LiteAppAPI.PARENT_APP_BASE + '/ecce/children/'; }
    public static get UPDATE_ECCE_STATUS_ENDPOINT():string  { return LiteAppAPI.PARENT_APP_BASE + '/ecce/status/'; }
    public static get UPDATE_ECCE_DAYS_ENDPOINT():string    { return LiteAppAPI.PARENT_APP_BASE + '/ecce/days/'; }
    public static get UPDATE_ECCE_START_ENDPOINT():string   { return LiteAppAPI.PARENT_APP_BASE + '/ecce/start/'; }
    public static get UPDATE_ECCE_EXTRAS_ENDPOINT():string  { return LiteAppAPI.PARENT_APP_BASE + '/ecce/extras/'; }
    public static get ECCE_ATTENDANCE_ENDPOINT():string     { return LiteAppAPI.PARENT_APP_BASE + '/ecce/attendance/'; }

    public static get IMAGE_ENDPOINT():string               { return 'https://littlevista.net/app/image'; }

    public static get FACILITY_ENDPOINT():string            { return LiteAppAPI.PARENT_APP_BASE; }
    public static get FACILITY_PROFILE_ENDPOINT():string    { return LiteAppAPI.PARENT_APP_BASE + '/centre'; }
    public static get ROOMS_ENDPOINT():string               { return LiteAppAPI.PARENT_APP_BASE + '/rooms'; }
    public static get CHILDREN_ENDPOINT():string            { return LiteAppAPI.PARENT_APP_BASE + '/children'; }
    public static get FAMILY_ENDPOINT():string              { return LiteAppAPI.PARENT_APP_BASE + '/family'; }

    public static ATTENDANCE_CHECK(id):string               { return LiteAppAPI.PARENT_APP_BASE + '/attendance/' + id; }
    public static get ATTENDANCE_REPORT():string            { return LiteAppAPI.PARENT_APP_BASE + '/attendance/report'; }


    public static get MERCHANT_SIGNUP():string              { return LiteAppAPI.PARENT_APP_BASE + '/payments/merchant/signup'; }
    public static get MERCHANT_FORM():string                { return LiteAppAPI.MERCHANT_SIGNUP + '/form'; }
    public static get MERCHANT_STATUS():string              { return LiteAppAPI.MERCHANT_SIGNUP + '/status'; }
    public static get MERCHANT_CURRENCY():string            { return LiteAppAPI.PARENT_APP_BASE + '/payments/config/currencies';}


}
