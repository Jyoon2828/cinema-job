# 일러스트 제작 기록
내장 이미지 생성 도구로 제작한 신규 일러스트입니다.

주요 제작 지시: 따뜻한 크림색 배경의 동글동글한 그림책풍 어른 영화 제작진. 감독·배우·촬영·음향·조명·미술·편집·시나리오 8직업을 4열 2행 아틀라스로 구성. 남성형·여성형 인물 아틀라스를 각각 제작. 의상 색상과 도구를 직업에 맞추고 얼굴은 정면으로 표현. 별 모양 조명, 카메라, 필름 릴, 슬레이트 캐릭터가 있는 아기자기한 영화 스튜디오 배너도 별도 제작.

assets/careers-0.png: 첫 번째 인물 아틀라스
assets/careers-1.png: 두 번째 인물 아틀라스
assets/studio-banner.png: 촬영장 배너

assets/avatar-costumes-0.webp, assets/avatar-costumes-1.webp: 내장 이미지 생성 도구로 기존 남녀 직업 그림을 편집한 투명 의상 아틀라스입니다. 모든 머리·귀·얼굴·머리카락을 제거하고 가려졌던 어깨를 복원했습니다. 의상·손·직업 도구·그림체를 유지하도록 제작했으며, 태블릿용 WebP로 변환했습니다. 아바타 모드에서만 사용합니다.

## 아바타 v3 (2026-10-30)

기존 여자 음향 감독 그림의 눈과 남녀 직업 카드의 단순한 불투명 채색을 기준으로, 내장 이미지 생성 도구로 새 아바타 그림을 제작했습니다. 얼굴형·피부색·눈썹·코·머리색을 고르는 이전 부품은 현재 앱에서 불러오지 않습니다.

- assets/avatar-v3/heads-open-soft.webp: 기본 머리 6종, 뜬눈·살짝 웃기
- assets/avatar-v3/heads-closed-soft.webp: 웃는 눈·살짝 웃기
- assets/avatar-v3/heads-open-wide.webp: 뜬눈·활짝 웃기
- assets/avatar-v3/heads-closed-wide.webp: 웃는 눈·활짝 웃기
- assets/avatar-v3/accessories.webp: 안경 정면 테 2종, 모자 2종, 머리핀 2종
- assets/careers-male-v3.webp: 원래 남자 직업 그림의 눈 8개를 여자 기준 눈으로 통일한 편집본

제작 프롬프트와 그림 배치 정보는 assets/avatar-v3/README.md 및 manifest.json에 정리했습니다. 각 그림은 WebP로 변환해 사용합니다.

## 모자 착용 보정

- assets/avatar-v3/hat-bucket-v2.webp: 내장 이미지 생성 도구로 제작한 착용용 정면 벙거지 모자입니다. 기존 액세서리와 아바타를 화풍 기준으로 사용했습니다. 모자 안쪽의 타원형 바닥을 없애고 불투명한 천으로 된 앞 챙을 표현했습니다. 투명 배경을 유지해 무손실 WebP로 변환했습니다.
- 야구 모자와 벙거지 모자에 각각 다른 크기와 높이를 적용합니다. 벙거지 모자는 원본 가로세로 비율을 유지합니다. 직업마다 등록된 머리 중심을 기준으로 같은 착용 위치를 사용합니다.
- 조명 기구는 머리 뒤에 그리며, 손과 아래쪽 잡는 도구는 기존 앞쪽 순서를 유지합니다.
- 8직업 × 머리 6종 × 모자 2종 × 눈/입 4조합의 384가지에서 위치·그림 영역·눈 가림을 확인하고 직업별 화면을 검토했습니다.

## 옷 색상 보정 · 남자 머리 추가

- assets/avatar-v3/heads-male-extra.webp: 기존 아바타를 기준으로 내장 이미지 생성 도구로 제작한 추가 남자 머리입니다. 가르마 머리와 앞머리 2종, 뜬눈/웃는 눈과 살짝 웃기/활짝 웃기의 네 조합을 4열 2행으로 배치했습니다. 1774×887px 투명 원본을 무손실 WebP로 변환했습니다. 기존 남자 얼굴과 같은 눈·코·귀·얼굴형·따뜻한 불투명 채색을 유지하도록 지시했습니다.
- 제작 프롬프트 요약: 기존 남자 캐릭터의 얼굴과 화풍을 유지하고 짧은 가르마 머리와 짧은 앞머리만 추가. 각 행은 한 머리 모양, 각 열은 뜬눈/작은 미소·웃는 눈/작은 미소·뜬눈/활짝 미소·웃는 눈/활짝 미소. 몸통·모자·안경·글자 없이 정면 머리와 짧은 목만 표현하며 투명 배경과 셀 사이 간격을 유지.
- 옷은 원래 의상 아틀라스를 그대로 사용합니다. 직업별 옷감 영역과 피부·소품 영역을 구분하고, 고정 팔레트에 맞춰 밝기와 채도를 조정합니다. 명암·주름·투명도는 유지합니다. 촬영 감독은 셔츠와 멜빵에 연속적인 명암 변환을 적용해 소재 경계가 얼룩처럼 갈라지지 않게 합니다.
- 남녀 16종 의상의 5가지 변경 색상, 옷 부분 295개 색상 표본, 주요 피부·소품 영역, 원래 색 복원을 확인했습니다. 머리 8종×8직업×눈/입 4조합×모자 3상태의 768개 배치를 확인했습니다.


