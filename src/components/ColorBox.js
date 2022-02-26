import ColorContext from "../contexts/colors"; // 내가 context로 등록한 값
import {ColorConsumer} from "../contexts/colors";


const ColorBox = () => {
    // context값은 props로 받아오는 것이 아니라, 해당 Context컴포넌트에 들어있는 [Consumer컴포넌트]를 통해 사용
    // Context.consumer의 자식은 함수가 와야한다. -> render props패턴의 적용
    // Render Props(Function as a child) 패턴 : 컴포넌트의 children이 있어야 할 자리에 값이 아닌 함수를 전달한다.

    return (
        <ColorConsumer>
            {value => (
                // 근데 Consumer의 "children함수"에 전달되는 value는 "Provider컴포넌트의 props중 value값"과 동일하다.
                // ColorBox의 상위컴포넌트인 ColorProvider에서 value={여기다넣은거} prop을 받아오는 것! (App.js참고)
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
