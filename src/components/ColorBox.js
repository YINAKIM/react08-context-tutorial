import ColorContext from "../contexts/colors"; // 내가 context로 등록한 값


const ColorBox = () => {
    // context값은 props로 받아오는 것이 아니라, 해당 Context컴포넌트에 들어있는 [Consumer컴포넌트]를 통해 사용

    return (
        <ColorContext.Consumer>
            {value => (
                // {value => ()}
                // Render Props(Function as a child) 패턴 : 컴포넌트의 children이 있어야 할 자리에 값이 아닌 함수를 전달한다.
                <div
                style={{
                    width: '64px',
                    height: '64px',
                    background: value.color
                }}
                ></div>
            )}
        </ColorContext.Consumer>
    );
};

export default ColorBox;
