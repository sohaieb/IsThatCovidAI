let singleton: HttpClient;
type GeneralObject = {[prop:string]: string};
export default class HttpClient {
    private url: any;
    private readonly headers: any;
    private body: object|FormData|string|GeneralObject;
    private readonly method: string;

    private constructor({url, body, headers, method}: {url?:string, body?:object, headers?: object, method?:string}) {
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
    static getInstance({url, body, headers, method}: {url?:string, body?:object, headers?: object, method?:string}) {
        if(!singleton){
            singleton = new HttpClient({url, body, headers, method});
        }
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
            config.body = this.body;
            console.log(config.body);
        }
        if(this.headers && this.headers.length){
            config.headers = this.headers;
        }
        return fetch(this.url,config)
            .then(response => response.json())
            .catch(error => error);
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
