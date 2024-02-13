# Frontend_Basis
- [PDA 3기 개인 과제] 프론트엔드 개발 기초
- 실전 JavaScript 종합 과제

# 과제 설명
## 1. Mongoose 모델 스키마 구성하기
- 두 개의 Collection을 구성하기
- <b>Campaign</b>
  |Column명|설명|
  |:---|:---|
  |campaignId|캠페인 id|
  |categoryName|카테고리 이름|
  |title|제목|
  |totalBackedAmount|총보집금액(인원)|
  |photoUrl|사진|
  |nickname|닉네임|
  |coreMessage|코어메시지|
  |whenOpen|오픈일자|
  |achivementRate|달성률|
- <b>Comment</b>
  |Column명|설명|
  |:---|:---|
  |body|댓글본문|
  |Campaign|캠페인|
  |commentType|댓글타입|
  |userNickname|유저닉네임|
  |whenCreate|작성일자|
  |commentReplys|대댓글|
  |depth|대댓글 깊이|
- [조건 1] Comment는 Campaign을 참조하도록 구성
- [조건 2] 대댓글은 자기자신(Comment)을 참조하도록 구성(Self Reference)

## 2. 웹 데이터 수집하여 저장하기
- [와디즈](https://www.wadiz.kr/web/wreward/main?order=support)에서 캠페인과 해당하는 캠페인의 댓글을 수집하여 (1)에서 만든 스키마에 저장
- Campaign : ALL(전체) > 응원참여자순
- Comment : Campaign 클릭 > 커뮤니티 > 댓글 수집
- [조건 1] Campaign은 50개, 댓글은 캠페인당 40개씩 저장할 것(단, 40개보다 작으면 해당 개수까지만 저장할 것)

## 3. Express.js를 활용하여 API 구성하기
|Method|Url|설명|
|:---|:---|:---|
|GET|/api/campaign|Campagin에 대한 리스트를 조회할 것|
|GET|/api/:campaignId|Campagin 한 개에 대한 데이터와 댓글 전부를 함께 조회할 것|
|POST|/api/:campaignId/comment|해당 Campagin에 대한 댓글을 임의로 달 수 있도록 할 것(댓글 본문과 유저닉네임, 대댓글 깊이는 필수로 입력)
|POST|/api/:campaignId/comment/:commentId|해당 캠페인과 Comment에 대한 대댓글을 달 수 있도록 할 것(댓글 본문과 유저닉네임, 대댓글 id와 대댓글 깊이는 필수로 입력되도록 할 것)

## 4. React에서 캠페인 리스트 Rendering하기
- 위 내용에서 /api/campagin에 대한 내용을 (그림 A, 그림 B) 형태로 Rendering 하기
  - [와디즈](https://www.wadiz.kr/web/wreward/main?order=support)에 접속했을 때 카드 형태
- [조건 1] Rendering 내용은 다음 필드만 있으면 된다.
- [조건 2] 디자인은 신경쓰지 않습니다만 레이아웃 형태는 갖춰주세요(부트스트랩의 Card 형태)

## 5. 개발 순서
|순서|개발 폴더|해야할 일|완료 날짜|
|:---:|:---|:---|:---|
|1|data-collection|와디즈 데이터를 수집하여 파일 형태로 먼저 local에 저장|아직 못함|
|2|data-collection|저장된 데이터를 바탕으로 mongoose 모델 스키마를 정의|아직 못함|
|3|data-collection|local에 저장된 데이터를 mongoDB에 저장|아직 못함|
|4|back-end|express.js에 /api/campaign 구현|아직 못함|
|5|back-end|express.js에 /api/:campaignId 구현|아직 못함|
|6|back-end|express.js에 /api/:campaignId/comment 구현|아직 못함|
|7|back-end|express.js에 /api/:campaignId/comment/:commentId 구현|아직 못함|
|8|front-end|부트스트랩 이용해서 샘플 데이터로 UI 적용|아직 못함|
|9|front-end|/api/campaign api을 이용해서 데이터 적용|아직 못함|