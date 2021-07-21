let singleton: HttpClient;

export default class HttpClient {
    private url: any;
    private readonly headers: any;
    private readonly body: any;
    private readonly method: string;

    private constructor({url, body, headers, method}: {url?:string, body?:object, headers?: object, method?:string}) {
        this.url = url;
        this.headers = headers;
        this.body = body;
        this.method = method;
    }

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
        let config: RequestInit = {
            method: this.method
        };
        if(this.body){
            config.body = this.body;
        }
        if(this.headers && this.headers.length){
            config.headers = this.headers;
        }
        return fetch(this.url,config)
            .then(response => response.json())
            .catch(error => error);
    }
}
