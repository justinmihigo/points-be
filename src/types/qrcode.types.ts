export interface IQrcode{
    isScanned: boolean;
    data?:string;
    type: "registration" | "points";
}