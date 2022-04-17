import { CheckOut } from './check-out.model';
import { ResponseSeo } from './response-seo.model';

export interface ResponseHeader {  processInfo: CheckOut;  methodInfo: CheckOut;  responseSeo: ResponseSeo;}