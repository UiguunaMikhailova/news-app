import AppLoader from './appLoader';
import { INews, ISources, Callback } from './../../types/types';
class AppController extends AppLoader {
    getSources(callback: Callback<ISources | INews>): Promise<void> {
        return super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: Callback<ISources | INews>): void {
        let target: Element = e.target as Element;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;
        
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as Element
        }
    }
}

export default AppController;