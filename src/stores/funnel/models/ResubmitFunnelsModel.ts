import ProductServiceModel from '../../funnel-product-service/models/ProductServiceModel';
import ResubmitFunnelModel from './ResubmitFunnelModel';
import ResubmitFunnelHeaderNameModel from './ResubmitFunnelHeaderNameModel';

export default class ResubmitFunnelsModel {
  public remark: string = '';
  public SalesFunnel: ResubmitFunnelModel = new ResubmitFunnelModel({});
  public FunnelHeaderName: ResubmitFunnelHeaderNameModel = new ResubmitFunnelHeaderNameModel({});
  public SalesFunnelItems: ProductServiceModel[] = [];
}
