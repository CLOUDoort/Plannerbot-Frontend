# Plannerbot
Planner Bot은 여행 장소와 일자를 기반으로 여행 계획을 제공하는 ChatGPT 기반 AI 여행 플래너 서비스이다. <br />
맞춤형 추천 장소와 활동을 일 별로 제공하여 여행 계획을 세우는 과정을 간소화할 수 있다. <br /> 
[조코딩X유데미X원티드가 함께하는 2023 AI 해커톤🏆](https://udemy.wjtb.co.kr/event/id/179) 참가 결과물

<img src="https://github.com/CLOUDoort/Plannerbot-Frontend/assets/93777385/9c9f41f0-97f3-4dde-bfa9-0228eb9fb97a" width="80%"/>

## 기간
230731 ~ 230805

## 기술 스택
- TypeScript
- Next.js
- Tailwind CSS
- Jotai
- Axios

## 여행 장소와 일정을 입력
- 사용자가 도시 이름을 입력할 때, 정확한 도시 이름을 입력값으로 받아오기 위해 도시 자동완성을 구현했다. <br /> [Google Places API autocomplete 사용하여 도시이름 자동완성 구현과정](https://velog.io/@cloud_oort/Next.js-react-google-autocomplete-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EB%8F%84%EC%8B%9C%EC%9D%B4%EB%A6%84-%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1-%EA%B5%AC%ED%98%84) <br />
- 입력하고 난 뒤에 화면에 나오는 `Loading Spinner`는 [Pure CSS Loaders](https://loading.io/css/)에서 가져와 사용했다.
- 여행 장소와 일정 값을 string으로 만들어 서버로 보내고, 서버에서는 이 값을 prompt로 하여 ChatGPT로부터 답을 받아 클라이언트로 보내준다.

<img src="https://github.com/CLOUDoort/Plannerbot-Frontend/assets/93777385/0825c1af-5851-4dbb-88cd-5da715d8f563" width="80%"/>

## 키워드 입력
- 첫 입력 이후, 원하는 키워드를 입력하여 새로운 결과를 받을 수 있다.
- 클라이언트에 저장한 기존 입력 키워드에 공백과 추가 키워드를 붙이는 방식을 이용했기 때문에 결과에 반영된 키워드는 삭제할 수 없다.
  (다만 결과에 반영되지 않은 키워드는 삭제가 가능하다.)
- 서버에 업데이트된 키워드와 기존 결과값을 보내면 서버에서는 반영된 키워드와 새로운 결과값을 리턴해주고 클라이언트에서는 그 값을 다시 저장한다.

<img src="https://github.com/CLOUDoort/Plannerbot-Frontend/assets/93777385/77132dc3-69a2-4a86-bcc7-c989d71ab414" width="80%"/>

## Google Maps 이용
결과로 받은 장소를 클릭하면 앱에 내장된 Google Maps를 통해 위치를 파악할 수 있다. <br />
[Google Maps Javascript API 사용하여 장소 클릭했을 때, google maps에 위치 보여주는 기능 구현](https://velog.io/@cloud_oort/Next.js-google-maps-%EC%82%AC%EC%9A%A9)

<img src="https://github.com/CLOUDoort/Plannerbot-Frontend/assets/93777385/103aebe7-bcef-4de4-a401-b842ebf750cd" width="80%"/>

## 무료이용 제한
- 유저들이 무제한으로 이용하게 되면, ChatGPT 이용 과금이 상당하기 때문에 최대 5회로 무료이용을 제한했다.
- 처음 입력할 때 해당 ip 주소를 클라이언트에 저장해두고, 추가 키워드 입력 횟수를 세어 5회 이상일 때, 서버로 ip주소를 보낸다.
- ip 주소와 함께 API 요청을 받은 서버는 클라이언트에 쿠키를 생성시켜, 쿠키가 있을 때는 request가 불가능하게 만들었다.
- 쿠키로 제어하기 때문에 새로고침하여 다시 시도해도 불가능하다.

<img src="https://github.com/CLOUDoort/Plannerbot-Frontend/assets/93777385/16d3d53e-1c3a-4ee4-b92d-90e86fc7f78e" width="80%"/>

## 협업
[백엔드 코드 개발자 Github 주소](https://github.com/HoonDongKang/planner-bot)

## 후기
<p>MoneyMindset 프로젝트를 정리하던 중에 AI 해커톤 공모가 올라와서 백엔드 개발자분과 함께 해커톤에 참가했다. <p />
<p>대략 1주일간 프로젝트를 계획하고, 남은 1주일 동안 개발에 매진하여 프로젝트를 완성시켰다.<p />
<p>프로젝트 주제를 선정하는 것이 가장 어려웠는데, 런닝머신 위에서 프로젝트 주제를 고민하다가 여행 계획을 ChatGPT가 짜주면 어떨까하는 생각에서 Planner bot이 탄생했다.<p />
<p>1주일이라는 짧은 시간 동안 백엔드 개발자분과 매일 디스코드로 소통하며 개발을 진행한 끝에 성공적으로 잘 마무리했다. <p />
<p>비록 수상은 못했지만 처음 참가해보는 해커톤이었기에 재밌는 경험이었다. <p />
