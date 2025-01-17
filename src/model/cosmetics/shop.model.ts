import { BrItem, Car, Instrument, JamTrack } from "./cosmetic.model";

class Bundle {
    name: string;
    info: string;
    image: string;

    constructor() {
        this.name = "";
        this.info = "";
        this.image = "";
    }
}

class Banner {
    value: string;
    intensity: string;
    backendValue: string;

    constructor() {
        this.value = "";
        this.intensity = "";
        this.backendValue = "";
    }
}

class OfferTag {
    id: string;
    text: string;

    constructor() {
        this.id = "";
        this.text = "";
    }
}

class Colors {
    color1: string;
    color2: string;
    color3: string;

    constructor() {
        this.color1 = "";
        this.color2 = "";
        this.color3 = "";
    }
}

export class ShopEntry {
    regularPrice: number;
    finalPrice: number;
    devName: string;
    offerId: string;
    outDate: string;
    bundle?: Bundle;
    banner?: Banner;
    offerTag: OfferTag;
    giftable: boolean;
    refundable: boolean;
    sortPriority: number;
    //layoutId: string;
    //layout
    colors: Colors;
    //tileSize
    //displayAssetPath 
    //newDisplayAssetPath string
    //newDisplayAsset object {4}
    brItems?: Array<BrItem>;
    tracks?: Array<JamTrack>;
    instruments?: Array<Instrument>;
    cars?: Array<Car>;
    //legoKits?

    constructor() {
        this.regularPrice = 0;
        this.finalPrice = 0;
        this.devName = "";
        this.offerId = "";
        this.outDate = "";
        this.offerTag = new OfferTag();
        this.giftable = false;
        this.refundable = false;
        this.sortPriority = 0;
        this.colors = new Colors();
        this.brItems = [];
        this.tracks = [];
        this.instruments = [];
        this.cars = [];
    }
}

export class Shop {
    entries: Array<ShopEntry>;

    constructor() {
        this.entries = [];                
    }
}