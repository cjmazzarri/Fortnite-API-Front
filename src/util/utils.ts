import { Bean, BrItem, Car, Cosmetic, Instrument, JamTrack, LegoSkin, Type } from "../model/cosmetics/cosmetic.model";

//Contains utility functions which are used in more than 1 component
export class Utils {

    static formatGradientColors(colorGradient: string[]): string {
        if (colorGradient.length > 0) {
            let addedHashtag = colorGradient.map(color => '#' + color);
            let gradientString = addedHashtag.join(',');
            return gradientString;
        } else return '';
    }

    static getItemColorGradient(item: Cosmetic): Array<string> {
        if (item.series) {
            return item.series.colors;
        } else {
            return [];
        }
    }

    static formatItemSeriesBackground(item: Cosmetic): string {
        if (item.series && item.series.image) {
            return 'url(' + item.series.image + ')';
        } else {
            return '';
        }
    }

    static getBrItemVariants(item: BrItem | Cosmetic): Array<string | undefined> {
        let variants: Array<string | undefined> = [];
        if (item.variants) {
            for (let channel of item.variants) {
                for (let option of channel.options) {
                    variants.push(option.image);
                }
            }
            return variants;
        } else {
            return [];
        }
    }

    static isBrItem(item: BrItem | Car | Instrument | JamTrack): boolean {
        if (item.type && item.type.value) {
            return item.type.value === 'outfit' ||
                item.type.value === 'backpack' ||
                item.type.value === 'pickaxe' ||
                item.type.value === 'wrap' ||
                item.type.value === 'emote' ||
                item.type.value === 'glider' ||
                item.type.value === 'contrail' ||
                item.type.value === 'emoji' ||
                item.type.value === 'loadingscreen' ||
                item.type.value === 'spray' ||
                item.type.value === 'shoe' ||
                item.type.value === 'petcarrier' ||
                item.type.value === 'pet'
        } else return false;
    }

    static checkImageType(item: Cosmetic): string | undefined {
        let imgPath: string | undefined = '';
        if (item.type) {
            switch (item.type.value) {
                case 'backpack':
                case 'emote':
                case 'loadingscreen':
                case 'pickaxe':
                case 'spray':
                case 'wrap':
                case 'outfit':
                case 'contrail':
                case 'glider':
                case 'music':
                case 'banner':
                case 'aura':
                case 'shoe':
                case 'petcarrier':
                case 'pet':
                    if (item.images.icon) {
                        imgPath = item.images.icon
                    } else {
                        imgPath = item.images.smallIcon;
                    }
                    break;

                case 'emoji':
                    imgPath = item.images.smallIcon;
                    break;

                //Car related cosmetics
                case 'drifttrail':
                case 'booster':
                case 'skin':
                case 'body':
                case 'wheel':
                    if (item.images) {
                        if (item.images.large) {
                            imgPath = item.images.large;
                        } else {
                            imgPath = item.images.small;
                        }
                    }
                    break;

                //Festival cosmetics
                case 'mic':
                case 'bass':
                case 'guitar':
                case 'keyboard':
                case 'drum':
                    imgPath = item.images.large;
                    break;
            }
        } else {
            return item.albumArt;
        }
        return imgPath;
    }

    static getCosmeticType(item: Cosmetic): Type {
        //jam tracks don't have the type property
        if (!item.type) {
            let type = new Type();
            type.value = 'jamtrack';
            type.displayValue = 'Jam Track';
            return type;
        }
        else return item.type;
    }

    static getBrItemImages(item: BrItem | Cosmetic, legoSkins: Array<LegoSkin>, beans: Array<Bean>): Array<string | undefined> {
        let imgArray: Array<string | undefined> = [];
        item.type.value == 'emoji' ? imgArray.push(item.images.smallIcon) : imgArray.push(item.images.icon);
        let legoStyle = legoSkins.find(skin => skin.cosmeticId == item.id);
        if (legoStyle) {
            if (legoStyle.images && legoStyle.images.large) {
                imgArray.push(legoStyle.images.large);
            }
        }
        let bean = beans.find(skin => skin.cosmeticId == item.id);
        if (bean) {
            imgArray.push(bean.images.large);
        }
        return imgArray;
    }
}