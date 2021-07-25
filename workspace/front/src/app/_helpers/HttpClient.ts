import {GeneralObject, HttpRequestBody} from "../_types/GlobalTypes";

let singleton: HttpClient;
export default class HttpClient {
    private url: any;
    private headers: any;
    private body: HttpRequestBody;
    private method: string;

    private constructor() {

    }

    /**
     * Override configuration
     *
     * @param url
     * @param body
     * @param headers
     * @param method
     */
    setConfig({url, body, headers = {
        'Content-Type': 'application/json'
    }, method}: {url?:string, body?:HttpRequestBody, headers?: object, method?:string}) {
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.method = method;
    }

    /**
     * Get Singleton instance of HttpClient Service
     *
     * @param url
     * @param body
     * @param headers
     * @param method
     */
    static getInstance({url, body, headers, method}: {url?:string, body?:HttpRequestBody, headers?: object, method?:string}) {
        if(!singleton){
            singleton = new HttpClient();
        }
        singleton.setConfig({url,body,headers,method});
        return singleton;
    }

    /**
     * Run request
     */
    run(): Promise<any> {
        let config: RequestInit | any = {
            method: this.method
        };
        if(this.body){
            this.jsonify();
            config.body = JSON.stringify(this.body);
        }
        if(this.headers && Object.keys(this.headers).length){
            config.headers = this.headers;
        }
        return fetch(this.url,config)
            .then(response => {
                if(response.status / 100 === 2){
                    return response;
                }
                throw response;
            })
            .catch((error:Error) => error);
    }

    /**
     * Convert FormData to json
     */
    jsonify() {
        let obj : GeneralObject  = {};
        if(this.body instanceof FormData){
            this.body.forEach((value: any, key: any) => {
                obj[key] = value;
            });
            this.body = obj;
        }
    }
}
