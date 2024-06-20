export interface Banner {
    id: number;
    title: string;
    description: string;
    image: string; //url로 받아올거라서
    url: string; //클릭시에 이동한 url
    target: string; //새창에서 열지 바로 열지
}
