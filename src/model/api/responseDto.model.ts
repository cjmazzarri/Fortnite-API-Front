export class ResponseDto<T> {
    status: number;
    data: T;

    constructor() {
        this.status = 0;
        this.data = {} as T;
    }
}