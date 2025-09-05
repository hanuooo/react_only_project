// src/components/ch04.event_handling/combo_change.js
export default function App() {
  // 데이터
  const breadItems = ["마카롱", "크로아상", "프렌치바게트"];
  const drinkItems = ["아메리카노", "우유", "주스"];

  // 품목명 → 이미지 경로(프로젝트에 맞게 경로 수정: public/images/ 가정)
  const imageMap = {
    마카롱: "/images/macaron01.png",
    크로아상: "/images/croissant_01.png",
    프렌치바게트: "/images/french_baguette_02.png",
    아메리카노: "/images/product_1740054265863.jpg",
    우유: "/images/milk02.jpg",
    주스: "/images/juice01.png",
  };

  // ▼ 네가 원한 라인: 그대로 사용 (alert로 클릭한 li 텍스트 출력)
  function handleItemClick(e) {
    alert(e.target.innerText); // 클릭된 <li>의 텍스트를 alert로 표시

    // --- 옵션: 이미지 보기 체크 시 이미지도 표시 ---
    const li = e.target.closest("li");
    if (!li) return; // li 외 영역 클릭 방지
    const name = li.innerText.trim();
    const showImage = document.getElementById("show_image")?.checked;

    if (!showImage) return;

    const img = document.getElementById("image01");
    const url = imageMap[name];

    if (url) {
      img.src = url;     // 빈 문자열 금지
      img.width = 300;   // 숫자(px)
      img.height = 200;
      img.style.display = "block";
    } else {
      img.removeAttribute("src");
      img.style.display = "none";
      alert(`이미지를 찾을 수 없습니다: ${name}`);
    }
  }

  // 콤보박스 change: 빵=ul, 음료수=ol 동적 생성
  function handleChange(event) {
    const { id, value } = event.target;
    if (id !== "menu_select") return;

    const container = document.getElementById("list_container");
    container.innerHTML = ""; // 목록 초기화

    // 이미지도 초기화(빈 src 경고 방지)
    const img = document.getElementById("image01");
    img.removeAttribute("src");
    img.style.display = "none";

    if (value === "-") return;

    const items = value === "bread" ? breadItems : drinkItems;
    const tag = value === "bread" ? "ul" : "ol";

    const list = document.createElement(tag);
    list.style.cursor = "pointer";
    list.style.backgroundColor = "#f0f0f0";
    list.style.marginTop = "12px";
    list.style.padding = "8px";

    items.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });

    container.appendChild(list);
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>클릭/체인지 이벤트 테스트</h2>

      <label>
        분류:
        <select id="menu_select" onChange={handleChange} style={{ marginLeft: 8 }}>
          <option value="-">선택하세요</option>
          <option value="bread">빵</option>
          <option value="drink">음료수</option>
        </select>
      </label>

      <label style={{ marginLeft: 16 }}>
        <input type="checkbox" id="show_image" />
        이미지 보기
      </label>

      {/* 동적 목록 컨테이너: 여기 한 곳에만 onClick 걸고 이벤트 위임 */}
      <div id="list_container" onClick={handleItemClick} />

      {/* 미리보기: src 있을 때만 보이게 제어(빈 src 금지) */}
      <img id="image01" alt="preview" style={{ display: "none", marginTop: 12 }} />
    </div>
  );
}
