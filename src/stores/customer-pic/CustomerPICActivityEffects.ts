import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerPICModel from "./models/CustomerPICModel";

export const requestGetCustomerPIC = async (customerSettingID:number) : Promise<CustomerPICModel | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/CustomerPIC?CustomerSettingID=' + customerSettingID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<CustomerPICModel>(
        CustomerPICModel,
        endpoint
    );  
}