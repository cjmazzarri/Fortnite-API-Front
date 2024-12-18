export class Utils {

    static getGradientColors(colorGradient: string[]) {
        if (colorGradient.length > 0) {
            let addedHashtag = colorGradient.map(color => '#' + color);
            let gradientString = addedHashtag.join(',');
            return gradientString;
        } else return '';
    }
}