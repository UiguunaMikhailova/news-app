import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'dc1fc624ef0046fc97371261f7d63d38', // получите свой ключ https://newsapi.org/ dc1fc624ef0046fc97371261f7d63d38
        });
    }
}

export default AppLoader;
