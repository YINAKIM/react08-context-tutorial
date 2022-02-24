import ColorContext from "../contexts/colors"; // 내가 context로 등록한 값
import {ColorConsumer} from "../contexts/colors";


const ColorBox = () => {
    // context값은 props로 받아오는 것이 아니라, 해당 Context컴포넌트에 들어있는 [Consumer컴포넌트]를 통해 사용


    // ColorContext.Consumer를 export했으므로 단독사용 가능해짐
    return (
        <ColorConsumer>
            {value => (
                // {value => ()}
                // Render Props(Function as a child) 패턴 : 컴포넌트의 children이 있어야 할 자리에 값이 아닌 함수를 전달한다.
                <>
                    <div
                        style={{
                            width: '64px',
                            height: '64px',
                            background: value.state.color
                        }}
                    ></div>

                    <div
                        style={{
                            width: '32px',
                            height: '32px',
                            background: value.state.subcolor
                        }}
                    ></div>
                </>
            )}
        </ColorConsumer>
    );
};

export default ColorBox;
