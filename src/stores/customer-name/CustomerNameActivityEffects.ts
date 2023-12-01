import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerNameModel from "./models/CustomerNameModel";

export const requestSearchCustomerName = async (search: string): Promise<CustomerNameModel | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/Customer?Name=' + search;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<CustomerNameModel>(
        CustomerNameModel,
        endpoint
    );
}