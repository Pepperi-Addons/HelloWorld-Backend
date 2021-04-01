import jwt from 'jwt-decode';
import { PapiClient } from '@pepperi-addons/papi-sdk';
import { Injectable } from '@angular/core';

import {
    // PepAddonService, PepHttpService, PepDataConvertorService,
PepSessionService} from '@pepperi-addons/ngx-lib';
// import { PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
// import {AddonUUID} from '../../../../../addon.config.json';
@Injectable({ providedIn: 'root' })
export class AddonService {

    accessToken = '';
    parsedToken: any
    papiBaseURL = ''
    addonUUID;

    get papiClient(): PapiClient {
        return new PapiClient({
            baseURL: this.papiBaseURL,
            token: this.session.getIdpToken(),
            addonUUID: this.addonUUID,
            suppressLogging:true
        })
    }

    constructor(
        public session:  PepSessionService
        // public addonService:  PepAddonService
        // ,public httpService: PepHttpService
        // ,public pepperiDataConverter: PepDataConvertorService
        // ,public dialogService: PepDialogService
    ) {
        const accessToken = this.session.getIdpToken();
        this.parsedToken = accessToken ? jwt(accessToken) : {};
        this.papiBaseURL = this.parsedToken["pepperi.baseurl"];
    }

    // getAddon(): Promise<any>{
    //     return this.papiClient.addons.installedAddons.addonUUID(this.addonUUID).get();
    // }


}
