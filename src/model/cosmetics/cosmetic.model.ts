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
    unlockRequirements: string

    constructor() {
        this.tag = "";
        this.name = "";
        this.image = "";
        this.unlockRequirements = "";
    }
}

class Variant {
    channel: string;
    type: string;
    options: Array<Option>

    constructor() {
        this.channel = "";
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

class Set {
    backendValue: string;
    value: string; //Set name
    text: string; //Description "part of x set"

    constructor() {
        this.backendValue = "";
        this.value = "";
        this.text = "";
    }
}

class Introduction {
    chapter: string;
    season: string;
    text: string; //"Introduced in chapter x, season y"
    backendValue: number;

    constructor() {
        this.chapter = "";
        this.season = "";
        this.text = "";
        this.backendValue = 0;
    }
}

export enum Gamemode {
    BattleRoyale = '0',
    RocketRacing = '1',
    Festival = '2',
    Other = '3'
}

export interface Cosmetic {
    id: string;
    added: string;
    cosmeticId?: string;
    name?: string;
    artist?: string;
    devname?: string;
    description: string;
    type: Type;
    rarity: Type;
    albumArt?: string;
    title?: string;
    variants?: Array<Variant>;
    series?: Series;
    set?: Set;
    introduction?: Introduction;
    //shop, no cosmetics
    /* regularPrice: number;
    finalPrice: number; */
    images: Images;
    gamemode: Gamemode;
    showcaseVideo?: string;
}

export class BrItem implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    artist?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    variants?: Variant[] | undefined;
    gamemode: Gamemode;
    set?: Set;
    introduction?: Introduction;
    series?: Series | undefined;
    showcaseVideo?: string | undefined;
    
    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
        this.variants = [];
        this.gamemode = Gamemode.BattleRoyale;
        this.set = new Set();
        this.introduction = new Introduction();
        this.series = new Series();
        this.showcaseVideo = "";
    }
    added: string;    
    albumArt?: string | undefined;
    title?: string | undefined;
}

export class Car implements Cosmetic {
    id: string;
    name?: string | undefined;
    devname?: string | undefined;
    artist?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    gamemode: Gamemode;

    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
        this.gamemode = Gamemode.RocketRacing;
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
    artist?: string | undefined;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    gamemode: Gamemode;

    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.description = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
        this.gamemode = Gamemode.Festival;
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
    gamemode: Gamemode;

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
        this.gamemode = Gamemode.Other;
    }
    added: string;
}

export class JamTrack implements Cosmetic {
    id: string;    
    name?: string | undefined;
    devname?: string | undefined;
    artist: string;
    description: string;
    type: Type;
    rarity: Type;
    images: Images;
    albumArt: string;
    title: string;
    gamemode: Gamemode;

    constructor() {
        this.id = "";
        this.added = "";
        this.name = "";
        this.devname = "";
        this.artist = "";
        this.description = "";
        this.albumArt = "";
        this.title = "";
        this.type = new Type();
        this.rarity = new Type();
        this.images = new Images();
        this.gamemode = Gamemode.Festival;
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
    gamemode: Gamemode;

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
        this.gamemode = Gamemode.Other;
    }
    added: string;
    albumArt?: string | undefined;
    title?: string | undefined;
}

export class Items {
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
