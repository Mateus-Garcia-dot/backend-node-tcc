export class Shape {

    constructor(sentido: string, latitude: number, longitude: number) {
        this.sentido = sentido;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    sentido: string;
    latitude: number;
    longitude: number;
}