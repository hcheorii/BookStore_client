import Button from "../common/Button";
import { useEffect } from "react";

interface Props {
    onCompleted: (address: string) => void;
}

const SCRIPT_URL =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function FindAddressButton({ onCompleted }: Props) {
    const handleOpen = () => {
        new window.daum.Postcode({
            oncomplete: (data: any) => {
                onCompleted(data.address as string);
            },
        }).open();
    };

    useEffect(() => {
        const script = document.createElement("script"); //스크립트 태그라고 보면된다.
        script.src = SCRIPT_URL;
        script.async = true;
        document.head.appendChild(script);
        //<head><script src='URL'></script></head>

        return () => {
            document.head.removeChild(script);
        };
    }, []);
    return (
        <Button
            type="button"
            //이걸 해주는 이유는 우리가 지금 form사이에 버튼을 뒀기 때문에
            //자동으로 제출이 되게 된다.. 그것을 방지하기 위함
            size="medium"
            scheme="normal"
            onClick={handleOpen}
        >
            주소 찾기
        </Button>
    );
}

export default FindAddressButton;
