import { useState } from "react";

function App() {
    const imageSize = 120; // 이미지 사이즈

    /* 관리해야 할 상태(state) 정의 */
    const [color, setColor] = useState('blue'); // 차량 색상 영문 이름
    const [year, setYear] = useState(2024); // 차량 생산 년도
    const [model, setModel] = useState('avante'); // 차량 모델
    const [image, setImage] = useState('avante'); // 차량 이미지
    const [comment, setComment] = useState('나름 좋아요.'); // 년식에 따른 차량에 대한 코멘트
    const [modelName, setModelName] = useState('아반떼(avante)'); // 한글 이름과 함께 보여줄 state

    // 중첩 배열을 사용한 Map 객체 정의
    const carMap = new Map([
        ['avante', '아반떼'],
        ['sonata', '소나타'],
        ['grandeur', '그랜져'],
    ]);

    const ChangeTest = (event) => {
        const targetId = event.target.id;
        console.log('이벤트 발생 객체 id : ' + targetId);

        const targetValue = event.target.value;
        console.log('이벤트 타겟 값 : ' + targetValue);

        if (targetId === 'model') {
            setImage(targetValue);
            setModel(targetValue);

            // get(key) : key를 사용하여 해당 요소의 value를 반환 받습니다.
            const message = `${carMap.get(targetValue)}(${targetValue})`;
            setModelName(message);

        } else if (targetId === 'color') {
            setColor(targetValue);

        } else if (targetId === 'year') {
            setYear(targetValue);

            let mycomment = '';

            if (targetValue === '2025') {
                mycomment = '신차입니다.';

            } else if (targetValue === '2024') {
                mycomment = '나름 좋아요.';

            } else if (targetValue === '2023') {
                mycomment = '구형차입니다.';

            } else {

            }
            setComment(mycomment);

        } else {

        }
    }

    return (
        <div className="App">
            <h1>내 차 정보</h1>
            <p>
                자동차의 종류에 따라서, 이미지 변경이 되고 색상은 설명 문구의 색상으로 변경이 됩니다.
            </p>

            {/* entity는 html에서 특수 문자를 표현하는 기법으로, 규칙을 정해 놓은 문자열이 있습니다. */}
            차종 변경 : &nbsp;
            <select id="model" value={model} onChange={ChangeTest} >
                <option value="avante">아반떼</option>
                <option value="sonata">소나타</option>
                <option value="grandeur">그랜져</option>
            </select>
            <br /><br />

            색상 변경 : &nbsp;
            <select id="color" value={color} onChange={ChangeTest} >
                <option value="yellow">노랑</option>
                <option value="blue">파랑</option>
                <option value="red">빨강</option>
                <option value="green">녹색</option>
            </select>
            <br /><br />

            생산 년도 : &nbsp;
            <select id="year" value={year} onChange={ChangeTest} >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
            <br /><br />

            <p>
                <span style={{ color: color, fontWeight: 'bolder' }}>{color}</span> 색상의 {year} 년산 {modelName} 모델<br />
                <br />
                {comment}
            </p>
            <br /><br />

            <img src={`/images/${image}.png`} alt="" width={imageSize} height={imageSize} />
        </div>
    );
}

export default App;