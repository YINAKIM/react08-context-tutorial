import {ColorConsumer} from "../contexts/colors";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const SelectColors = () => {
    return (
        <div>
            <h2>색상을 선택하세요</h2>
            <ColorConsumer>
                {({actions}) => (
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