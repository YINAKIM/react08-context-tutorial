import {Component} from "react";
import ColorContext from "../contexts/colors";

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

class SelectColorsClass extends Component {     // class컴포넌트에서
    static contextType = ColorContext;          // static contextType 사용

    handleSetColor = color => {                 // this.context는 현재 ColorContext의 value
        this.context.actions.setColor(color);   // setColor를 호출
    };

    handleSetSubcolor = subcolor => {
        this.context.actions.setSubcolor(subcolor);
    };



    render() {
        return (
            <div>
                <h2>색상을 선택하세요</h2>
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

                            onClick={() => this.handleSetColor(color)}
                            onContextMenu={e => {
                                e.preventDefault();
                                this.handleSetSubcolor(color);
                            }}
                        ></div>
                    ))}
                </div>
                <hr/>
            </div>
        );
    }
};

export default SelectColorsClass;