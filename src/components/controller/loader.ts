import { INews, ISources, Options, Callback, Errors } from './../../types/types';

class Loader {
    private baseLink: string;
    private options: Record<string, string>;
    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint = '', options = {} },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        callback = (data: ISources | INews): void => {
            console.error('No callback for GET response');
        }
    ): Promise<void> {
        return this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === Errors.Unauthorized || res.status === Errors.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint = ''): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        
        return url.slice(0, -1);
    }

    load(method: string,
        endpoint: string,
        callback: Callback<ISources | INews>,
        options = {}): Promise<void> {
        return fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res): Promise<ISources | INews> => res.json())
            .then((data: ISources | INews) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;