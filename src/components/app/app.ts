import AppController from '../controller/controller';
import AppLoader from './../controller/appLoader';
import { AppView } from '../view/appView';
import { INews, ISources } from './../../types/types'

class App {
    private controller: AppController;
    private view: AppView;
    private appLoader: AppLoader;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.appLoader = new AppLoader();
    }

    async start(): Promise<void> {
        
        (document
            .querySelector('.sources') as HTMLElement)
            .addEventListener('click', (e) => this.controller.getNews(e, (data: ISources | INews) => {
                this.view.drawNews(data)
            }));
            
        await this.controller.getSources((data: ISources | INews) => {
            this.view.drawSources(data)

            const sourceId = 'time';
            this.appLoader.getResp(
                {
                    endpoint: 'everything',
                    options: {
                        sources: sourceId,
                    },
                },
                (data: ISources | INews) => {
                    this.view.drawNews(data)
                }
            );

        });

        const sourceItems = document.querySelectorAll('.source__item');
        const searchInput = document.querySelector('.input') as HTMLInputElement;
        
        searchInput.addEventListener('input', (e) => {
            const value = (e.target as HTMLInputElement).value;
            const filtered = [...sourceItems].filter((item) => !item.textContent?.trim().toLowerCase().includes(value.toLowerCase()))

            for (const item of sourceItems) {
                if (filtered.includes(item)) {
                    (item as HTMLElement).style.display = 'none';
                } else {
                    (item as HTMLElement).style.display = 'block';
                }
            }
        });
    }
}

export default App;
