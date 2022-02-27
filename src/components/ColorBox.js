import ColorContext from "../contexts/colors"; // 내가 context로 등록한 값
import {ColorConsumer} from "../contexts/colors";
import {useContext} from "react";


const ColorBox = () => {
    const {state} = useContext(ColorContext);

    // useContext를 사용, Consumer컴포넌트의 child형태로 넣어서 사용하지 않고 그냥 사용가능
    return (
            <>
                <div
                    style={{
                        width: '64px',
                        height: '64px',
                        background: state.color
                    }}
                ></div>

                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        background: state.subcolor
                    }}
                ></div>
            </>
    );
};

export default ColorBox;
