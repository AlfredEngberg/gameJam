export default class Preloader {
    constructor() {
        this.assets = {};
        this.totalAssets = 0;
        this.loadedAssets = 0;
    }

    addAsset(key, url, type) {
        this.assets[key] = { url, type, data: null };
        this.totalAssets++;
    }

    load(onComplete, onProgress) {
        for (let key in this.assets) {
            let asset = this.assets[key];
            switch (asset.type) {
                case 'image':
                    this.loadImage(key, asset.url, onComplete, onProgress);
                    break;
                case 'sound':
                    this.loadSound(key, asset.url, onComplete, onProgress);
                    break;
                case 'json':
                    this.loadJson(key, asset.url, onComplete, onProgress);
                    break;
                default:
                    console.error(`Unknown asset type: ${asset.type}`);
            }
        }
    }

    loadImage(key, url, onComplete, onProgress) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            this.assetLoaded(key, img, onComplete, onProgress);
        };
    }

    loadSound(key, url, onComplete, onProgress) {
        const audio = new Audio();
        audio.src = url;
        audio.onloadeddata = () => {
            this.assetLoaded(key, audio, onComplete, onProgress);
        };
    }

    loadJson(key, url, onComplete, onProgress) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.assetLoaded(key, data, onComplete, onProgress);
            });
    }

    assetLoaded(key, data, onComplete, onProgress) {
        this.assets[key].data = data;
        this.loadedAssets++;
        if (onProgress) onProgress(this.loadedAssets / this.totalAssets);
        if (this.loadedAssets === this.totalAssets && onComplete) onComplete(this.assets);
    }
}
