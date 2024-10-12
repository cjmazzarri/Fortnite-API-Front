export class Type {
    value: string;
    displayValue: string;

    constructor() {
        this.value = '';
        this.displayValue = '';
    }
}

class BeanImg {
    large: string;
    small: string;

    constructor() {
        this.large = "";
        this.small = "";
    }
}

class LegoImg {
    large: string;
    small: string;

    constructor() {
        this.large = "";
        this.small = "";
    }
}

class Images {
    smallIcon?: string;
    icon?: string;
    featured?: string;
    small?: string; //instruments
    large?: string; //instruments
    bean?: BeanImg;
    lego?: LegoImg;

    constructor() {
        this.smallIcon = "";
        this.icon = "";
        this.featured = "";
        this.small = "";
        this.large = "";
    }
}

class Option {
    tag: string;
    name: string;
    image: string;

    constructor() {
        this.tag = "";
        this.name = "";
        this.image = "";
    }
}

class Channel {
    parts: string;
    type: string;
    options: Array<Option>

    constructor() {
        this.parts = "";
        this.type = "";
        this.options = [];
    }
}

class Series {
    backendValue: string;
    colors: Array<string>;
    image?: string;
    value: string; //Series name

    constructor() {
        this.backendValue = "";
        this.colors = [];
        this.image = "";
        this.value = "";
    }
}

export interface Cosmetic {
    id: string;
    added: string;
    cosmeticId?: string;
    name?: string;
    devname?: string;
    description: string;
    type: Type;
    rarity: Type;
    albumArt?: string;
    title?: string;
    variants?: Array<Channel>;
    series?: Series;
    //shop, no cosmetics
    /* regularPrice: number;
    finalPrice: number; */
    images: Images;
}

export class BrItem implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    variants?: Channel[] | undefined;
    
    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
        this.variants = []
    }
    added: string;    
    albumArt?: string | undefined;
    title?: string | undefined;
}

export class Car implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;

    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
    added: string;
    cosmeticId?: string | undefined;
    albumArt?: string | undefined;
    title?: string | undefined;
}

export class Instrument implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;

    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
    added: string;
    cosmeticId?: string | undefined;
    albumArt?: string | undefined;
    title?: string | undefined;
}

export class Bean implements Cosmetic {
    id: string;
    cosmeticId?: string | undefined;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;

    constructor() {
        this.id = "";
        this.added = "";
        this.cosmeticId = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
    added: string;
    albumArt?: string | undefined;
    title?: string | undefined;
}

export class JamTrack implements Cosmetic {
    id: string;    
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    albumArt: string;
    title: string;

    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.albumArt = "";
        this.title = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
    added: string;
    cosmeticId?: string | undefined;
}

export class LegoSkin implements Cosmetic {
    id: string;
    cosmeticId?: string | undefined;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;

    constructor() {
        this.id = "";
        this.added = "";
        this.cosmeticId = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
    added: string;
    albumArt?: string | undefined;
    title?: string | undefined;
}

class Items {
    br: Array<BrItem>;
    cars: Array<Car>;
    instruments: Array<Instrument>;
    tracks: Array<JamTrack>
    beans: Array<Bean>;
    lego: Array<LegoSkin>;
    //lego
    //legokits?

    constructor() {
        this.br = [];
        this.cars = [];
        this.instruments = [];
        this.tracks = [];
        this.beans = [];
        this.lego = [];
    }
}

export class CosmeticList {
    items: Items;

    constructor() {
        this.items = new Items();
    }
}
