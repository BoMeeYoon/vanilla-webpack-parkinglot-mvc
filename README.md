# parkinglot-mvc-and-webpack

# 주차정산시스템 리팩토링🚚
-----
## 목적

  1. 미니 프로젝트로 구현했던 주차정산시스템을 MVC 패턴으로 리팩토링한다.
  2. 자바스크립트에 대한 이해를 높인다.
  3. css에 대한 이해를 높인다.
  
## 개발인원
   - 개인프로젝트
 
## 개발기간
   - 6/1 - 6/15 

## 기술스팩
  - Vanilla.js, CSS3, HTML5
  - Webpack, Babel
  - Node.js, express
  - MySQL

## 아키텍쳐<br/>
&nbsp;&nbsp;&nbsp;  🔸 FRONT-END 디자인패턴: MVC, OOP 🔸<br/>
&nbsp;&nbsp;&nbsp;&nbsp;  👉 Model : 데이터 상태 관리, 검증, api<br/>
&nbsp;&nbsp;&nbsp;&nbsp;  👉 View : ui components, action event emit<br/>
&nbsp;&nbsp;&nbsp;&nbsp;  👉 Controller: View 와 Model 에 data  혹은 action 전달<br/>
&nbsp;&nbsp;&nbsp;&nbsp;  👉 Utils : <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - 엘레먼트 관련 공통 로직 custom hooks <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - css root에 global style 정의<br/>
&nbsp;&nbsp;&nbsp;&nbsp;  <img src="arquitecture.png" width="700px" height="450px">

<br/>

## 기능
&nbsp;  🟠 관리자 페이지 🟠
  <br/>
&nbsp;&nbsp;- 로그인 상태만 접근할 수 있다.<br/>
&nbsp;&nbsp;- 🚩회원관리🚩<br/>
&nbsp;&nbsp;&nbsp;- 회원 `등록`&`수정`을 할 수 있다.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 계약기간 내 기존 회원 가입 방지<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 차량번호 중복 가입 방지<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 만료일은 가입일 이후로 부터 설정가능<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 입력 데이터 유효성 검사<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 모두 유효한 정보일 때만 서버에 데이터 전송 가능<br/>
      <br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 회원 `조회`를 할 수 있다.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 검색 데이터 유효성 검사<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 조건에 따른 정보 필터<br/>
      <br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 회원 `삭제`를 할 수 있다.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 삭제 후, 재가입 가능<br/>
      <br/>
&nbsp;&nbsp;* 🚩입출차관리🚩<br/>
&nbsp;&nbsp;&nbsp;- 센서기능 대체<br/>
    <br/>
&nbsp;&nbsp;&nbsp;- 입차:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 미출차 차량번호 중복 입력 방지<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 차량번호 유효성 검사<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 회원/비회원 차량 구분<br/>
     <br/>
&nbsp;&nbsp;&nbsp;- 출차:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 출차 기록 확인<br/>
&nbsp;&nbsp;&nbsp;&nbsp;- 회원/비회원 차량 출처 처리(시간 기록)<br/>
      <br/>
&nbsp;   🟢 정산 페이지 🟢
   <br />
&nbsp;&nbsp;- 비회원 차량만 검색 가능<br/>
&nbsp;&nbsp;- `계약 기간 내` 회원 차량일 시 바로 출차 가능<br/>
&nbsp;&nbsp;- 차량번호 뒷 4자리로 검색 가능<br/>
&nbsp;&nbsp;- 결제 금액 검증<br/>
&nbsp;&nbsp;- 정산 처리 <br/>
   <br />
   
## 결과물🔔🔔🔔
<br />
😍<span style="color:crimson">영상보기</span>😍
[ParkingLotVideo](https://play-tv.kakao.com/v/410496463)

## 구동방법
1. `git clone`
2. `npm init`
3.  `client` 폴더에서 `npm start`  ➡ 클라이언트 서버 구동
4. `server` 폴더에서 `nodemon` ➡ 백엔드 서버 구동


