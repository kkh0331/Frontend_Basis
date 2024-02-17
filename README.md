# Frontend_Basis
- [PDA 3기 개인 과제] 프론트엔드 개발 기초
- 실전 JavaScript 종합 과제

# 과제 설명
## 1. Mongoose 모델 스키마 구성하기
- 두 개의 Collection을 구성하기
- <b>Campaign</b>
  |Column명|설명|type|
  |:---|:---|:---|
  |campaignId|캠페인 id|Number|
  |categoryName|카테고리 이름|String|
  |title|제목|String|
  |totalBackedAmount|총모집금액(인원)|Number|
  |photoUrl|사진|String|
  |nickname|닉네임|String|
  |coreMessage|코어메시지|String|
  |whenOpen|오픈일자|Date|
  |achivementRate|달성률|Number|
- <b>Comment</b>
  |Column명|설명|type|
  |:---|:---|:---|
  |body|댓글본문|String|
  |Campaign|캠페인|mongoose.Id|
  |commentType|댓글타입|String|
  |userNickname|유저닉네임|String|
  |whenCreated|작성일자|Date|
  |commentReplys|대댓글|virtual로 구현|
  |depth|대댓글 깊이|Number|
  |parentComment|부모댓글|mongoose.Id|
  |isDeleted|삭제여부|Boolean|
- [조건 1] Comment는 Campaign을 참조하도록 구성
- [조건 2] 대댓글은 자기자신(Comment)을 참조하도록 구성(Self Reference)
  [수정사항]
  - 요구사항이었던 `commentReplys`을 virtual로 구현
  - 대신에, `parentComment`와 `isDeleted`을 추가
  - `parentComment`는 대댓글인 경우에 부모 댓글을 가리킴
  - `parentComment`만 추가할 경우, `댓글 > 대댓글 > 대대댓글 > ~~` 로 이어지게 되는데 중간에 한 댓글이 사라질 경우 그 자식 댓글은 접근할 방법이 애매해짐. 그리하여 `isDeleted`을 추가하여 DB에서는 삭제하지 않고 api에서는 보이지 않게 설정하려고 함. 나중에 DB에 공간이 부족할 경우, `isDeleted`로 접근하여 자식 댓글들을 전부 삭제할 수 있음.

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
|1|data-collection|와디즈 데이터를 수집하여 파일 형태로 먼저 local에 저장|02.14|
|2|data-collection|저장된 데이터를 바탕으로 mongoose 모델 스키마를 정의|02.16|
|3|data-collection|local에 저장된 데이터를 mongoDB에 저장|02.16|
|4|back-end|express.js에 /api/campaign 구현|02.17|
|5|back-end|express.js에 /api/:campaignId 구현|아직 못함|
|6|back-end|express.js에 /api/:campaignId/comment 구현|아직 못함|
|7|back-end|express.js에 /api/:campaignId/comment/:commentId 구현|아직 못함|
|8|front-end|부트스트랩 이용해서 샘플 데이터로 UI 적용|아직 못함|
|9|front-end|/api/campaign api을 이용해서 데이터 적용|아직 못함|

## 6. 과제 진행 중에 특이사항
- 데이터 수집은 2월 14일 수요일 00시 10분 기준
- Campaign models에 기재된 campaignId 같은 경우에는 수집된 데이터의 campaignId을 저장했지만 Comment models에서 Campaign에 대한 참조 id을 지정할 때에는 mongoDB._id을 사용함. 
  - 그리하여 campaignId가 어떻게 지정되는지 모르기 때문에 추후 Campaign을 추가하게 될 경우에는 campaignId을 제외하고 저장하게 될 것 같아서 `campaignId`는 삭제해도 될 것 같음.