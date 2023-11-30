import FunnelModel from './FunnelModel';
//import SalesFunnelActivityModel from "./SalesFunnelActivityModel";
import ProductServiceModel from '../../funnel-product-service/models/ProductServiceModel';
import FunnelHeaderNameModel from './FunnelHeaderNameModel';
import AttachmentModel from 'stores/attachment/models/AttachmentModel';

export default class FunnelsModel {
  public SalesFunnel: FunnelModel = new FunnelModel({});
  public SalesFunnelItems: ProductServiceModel[] = [];
  public FileFunnelAttachment: AttachmentModel[] = [];
  //public SalesFunnelActivity:SalesFunnelActivityModel[] = [];
  public FunnelHeaderName: FunnelHeaderNameModel = new FunnelHeaderNameModel({});
}
