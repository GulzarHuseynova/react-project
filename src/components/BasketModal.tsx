import { Modal, Button, Typography, Divider, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { useMemo } from "react";

import {
    removeFromBasket,
    clearBasket,
    incrementCartItem,
    decreaseCartItem,
} from "../redux/BasketSlice";

const { Text, Title } = Typography;

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function BasketModal({
    open,
    onClose,
}: Props) {

    const basket = useSelector(
        (state: RootState) => state.basket.items
    );
    const dispatch = useDispatch();

    const totalPrice = useMemo(() => {
        return basket.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );
    }, [basket]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            title={
                <Title
                    level={4}
                    style={{ margin: 0 }}
                >
                    🛒 Shopping Basket
                </Title>
            }
            width={450}
            style={{
                top: 0,
                right: 0,
                position: "fixed",
                margin: 0,
            }}
            styles={{
                body: {
                    height: "calc(100vh - 55px)",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 16,
                }}
            >
                {basket.length === 0 ? (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#aaa",
                        }}
                    >
                        <div style={{ fontSize: 40 }}>
                            🛒
                        </div>

                        <Title
                            level={5}
                            style={{ color: "#999" }}
                        >
                            Your basket is empty
                        </Title>

                        <Text type="secondary">
                            Start adding products
                        </Text>
                    </div>
                ) : (
                    <Space
                        orientation="vertical"
                        style={{ width: "100%" }}
                        size={12}
                    >
                        {basket.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    padding: 12,
                                    border: "1px solid #f0f0f0",
                                    borderRadius: 12,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    background: "#fff",
                                    transition: "0.2s",
                                }}
                                onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "0 4px 12px rgba(0,0,0,0.08)")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "none")
                                }
                            >
                                <div>
                                    <Text strong>
                                        {item.title}
                                    </Text>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            gap: 8,
                                            marginTop: 8,
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                dispatch(
                                                    decreaseCartItem(
                                                        item.id
                                                    )
                                                )
                                            }
                                        >
                                            -
                                        </Button>

                                        <Text strong>
                                            {item.quantity}
                                        </Text>

                                        <Button
                                            size="small"
                                            onClick={() =>
                                                dispatch(
                                                    incrementCartItem(
                                                        item.id
                                                    )
                                                )
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        textAlign: "right",
                                    }}
                                >
                                    <Text
                                        strong
                                        style={{
                                            display: "block",
                                        }}
                                    >
                                        {item.price *
                                            item.quantity}
                                        $
                                    </Text>

                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: 12,
                                        }}
                                    >
                                        {item.price}$ each
                                    </Text>

                                    <br />

                                    <Button
                                        danger
                                        size="small"
                                        style={{
                                            marginTop: 6,
                                        }}
                                        onClick={() =>
                                            dispatch(
                                                removeFromBasket(
                                                    item.id
                                                )
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </Space>
                )}
            </div>

            {basket.length > 0 && (
                <div
                    style={{
                        borderTop:
                            "1px solid #f0f0f0",
                        padding: 24,
                        background: "#fff",
                    }}
                >
                    <Divider
                        style={{
                            margin: "0 0 10px 0",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Title
                            level={5}
                            style={{ margin: 0 }}
                        >
                            Total:
                        </Title>

                        <Title
                            level={5}
                            style={{
                                margin: 0,
                                color: "#1677ff",
                            }}
                        >
                            {totalPrice}$
                        </Title>
                    </div>

                    <Space
                        style={{
                            width: "100%",
                            marginTop: 12,
                        }}
                    >
                        <Button
                            danger
                            block
                            onClick={() =>
                                dispatch(clearBasket())
                            }
                        >
                            Clear
                        </Button>

                        <Button
                            type="primary"
                            block
                        >
                            Checkout
                        </Button>
                    </Space>
                </div>
            )}
        </Modal>
    );
}