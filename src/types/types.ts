type Data = {
    readonly status: string,
    readonly totalResults: number,
    readonly articles: INews[],
    readonly sources?: ISources[],
}
interface INews extends Data {
    readonly author: string,
    readonly content: string,
    readonly description: string,
    readonly publishedAt: string,
    readonly source: Pick<ISources, 'id' | 'name'>,
    readonly title: string,
    readonly url: string,
    readonly urlToImage: string
}
interface ISources extends Data {
    readonly category: string,
    readonly country: string,
    readonly description: string,
    readonly language: string,
    readonly url: string,
    readonly id: string,
    readonly name: string
}
type Options = {
    readonly [sources: string]: string,
}
type Callback<T> = (data: T) => void;

enum Errors {
    Unauthorized = 401,
    NotFound = 404
}

export { INews, ISources, Options, Callback, Errors }