## 이미지 중심 시작 화면 (2026-10-31)

- 파일: `assets/studio-home-v10.webp` (1448×1086px, 350,442바이트).
- 방식: 내장 이미지 생성 도구. 기존 스튜디오 배너를 편집 대상으로, 기존 여자 직업 카드 그림을 캐릭터와 채색 기준으로 제공해 새 시작 화면용 그림을 제작했습니다. 불투명 원본을 WebP로 변환했습니다.
- 화면 제목과 버튼은 그림에 넣지 않고 HTML로 표현하므로 화면 크기에 맞게 배치되고 읽을 수 있습니다. 기존 아바타·의상 이미지는 변경하지 않았습니다.
- `assets/studio-mark.svg`는 페이지 로고와 파비콘을 위한 코드 기반의 작은 슬레이트 그림입니다.

제작 프롬프트:

Use case: illustration-story. Asset type: Korean elementary movie-career learning webapp home hero. Edit the provided studio banner into a new 4:3 landscape illustration for the right side of an editorial web hero. Input 1 is the studio banner edit target and scene reference; Input 2 is the existing female career card sheet, a strict character/painting style reference only. Recompose the studio into a complete cozy movie set with three cute Korean child movie crew members in the exact rounded proportions, brown eyes, warm painted gouache shading, brown hair and visible brush texture of Input 2: a teal-jacket director on the lower left holding a clapperboard, a camera operator to the lower right operating a black cinema camera on a tripod, and a purple-clothed boom-microphone operator behind them. They are collaborating on one film. Keep the magical warm studio atmosphere of Input 1, ochre stage floor, peach curtains, powder-blue scenic landscape backdrop, a soft glowing barn-door movie light in the upper left, a small film reel and prop box near the lower right. Charming professional children's picture-book illustration, warm cream paper, muted teal, peach, ochre, lavender. Compose naturally with clear central silhouettes and useful separation, all main people and equipment comfortably inside frame with 5 percent margins; camera tripod feet visible. No words, no lettering, no brand marks, no interface, no buttons, no border, no captions, no giant character mascot. This is a refined inviting cover illustration, not a busy collage. Preserve the existing career character visual language instead of switching to 3D, flat vectors or photorealism. Full opaque rectangular painting.


## 전체 화면 표지 · 여덟 영화 직업 · 둥근 글씨 (2026-10-31)

내장 이미지 생성 도구로 v10 촬영장 그림을 확장·재구성했습니다. 남자 직업 카드와 사용자가 제시한 전체 화면 예시를 참고해 기존 화풍을 유지했습니다. 그림의 제목과 버튼은 HTML이며 일러스트에는 글자가 없습니다.

- `assets/studio-home-wide-v11.webp`: 1672×941, 넓은 가로 화면.
- `assets/studio-home-classic-v11.webp`: 1448×1086, 일반 가로 화면.
- `assets/studio-home-portrait-v11.webp`: 1122×1402, 세로 화면.
- 세 그림 모두 남자 배우를 포함해 감독·촬영·음향·조명·미술·편집·시나리오 여덟 역할을 표현합니다. 남자 배우는 빨간 의상을 입고 가운데에서 연기합니다.
- 원본의 불투명 배경을 유지하고 WebP로 변환했습니다. 아바타·얼굴·의상 파일은 바꾸지 않았습니다.
- 제목용 Bagel Fat One, 버튼·활동·카드 제목용 Jua를 공식 Google Fonts 저장소에서 받아 글리프를 바꾸지 않고 WOFF2로 변환했습니다. 출처와 OFL 전문은 `assets/fonts/`에 있습니다. 본문은 기존 글씨체입니다.

제작 프롬프트 요약 (내장 도구의 이미지 편집 모드):

Wide: Recompose and extend the original warm gouache movie studio into a 16:9 full-bleed cover. Preserve the existing brown eyes, cute Korean child proportions, golden lighting and peach curtains. Show exactly eight distinct careers: girl teal director with a clapperboard, prominent boy actor in a red theatrical jacket with a script, boy camera operator in blue overalls, girl sound operator in a lavender hoodie with headphones and a boom, boy lighting technician in yellow, girl art director in mint with a miniature set and color swatches, boy film editor in pink at a monitor, girl screenwriter in navy with a notebook. Reserve the upper third as open sky and scenery for an HTML title and bottom center as stage floor for the button. No words, interface, border, logos or watermarks. Preserve the original movie career painting style.

Classic landscape: Recompose the wide painting into 4:3 instead of cropping it. Preserve all eight identities and costumes, bring the left lighting boy and right screenwriter inward, keep all faces visible in the middle-lower group, retain clear upper sky for the title and calm bottom floor for the button. No lettering or interface; same warm gouache painting.

Portrait: Recompose the same eight children into a 4:5 portrait cover, arranging the group in staggered rows instead of cropping the panorama. Keep the red-jacket boy actor prominent in the center and each face visible, retain a quiet upper third for the title and clear lower floor for the button. Same painting, colors and tools; no words, logos or interface.
