import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/common/Title";
import { CartStyle } from "./Cart";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "../models/order.model";
import FindAddressButton from "../components/order/FindAddressButton";
import { order } from "../api/order.api";
import { useAlert } from "../hooks/useAlert";

interface DeliveryForm extends Delivery {
    addressDetail: string;
}

function Order() {
    //Cart와 레이아웃이 비슷하기 때문에 CartStyle을 가져와서 사용할 예정

    //location은 Cart에서 navigate로 보낸 데이터를 꺼낼 수 있다.
    const location = useLocation();

    const { showAlert, showConfirm } = useAlert();
    const navigate = useNavigate();

    //주문할 상품의 데이터
    const orderDataFromCart = location.state;

    const { totalPrice, totalQuantity, firstBookTitle } = orderDataFromCart;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<DeliveryForm>();

    const handlePay = (data: DeliveryForm) => {
        const orderData: OrderSheet = {
            ...orderDataFromCart,
            delivery: {
                ...data,
                address: `${data.address} ${data.addressDetail}`,
            },
        };

        //서버로 넘겨준다

        showConfirm("주문을 진행하시겠습니다?", () => {
            order(orderData).then(() => {
                showAlert("주문이 처리되었습니다.");
                navigate("/orderList");
            });
        });
    };

    return (
        <>
            <Title size="large">주문서 작성</Title>
            <CartStyle>
                <div className="content">
                    <div className="order-info">
                        <Title size="medium" color="text">
                            배송 정보
                        </Title>
                        <form className="delivery">
                            <fieldset>
                                <label>주소</label>
                                <div className="input">
                                    <InputText
                                        inputType="text"
                                        {...register("address", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                {/* 카카오에서 제공하는 우편번호 서비스를 사용한 버튼*/}
                                <FindAddressButton
                                    onCompleted={(address) => {
                                        setValue("address", address);
                                    }}
                                />
                            </fieldset>
                            {errors.address && (
                                <p className="error-text ">
                                    주소를 입력해주세요.
                                </p>
                            )}
                            <fieldset>
                                <label>상세 주소</label>
                                <div className="input">
                                    <InputText
                                        inputType="text"
                                        {...register("addressDetail", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </fieldset>
                            {errors.addressDetail && (
                                <p className="error-text ">
                                    상세주소를 입력해주세요.
                                </p>
                            )}
                            <fieldset>
                                <label>수령인</label>
                                <div className="input">
                                    <InputText
                                        inputType="text"
                                        {...register("receiver", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </fieldset>
                            {errors.receiver && (
                                <p className="error-text ">
                                    수령인을 입력해주세요.
                                </p>
                            )}
                            <fieldset>
                                <label>전화번호</label>
                                <div className="input">
                                    <InputText
                                        inputType="text"
                                        {...register("contact", {
                                            required: true,
                                        })}
                                    />
                                </div>
                            </fieldset>
                            {errors.contact && (
                                <p className="error-text ">
                                    전화번호를 입력해주세요.
                                </p>
                            )}
                        </form>
                    </div>
                    <div className="order-info">
                        <Title size="medium" color="text">
                            주문 상품
                        </Title>
                        <strong>
                            {`${firstBookTitle} 등 총 ${totalQuantity}권`}
                        </strong>
                    </div>
                </div>
                <div className="summary">
                    <CartSummary
                        totalPrice={totalPrice}
                        totalQuantity={totalQuantity}
                    />
                    <Button
                        size="large"
                        scheme="primary"
                        onClick={handleSubmit(handlePay)}
                    >
                        결제하기
                    </Button>
                </div>
            </CartStyle>
        </>
    );
}

export default Order;
