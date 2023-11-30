import BrandByProdModel from './BrandByProdModel';
import BrandModel from './BrandModel';

export default interface IBrandState {
  readonly data: BrandModel[];
  readonly dataBrand: BrandByProdModel[];
  readonly error: boolean;
  readonly refreshPage: boolean;
}
