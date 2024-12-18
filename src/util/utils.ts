import { Cosmetic } from "../model/cosmetics/cosmetic.model";

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

    static getItemSeriesBackground(item: Cosmetic): string {
        if (item.series && item.series.image) {
            return 'url(' + item.series.image + ')';
        } else {
            return '';
        }
    }
}