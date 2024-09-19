class Type {
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

class Variant {
    name: string;
    image: string;

    constructor() {
        this.name = "";
        this.image = "";
    }
}

class Variants {
    options: Array<Variant>;

    constructor() {
        this.options = [];
    }
}

export interface Cosmetic { //brItem, instrument, 
    id: string;
    name?: string;
    devname?: string;
    description: string;
    type: Type;
    rarity: Type;
    albumArt?: string;
    title?: string;
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
    variants: Variants;    

    constructor() {
        this.id = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
        this.variants = new Variants();
    }
}

export class Car implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    //TODO: +campos

    constructor() {
        this.id = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
}

export class Instrument implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    //TODO: +campos

    constructor() {
        this.id = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
}

export class Bean implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    //TODO:+ campos

    constructor() {
        this.id = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
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
    //TODO: + campos

    constructor() {
        this.id = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.albumArt = "";
        this.title = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
}

export class LegoSkin implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;

    constructor() {
        this.id = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
    }
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
