import './sources.css';
import { ISources } from './../../../types/types';

class Sources {
    draw(data: ISources[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment()
        const sourceItemTemp: HTMLTemplateElement  = document.querySelector('#sourceItemTemp') as HTMLTemplateElement

        data.forEach((item: ISources): void => {
            const sourceClone: HTMLTemplateElement = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
            
            fragment.append(sourceClone);
        });
        
        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
