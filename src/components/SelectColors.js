import {ColorConsumer} from "../contexts/colors";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColors = () => {
    return (
        <div>
            <h2>색상을 선택하세요</h2>
            <ColorConsumer>
                {({actions}) => (
                    // 여기서 인자로받는 actions도 ColorBox와 같게 "Provider컴포넌트의 props중 value값"과 동일하다.
                    // SelectColors의 상위컴포넌트인 ColorProvider에서 value={여기다넣은거} prop을 받아오는 것! (App.js참고)

                    <div style={{display: 'flex'}}>
                        {colors.map(color => (
                            <div
                                key={color}
                                style={{
                                    background: color,
                                    width: '24px',
                                    height: '24px',
                                    cursor: 'pointer'
                                }}

                                onClick={() => actions.setColor(color)}
                                onContextMenu={e => {

                                    // onContextMenu : 마우스 우클릭이벤트 연결, 원래는 브라우저메뉴가 나타난다. preventDefault해줘서 막음
                                    e.preventDefault();
                                    actions.setSubcolor(color);
                                }}
                            ></div>
                        ))}
                    </div>
                )}
            </ColorConsumer>
            <hr/>
        </div>
    );
};

export default SelectColors;