import News from './news/news';
import Sources from './sources/sources';
import { INews, ISources } from './../../types/types';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ISources | INews): void {
        const values: INews[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISources | INews): void {
        const values: ISources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
