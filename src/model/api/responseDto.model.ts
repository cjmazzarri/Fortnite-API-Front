export class ResponseDto<T> {
    status: number;
    data: T;
    error?: string;

    constructor() {
        this.status = 0;
        this.data = {} as T;
    }
}