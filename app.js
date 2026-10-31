const jobs=[
{n:'영화감독',i:'🎬',tag:'이야기를 하나로 이끄는 사람',work:'시나리오를 바탕으로 영화가 어떤 모습으로 보일지 정하고, 배우와 여러 제작진이 함께 장면을 만들도록 이끕니다.',skills:['이야기를 이해하는 힘','의견을 나누는 능력','문제를 해결하는 힘'],tools:'시나리오, 콘티, 모니터',question:'같은 장면을 슬프게 또는 신나게 만들려면 무엇을 바꿀까요?'},
{n:'영화배우',i:'🎭',tag:'인물의 마음을 표현하는 사람',work:'이야기 속 인물을 이해하고 표정, 목소리, 몸짓으로 인물의 마음과 행동을 표현합니다.',skills:['표현력','인물을 이해하는 힘','꾸준히 연습하는 태도'],tools:'대본, 의상, 소품',question:'대사 없이 표정과 몸짓만으로 기쁨을 전할 수 있을까요?'},
{n:'촬영 감독',i:'📹',tag:'이야기를 화면에 담는 사람',work:'감독과 장면의 모습을 의논하고, 카메라의 위치와 움직임, 화면 구성을 정해 장면을 촬영합니다.',skills:['관찰력','화면을 구성하는 힘','장비를 다루는 능력'],tools:'카메라, 렌즈, 삼각대',question:'인물을 멀리 찍을 때와 가까이 찍을 때 느낌이 어떻게 달라질까요?'},
{n:'음향 감독',i:'🎧',tag:'소리로 장면을 완성하는 사람',work:'영화에 필요한 대사와 주변 소리, 효과음을 계획하고 녹음·편집·조합해 장면의 분위기를 만듭니다. 현장 녹음과 후반 음향을 나누어 맡기도 합니다.',skills:['소리를 구별하는 힘','집중력','협력하는 태도'],tools:'마이크, 헤드폰, 녹음기',question:'발자국 소리만으로 무서운 분위기를 만들 수 있을까요?'},
{n:'조명 감독',i:'💡',tag:'빛으로 분위기를 만드는 사람',work:'촬영 감독 등 제작진과 의논해 빛의 방향과 밝기, 색을 조절하고 인물과 공간이 원하는 느낌으로 보이게 합니다.',skills:['빛을 관찰하는 힘','안전하게 작업하는 태도','협력하는 능력'],tools:'조명, 반사판, 조명 스탠드',question:'같은 얼굴에 아래와 위에서 빛을 비추면 어떤 차이가 날까요?'},
{n:'미술 감독',i:'🎨',tag:'영화 속 세상을 꾸미는 사람',work:'이야기의 시대와 분위기에 맞게 공간, 세트, 소품 등의 모습을 계획하고 관련 제작진과 영화 속 세상을 만듭니다.',skills:['상상력','색과 모양을 표현하는 힘','계획하는 능력'],tools:'공간 설계 그림, 색 견본, 소품',question:'미래의 교실을 보여주려면 어떤 색과 소품을 고를까요?'},
{n:'영화 편집자',i:'✂️',tag:'장면을 이어 이야기를 만드는 사람',work:'촬영한 영상 중 필요한 부분을 고르고 순서와 길이를 조절해 이야기가 잘 전달되도록 연결합니다.',skills:['이야기를 이해하는 힘','꼼꼼함','편집 도구 활용 능력'],tools:'편집 프로그램, 컴퓨터, 영상',question:'장면의 순서를 바꾸면 이야기가 어떻게 달라질까요?'},
{n:'시나리오 작가',i:'✍️',tag:'영화의 첫 이야기를 쓰는 사람',work:'영화의 인물과 사건을 구상하고 장면, 행동, 대사를 시나리오로 씁니다. 의견을 듣고 이야기를 고쳐 완성합니다.',skills:['상상력','글로 표현하는 힘','사람을 관찰하는 힘'],tools:'노트, 시나리오, 컴퓨터',question:'평범한 학교에서 신기한 사건이 생긴다면 어떤 이야기일까요?'}];
let state={job:0,step:0,name:'',work:'',ability:'',wish:'',theme:0,style:0,zoom:1,px:0,py:0,angle:0};try{Object.assign(state,JSON.parse(localStorage.getItem('filmcareers-v1')||'{}'));state.step=0;state.job=Math.max(0,Math.min(7,+state.job||0))}catch{}
const colors=['#245b50','#618ba3','#c98485','#b58b45'];const careerSources=['assets/careers-male-v3.webp','assets/careers-1.png'];const exploreStyles=[1,0,1,0,0,1,0,1];const photo=new Image(),atlases=[new Image(),new Image()];let atlas=atlases[0];let hasPhoto=false,ready=false,stream=null;const $=s=>document.querySelector(s),stage=$('#stage'),card=$('#card'),ctx=card.getContext('2d');atlases.forEach((a,i)=>{a.src=careerSources[i];a.onload=()=>{if(i===state.style){atlas=a;ready=true}draw()};a.onerror=()=>toast('그림을 불러오지 못했어요. 새로고침해 주세요.')});state.style=state.style===1?1:0;atlas=atlases[state.style];const steps=['직업 탐색','내 얼굴 만들기','조사 내용','카드 완성'];
let faceMode=state.faceMode==='photo'?'photo':'avatar',avatarTab='hair',accessoryTab='glasses',appScreen='home';
state.avatar=normalizeAvatar(state.avatar);
const costumeAtlases=[new Image(),new Image()],headAtlases={},accessoryAtlas=new Image(),bucketHat=new Image(),maleHeadAtlas=new Image();
const avatarCostumeMaps=[
 [[292,314,371],[300,308,356],[315,322,370],[260,321,372],[253,264,323],[307,273,332],[214,290,347],[314,294,350]],
 [[298,318,379],[300,319,372],[287,321,363],[368,319,388],[344,310,397],[298,290,355],[338,297,370],[315,305,369]]
];
const headRegistration=[[266.3,301.1,124.4],[258.3,306.3,119.8],[269.8,301.1,119.3],[268.0,280.6,123.7],[257.6,281.3,120.4],[256.6,281.3,120.9]];
const extraHeadRegistration=[[[262.8,311.1,138.8],[266.2,311.1,138.8],[261.3,311.1,138.9],[265.4,311.1,138.9]],[[262.7,306.2,139.2],[265.8,306.2,139.2],[260.3,306.7,138.9],[265.0,306.7,138.9]]];
const avatarExpressions=['open-soft','closed-soft','open-wide','closed-wide'];
const hatPlacement={1:{sprite:2,width:315,height:180,bottom:-174},2:{sprite:3,width:352,height:0,bottom:-170}};
const clothingOptions=[['원래 색',null],['하늘색',200,'#55add9'],['초록색',145,'#5bb27f'],['보라색',272,'#a47bc9'],['분홍색',340,'#db7c9c'],['주황색',25,'#d99768']];
function avatarArtReady(){return costumeAtlases.every(im=>im.complete&&im.naturalWidth)&&Object.keys(headAtlases).length===4&&Object.values(headAtlases).every(im=>im.complete&&im.naturalWidth)&&accessoryAtlas.complete&&accessoryAtlas.naturalWidth>0&&bucketHat.complete&&bucketHat.naturalWidth>0&&maleHeadAtlas.complete&&maleHeadAtlas.naturalWidth>0}
function refreshAvatarArt(){if(avatarArtReady()){if(state.step===1&&faceMode==='avatar')render();else draw()}}
function loadAvatarArt(im,path){im.onload=refreshAvatarArt;im.onerror=()=>toast('꾸미기 그림을 불러오지 못했어요. 새로고침해 주세요.');im.src=path}
costumeAtlases.forEach((im,i)=>loadAvatarArt(im,'assets/avatar-costumes-'+i+'.webp'));
for(const expression of ['open-soft','closed-soft','open-wide','closed-wide']){const im=new Image();headAtlases[expression]=im;loadAvatarArt(im,'assets/avatar-v3/heads-'+expression+'.webp')}
loadAvatarArt(accessoryAtlas,'assets/avatar-v3/accessories.webp');
loadAvatarArt(bucketHat,'assets/avatar-v3/hat-bucket-v2.webp');
loadAvatarArt(maleHeadAtlas,'assets/avatar-v3/heads-male-extra.webp');

function persist(){state.resumeStep=state.step;state.faceMode=faceMode;let t={...state};delete t.step;try{localStorage.setItem('filmcareers-v1',JSON.stringify(t))}catch{}}
function toast(s){$('#toast').textContent=s;$('#toast').style.display='block';clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').style.display='none',3000)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function go(n){appScreen='activity';state.step=n;persist();render();}
function showHome(){appScreen='home';render();}
function renderHome(){
 const started=Boolean(state.started||state.name||state.work||state.ability||state.wish);
 $('#enterLabel').textContent=started?'이어서 만들기':'영화 제작소 입장하기';
 $('#exploreAgain').hidden=!started;
 $('#welcomeNote').textContent=started?'이 기기에 저장된 나의 작업을 이어서 만들어요.':'준비물은 호기심, 그리고 나만의 상상력!';
 $('#enterStudio').onclick=()=>{const resume=started?Math.max(0,Math.min(3,Math.floor(+state.resumeStep||0))):0;state.started=true;go(resume)};
 $('#exploreAgain').onclick=()=>{state.started=true;go(0)};
}
$('#brandHome').onclick=showHome;$('#homeButton').onclick=showHome;
const moreJobInfo=[["예를 들어, 친구를 처음 만나는 장면이라면", "배우가 어디를 보고 어떤 속도로 말할지, 카메라가 어디에서 찍을지 팀과 정해요. 촬영한 화면을 확인하고 이야기가 잘 전해지도록 다시 의논해요.", "이야기 이해력: 장면에서 꼭 전할 마음을 찾아요.|소통하는 힘: 여러 사람의 생각을 듣고 설명해요.|문제 해결력: 장소나 날씨가 바뀌어도 방법을 찾아요.", "콘티는 찍을 장면을 순서대로 그린 그림이에요. 감독은 콘티와 촬영 화면을 보면서 배우와 제작진이 같은 장면을 떠올리도록 도와요.", "감독이 모든 일을 혼자 하는 것은 아니에요. 각 분야의 전문가가 의견을 내고, 감독은 영화의 방향에 맞게 함께 결정해요."], ["예를 들어, 친구를 기다리는 장면이라면", "기다리는 이유와 인물의 마음을 먼저 생각해요. 시선, 숨소리, 손의 움직임까지 연습하고 카메라 앞에서 표현해요. 같은 대사도 감정에 따라 달라져요.", "표현력: 얼굴·목소리·몸짓으로 마음을 전해요.|공감하는 힘: 나와 다른 인물의 마음을 이해해요.|꾸준함: 여러 번 찍어도 집중하며 연기해요.", "대본에는 인물의 말과 행동이 담겨 있어요. 의상과 소품도 인물을 이해하는 단서가 돼요. 배우는 정해진 위치와 움직임을 익혀 다른 팀과 호흡을 맞춰요.", "대사를 외우는 것만이 연기는 아니에요. 상대 배우의 말을 듣고 반응하며, 말이 없는 순간에도 인물의 마음을 표현해요."], ["예를 들어, 주인공이 골목을 걷는 장면이라면", "주인공을 멀리서 보여 줄지 얼굴을 가까이 보여 줄지 정해요. 카메라를 따라 움직이거나 멈춰 두면서 관객이 무엇을 보게 할지 계획해요.", "관찰력: 장면에서 중요한 움직임을 찾아요.|화면 구성력: 인물과 배경을 알맞게 배치해요.|장비 활용력: 카메라와 렌즈의 특징을 이해해요.", "렌즈는 화면에 담기는 범위와 느낌에 영향을 줘요. 삼각대는 카메라를 안정적으로 받쳐요. 촬영팀은 초점과 밝기를 확인하며 장면을 함께 기록해요.", "촬영 감독은 단순히 녹화 버튼만 누르지 않아요. 이야기의 분위기에 어울리는 화면을 고민하고 조명팀 등과 함께 만들어요."], ["예를 들어, 비 오는 날의 장면이라면", "배우의 말이 빗소리에 묻히지 않게 녹음해요. 촬영 뒤에는 대사와 빗소리의 크기를 조절하고, 필요한 발자국이나 우산 소리를 더해 장면을 완성해요.", "듣는 힘: 필요한 소리와 방해되는 소리를 구별해요.|집중력: 작은 잡음이나 소리의 차이를 찾아요.|협력: 영상과 소리가 어울리도록 다른 팀과 맞춰요.", "마이크로 소리를 담고 녹음기로 기록해요. 헤드폰으로 잡음을 확인해요. 촬영 뒤에는 편집 도구로 소리의 위치와 크기를 조절해요.", "영화 속 소리를 모두 촬영장에서 녹음하는 것은 아니에요. 현장 녹음팀과 후반 음향팀이 역할을 나누며, 효과음을 따로 만들기도 해요."], ["예를 들어, 따뜻한 아침 장면이라면", "창문으로 햇빛이 들어오는 것처럼 빛을 만들어요. 빛의 방향과 밝기를 바꾸고, 얼굴에 생기는 그림자를 확인해 장면의 분위기를 맞춰요.", "빛 관찰력: 밝기·색·그림자의 차이를 살펴요.|협력: 카메라와 배우의 움직임에 맞춰 조절해요.|안전 의식: 전기와 무거운 장비를 조심해요.", "조명으로 빛을 만들고 반사판으로 빛을 되돌려 보내요. 스탠드는 조명을 받쳐 줘요. 장비 설치와 전기는 전문가가 안전하게 다뤄요.", "밝게 비추는 것만이 목표는 아니에요. 어둠과 그림자도 이야기의 일부예요. 관객이 느낄 분위기를 생각하며 빛을 조절해요."], ["예를 들어, 오래된 교실 장면이라면", "책상과 칠판의 모양, 벽의 색, 책과 공책 같은 소품을 골라요. 그 시대와 인물의 생활이 느껴지도록 공간을 계획하고 관련 팀과 만들어요.", "상상력: 이야기 속 세상을 구체적으로 떠올려요.|관찰력: 색·모양·재료의 특징을 살펴요.|계획력: 필요한 공간과 소품을 정리하고 협력해요.", "공간 설계 그림으로 세트의 모습을 계획해요. 색 견본으로 색을 비교하고 작은 모형으로 배치를 살펴보기도 해요. 실제 크기와 카메라에 보일 모습도 생각해요.", "미술 감독의 일은 예쁘게 꾸미는 데서 끝나지 않아요. 색과 물건을 통해 인물의 성격, 시대, 이야기의 분위기를 보여 줘요."], ["예를 들어, 주인공이 문을 여는 장면이라면", "문을 여는 손, 놀라는 얼굴, 방 안의 모습을 어떤 순서로 보여 줄지 정해요. 각 장면의 길이를 바꾸면 긴장되거나 편안한 느낌을 만들 수 있어요.", "이야기 이해력: 꼭 필요한 장면을 골라요.|꼼꼼함: 장면의 연결과 작은 차이를 확인해요.|소통하는 힘: 감독과 수정할 점을 함께 의논해요.", "편집 프로그램의 타임라인은 영상과 소리를 순서대로 놓는 작업 공간이에요. 편집자는 여러 촬영본을 비교하고 자르거나 이어 붙이며 흐름을 다듬어요.", "편집은 단순히 실수한 부분을 지우는 일이 아니에요. 장면의 순서와 길이로 관객의 생각과 감정을 이끄는 창작이에요."], ["예를 들어, 학교에서 보물찾기를 한다면", "누가 보물을 찾는지, 무엇이 방해하는지, 마지막에 어떤 선택을 하는지 정해요. 각 장면의 장소와 행동, 대사를 써서 촬영할 이야기로 만들어요.", "상상력: 인물과 사건을 새롭게 떠올려요.|관찰력: 사람의 말과 생활에서 이야기 재료를 찾아요.|고쳐 쓰기: 의견을 듣고 장면과 대사를 다듬어요.", "시나리오에는 장면의 장소와 시간, 인물의 행동과 대사가 담겨요. 노트와 컴퓨터에 생각을 기록하고, 필요한 내용은 조사하거나 사람에게 물어봐요.", "좋은 생각이 떠오르는 순간만 기다리지는 않아요. 자료를 조사하고 여러 번 쓰고 고치면서 다른 사람이 이해할 수 있는 이야기로 만들어요."]];
let infoPage=0,writePage=0;
function pagesForJob(){const j=jobs[state.job],r=research[state.job];const holder=document.createElement('div');holder.innerHTML=researchPanel();const links=[...holder.querySelectorAll('a')].map(a=>({title:a.querySelector('strong')?.textContent||a.textContent,provider:a.querySelector('small')?.textContent||'',note:a.querySelector('span')?.textContent||'',url:a.getAttribute('href')}));const e=moreJobInfo[state.job];return [
{group:'직업 소개',title:'어떤 일을 하나요?',body:`<p>${j.work}</p><p class="tools">${j.tag}</p>`},
{group:'직업 소개',title:e[0],body:`<p>${e[1]}</p>`},
{group:'필요한 능력',title:'어떤 힘과 태도가 필요할까요?',body:`<div class="skillLines">${e[2].split('|').map(t=>`<p>${t}</p>`).join('')}</div>`},
{group:'직업 소개',title:'어떤 도구를 사용하나요?',body:`<p>${e[3]}</p><p class="tools">${j.tools}</p>`},
...r.day.map((t,i)=>({group:'현장 이야기',title:`현장 이야기 ${i+1}`,body:`<p>${t}</p><p class="tools">${r.phase}</p>`})),
{group:'현장 이야기',title:'이런 점도 알아 두세요',body:`<p>${e[4]}</p><p class="team">${r.team}</p>`},
{group:'작은 체험',title:'내가 직접 해본다면?',body:`<p>${r.mission}</p><p class="team">생각해 보기 · ${j.question}</p>`},
...links.map(l=>({group:'직업 자료',title:'직업 자료로 더 알아봐요',body:`<a class="resourceSingle" href="${l.url}" target="_blank" rel="noopener noreferrer"><small>${l.provider}</small><strong>${l.title}</strong><b>자료 열기 ↗</b></a>`}))]}

function infoContent(){const ps=pagesForJob();infoPage=Math.max(0,Math.min(infoPage,ps.length-1));const q=ps[infoPage];return `<div class="infoTop"><span>${q.group}</span><span>${infoPage+1} / ${ps.length}</span></div><h3>${q.title}</h3><div class="infoBody">${q.body}</div><div class="pager"><button data-prev ${infoPage===0?'disabled':''}>← 이전</button><span>${infoPage+1} / ${ps.length}</span><button data-next ${infoPage===ps.length-1?'disabled':''}>다음 →</button></div>`}
function bindInfo(root,refresh){root.querySelector('[data-prev]').onclick=()=>{infoPage--;refresh()};root.querySelector('[data-next]').onclick=()=>{infoPage++;refresh()}}
function openInfo(){const d=$('#infoDialog');d.showModal();refreshInfo()}
function refreshInfo(){const r=$('#dialogContent');r.innerHTML=infoContent();bindInfo(r,refreshInfo)}
function render(){document.body.dataset.screen=appScreen;$('#home').hidden=appScreen!=='home';$('#homeButton').hidden=appScreen==='home';if(appScreen==='home'){renderHome();return;}document.body.dataset.faceMode=faceMode;document.body.dataset.stage=state.step;document.querySelector('.steps').innerHTML=steps.map((s,i)=>`<button class="step ${state.step===i?'active':state.step>i?'done':''}" data-step="${i}" ${state.step===i?'aria-current="step"':''}><b>${i+1}</b><span>${s}</span></button>`).join('');document.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>go(+b.dataset.step));atlas=atlases[state.style||0];ready=atlas.complete&&atlas.naturalWidth>0;const j=jobs[state.job];
if(state.step===0){stage.innerHTML=`<div class="stageHeading"><h2>어떤 일을 해보고 싶나요?</h2></div><div class="explore"><div class="jobs">${jobs.map((a,i)=>`<button class="job ${state.job===i?'selected':''}" data-job="${i}" aria-pressed="${state.job===i}"><span class="jobart" style="background-image:url(${careerSources[exploreStyles[i]]});background-position:${(i%4)*100/3}% ${Math.floor(i/4)*100}%"></span><span>${a.n}</span></button>`).join('')}</div><section class="infoDeck"><div class="careerTitle">${j.i} ${j.n}</div><div class="infoTabs"><button data-info="0">소개</button><button data-info="2">능력</button><button data-info="4">현장</button><button data-info="8">체험</button><button data-info="9">직업 자료</button></div><div id="infoContent">${infoContent()}</div></section></div><div class="bottom"><span class="muted">${j.tag}</span><button class="primary" id="next">이 직업으로 만들기 →</button></div>`;document.querySelectorAll('[data-job]').forEach(b=>b.onclick=()=>{state.job=+b.dataset.job;infoPage=0;state.zoom=1;state.px=state.py=state.angle=0;persist();render()});document.querySelectorAll('[data-info]').forEach(b=>b.onclick=()=>{infoPage=+b.dataset.info;render()});bindInfo($('#infoContent'),render);const activeInfo=infoPage===2?2:infoPage>=9?9:infoPage===8?8:infoPage>=4?4:0;document.querySelectorAll('[data-info]').forEach(b=>{const active=+b.dataset.info===activeInfo;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});$('#next').onclick=()=>go(1)}
if(state.step===1&&faceMode==='avatar'){renderAvatar()}
if(state.step===1&&faceMode==='photo'){stage.innerHTML=`<div class="stageHeading"><h2>내 얼굴 만들기</h2><div class="compactVariants">${variantPicker()}</div></div>${faceModeTabs()}<div class="photoeditor"><div class="portraitWrap"><canvas id="portrait" width="600" height="600" aria-label="사진을 손가락으로 끌어 이동하세요"></canvas></div><div class="controls"><label class="filelabel">사진 불러오기<input id="file" type="file" accept="image/*" hidden></label><div class="buttonrow"><button id="camera">카메라 촬영</button><button id="remove">사진 지우기</button></div><div class="sliders">${[['zoom','크기','.5','3','.01'],['angle','회전','-35','35','1'],['px','좌우','-150','150','1'],['py','위아래','-150','150','1']].map(([k,l,min,max,step])=>`<label>${l}<input id="${k}" type="range" min="${min}" max="${max}" step="${step}" value="${state[k]}"></label>`).join('')}</div><button id="resetPhoto">위치 초기화</button><p class="note">얼굴 부분을 끌어서 이동할 수 있어요.<br>사진은 내 기기에서만 처리해요.</p></div></div><div class="bottom"><button id="back">← 직업 탐색</button><button class="primary" id="next">조사 내용 정리 →</button></div>`;$('#file').onchange=e=>loadFile(e.target.files[0]);$('#camera').onclick=openCamera;$('#remove').onclick=()=>{hasPhoto=false;draw()};['zoom','angle','px','py'].forEach(k=>$('#'+k).oninput=e=>{state[k]=+e.target.value;draw()});$('#resetPhoto').onclick=()=>{state.zoom=1;state.px=state.py=state.angle=0;render()};$('#back').onclick=()=>go(0);$('#next').onclick=()=>go(2);const pc=$('#portrait');let last=null;pc.onpointerdown=e=>{if(!hasPhoto)return;pc.setPointerCapture(e.pointerId);last={x:e.clientX,y:e.clientY}};pc.onpointermove=e=>{if(!last)return;const f=600/pc.clientWidth;state.px=Math.max(-150,Math.min(150,state.px+(e.clientX-last.x)*f));state.py=Math.max(-150,Math.min(150,state.py+(e.clientY-last.y)*f));last={x:e.clientX,y:e.clientY};$('#px').value=state.px;$('#py').value=state.py;draw()};pc.onpointerup=pc.onpointercancel=()=>last=null}
if(state.step===2){const fields=[['name','만든 사람','이름 또는 별명',16],['work','이 직업이 하는 일','어떤 일을 맡고, 무엇을 만드나요?',140],['ability','필요한 능력과 태도','어떤 힘과 태도가 필요할까요?',110],['wish','내가 해보고 싶은 일','이 직업을 맡는다면 무엇을 해보고 싶나요?',110]], [k,l,h,m]=fields[writePage];stage.innerHTML=`<div class="stageHeading"><h2>내가 알아본 ${j.n}</h2><button id="readInfo">자료 보기</button></div><div class="writeTabs">${fields.map((f,i)=>`<button data-write="${i}" class="${writePage===i?'active':''}">${i+1}. ${f[1]}</button>`).join('')}</div><div class="writing"><label for="${k}">${l}<small>${m}자 이내</small></label><p>${h}</p>${k==='name'?`<input id="name" maxlength="16" placeholder="이름 또는 별명" value="${esc(state.name)}">`:`<textarea id="${k}" maxlength="${m}" placeholder="${h}">${esc(state[k])}</textarea>`}<span class="charcount">${state[k].length} / ${m}</span></div><div class="bottom"><button id="back">${writePage===0?'← 얼굴 만들기':'← 이전 항목'}</button><span>${writePage+1} / 4</span><button class="primary" id="next">${writePage===3?'카드 완성하기 →':'다음 항목 →'}</button></div>`;$('#readInfo').onclick=openInfo;document.querySelectorAll('[data-write]').forEach(b=>b.onclick=()=>{writePage=+b.dataset.write;render()});$('#'+k).oninput=e=>{state[k]=e.target.value;$('.charcount').textContent=state[k].length+' / '+m;persist();draw()};$('#back').onclick=()=>{if(writePage>0){writePage--;render()}else go(1)};$('#next').onclick=()=>{if(writePage<3){writePage++;render()}else if(!state.work.trim()||!state.ability.trim()){toast('하는 일과 필요한 능력을 적어 주세요.');writePage=!state.work.trim()?1:2;render()}else go(3)}}
if(state.step===3){stage.innerHTML=`<h2>나의 영화 직업 카드 완성!</h2><div class="finishBody"><strong>${j.n} · ${esc(state.name||'나')}의 카드</strong><p>얼굴과 글을 확인하고 색을 골라요.</p><div class="themes">${colors.map((c,i)=>`<button class="swatch ${state.theme===i?'chosen':''}" data-theme="${i}" style="background:${c}" aria-label="카드 색상 ${i+1}"></button>`).join('')}</div><div class="buttonrow"><button class="primary" id="download">↓ 카드 이미지 저장</button></div><p class="note">A5 비율의 PNG 이미지로 저장해요.</p>${!hasPhoto&&faceMode==='photo'?'<p class="note">사진 없이 일러스트 카드로 저장할 수도 있어요.</p>':''}</div><div class="bottom"><button id="back">← 내용 고치기</button><button id="new">새로 만들기</button></div>`;document.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>{state.theme=+b.dataset.theme;persist();render()});$('#download').onclick=download;$('#back').onclick=()=>go(2);$('#new').onclick=()=>{if(confirm('입력한 내용과 사진을 지우고 새로 만들까요?')){localStorage.removeItem('filmcareers-v1');hasPhoto=false;faceMode='avatar';appScreen='home';infoPage=writePage=0;state={job:0,step:0,name:'',work:'',ability:'',wish:'',theme:0,style:0,zoom:1,px:0,py:0,angle:0,avatar:avatarDefaults()};render()}}}
document.querySelectorAll('[data-face-mode]').forEach(b=>b.onclick=()=>{faceMode=b.dataset.faceMode;persist();render()});document.querySelectorAll('[data-style]').forEach(b=>b.onclick=()=>{state.style=+b.dataset.style;state.px=state.py=state.angle=0;state.zoom=1;persist();render()});draw()}
function loadFile(file){if(!file)return;if(!file.type.startsWith('image/'))return toast('이미지 파일을 골라 주세요.');const u=URL.createObjectURL(file);photo.onload=()=>{hasPhoto=true;state.zoom=1;state.px=state.py=state.angle=0;URL.revokeObjectURL(u);render()};photo.onerror=()=>{URL.revokeObjectURL(u);toast('사진을 읽지 못했어요. JPG 또는 PNG를 사용해 주세요.')};photo.src=u}
async function openCamera(){try{if(!navigator.mediaDevices?.getUserMedia)throw Error();stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:false});$('#video').srcObject=stream;$('#cameraDialog').showModal()}catch{toast('카메라 권한을 확인하거나 사진 불러오기를 이용해 주세요.')}}
function stopCam(){stream?.getTracks().forEach(t=>t.stop());stream=null;$('#video').srcObject=null;$('#cameraDialog').close()}
$('#snap').onclick=()=>{const v=$('#video');if(!v.videoWidth)return;const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);photo.onload=()=>{hasPhoto=true;state.zoom=1;state.px=state.py=state.angle=0;render()};photo.src=c.toDataURL('image/jpeg',.9);stopCam()};$('#closeCam').onclick=stopCam;$('#cameraDialog').addEventListener('cancel',e=>{e.preventDefault();stopCam()});$('#help').onclick=()=>$('#helpDialog').showModal();$('#closeHelp').onclick=()=>$('#helpDialog').close();window.addEventListener('pagehide',()=>stream?.getTracks().forEach(t=>t.stop()));
function rr(g,x,y,w,h,r,fill){g.beginPath();g.roundRect(x,y,w,h,r);if(fill){g.fillStyle=fill;g.fill()}}
function portrait(g,x,y,w,h){if(faceMode==='avatar'){drawCostume(g,x,y,w,h);return;}g.save();g.translate(x,y);g.beginPath();g.rect(0,0,w,h);g.clip();const fit=Math.min(w/600,h/600);g.fillStyle='#fff7e6';g.fillRect(0,0,w,h);g.translate((w-600*fit)/2,(h-600*fit)/2);g.scale(fit,fit);w=600;h=600;const cw=atlas.naturalWidth/4,ch=atlas.naturalHeight/2;g.fillStyle='#eee9dd';g.fillRect(0,0,w,h);if(ready)g.drawImage(atlas,(state.job%4)*cw,Math.floor(state.job/4)*ch,cw,ch,0,0,w,h);const faces=faceMaps[state.style||0],f=faces[state.job];const cx=w*f[0],cy=h*f[1],rx=w*f[2],ry=h*f[3];if(hasPhoto){g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);g.clip();g.fillStyle='#f0d7bc';g.fill();g.translate(cx+state.px*w/600,cy+state.py*h/600);g.rotate(state.angle*Math.PI/180);const scale=Math.max(rx*2/photo.width,ry*2/photo.height)*state.zoom;g.drawImage(photo,-photo.width*scale/2,-photo.height*scale/2,photo.width*scale,photo.height*scale);g.restore()}g.restore()}
function wrap(g,str,x,y,maxWidth,lineH,maxLines){let lines=[],line='';for(let ch of str){if(ch==='\n'){lines.push(line);line='';continue}if(g.measureText(line+ch).width>maxWidth&&line){lines.push(line);line=ch}else line+=ch}if(line)lines.push(line);lines.slice(0,maxLines).forEach((s,i)=>g.fillText(s,x,y+i*lineH));return lines.length}
function draw(){const j=jobs[state.job],accent=colors[state.theme]||colors[0];ctx.clearRect(0,0,1240,1754);ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,1240,1754);rr(ctx,45,45,1150,1664,28,'#fffdf8');ctx.fillStyle=accent;ctx.fillRect(0,0,1240,230);ctx.fillStyle='#edd2a1';ctx.font='700 23px Nanum,sans-serif';ctx.fillText('FILM MAKERS  /  나의 영화 직업',70,74);ctx.fillStyle='white';ctx.font='67px StudioRound,Nanum,sans-serif';ctx.fillText(j.n,70,159);ctx.save();rr(ctx,70,265,1100,650,22);ctx.clip();portrait(ctx,70,265,1100,650);ctx.restore();ctx.fillStyle=accent;ctx.font='30px StudioRound,Nanum,sans-serif';ctx.fillText((state.name||'나')+'의 영화 직업 이야기',70,976);const fields=[['하는 일',state.work||'이 직업이 하는 일을 내 말로 정리해 보세요.'],['필요한 능력과 태도',state.ability||'필요한 능력과 태도를 적어 보세요.'],['내가 해보고 싶은 일',state.wish||'이 직업을 맡으면 해보고 싶은 일을 적어 보세요.']];fields.forEach(([label,value],i)=>{let y=1020+i*201;rr(ctx,70,y,1100,181,14,i%2===0?'#f3f2e9':'#edf2ee');ctx.fillStyle=accent;ctx.font='28px StudioRound,Nanum,sans-serif';ctx.fillText(label,94,y+39);ctx.fillStyle='#30453c';value=value.replace(/\s+/g,' ');let fs=30;while(fs>22){ctx.font=`${fs}px Nanum,sans-serif`;if(value.length*fs<=1050*3)break;fs--}ctx.font=`${fs}px Nanum,sans-serif`;wrap(ctx,value,94,y+80,1050,37,3)});ctx.fillStyle='#718278';ctx.font='21px Nanum,sans-serif';ctx.fillText('서로 다른 재능이 모여, 한 편의 영화를 만듭니다.',70,1690);const pc=$('#portrait');if(pc){const g=pc.getContext('2d');g.clearRect(0,0,600,600);portrait(g,0,0,600,600)}}
function download(){if(faceMode==='avatar'&&!avatarArtReady())return toast('꾸밈 그림을 모두 불러온 뒤 저장해 주세요.');card.toBlob(blob=>{if(!blob)return toast('이미지를 저장하지 못했어요. 다시 시도해 주세요.');const a=document.createElement('a'),u=URL.createObjectURL(blob);a.href=u;a.download=`영화직업카드_${jobs[state.job].n}_${(state.name||'나').replace(/[\\/:*?"<>|]/g,'')}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(u),3000);toast('이미지를 저장했어요. 다운로드 폴더를 확인해 주세요.');},'image/png')}

const faceMaps=[[[0.49, 0.4, 0.165, 0.175], [0.5, 0.4, 0.165, 0.175], [0.5, 0.4, 0.165, 0.175], [0.51, 0.4, 0.165, 0.175], [0.44, 0.36, 0.165, 0.175], [0.5, 0.36, 0.165, 0.175], [0.39, 0.38, 0.165, 0.175], [0.5, 0.37, 0.165, 0.175]], [[0.5, 0.4, 0.165, 0.175], [0.5, 0.4, 0.165, 0.175], [0.49, 0.41, 0.165, 0.175], [0.6, 0.4, 0.165, 0.175], [0.57, 0.42, 0.165, 0.175], [0.48, 0.39, 0.165, 0.175], [0.52, 0.4, 0.165, 0.175], [0.52, 0.4, 0.165, 0.175]]];
function variantPicker(){return `<div class="variantbox"><b>마음에 드는 인물 그림을 골라요</b><div class="variants">${[0,1].map(i=>`<button data-style="${i}" class="variant ${(state.style||0)===i?'selected':''}" aria-pressed="${(state.style||0)===i}"><span class="variantart" style="background-image:url(${careerSources[i]});background-position:${(state.job%4)*100/3}% ${Math.floor(state.job/4)*100}%"></span><span>${i===0?'남':'여'} ${(state.style||0)===i?'✓':''}</span></button>`).join('')}</div></div>`}
function researchPanel(compact=false){const r=research[state.job];return `<${compact?'details':'section'} class="research">${compact?'<summary>촬영장 이야기와 자료 다시 보기</summary>':'<h3>🎞 촬영장에서는 이렇게 일해요</h3>'}<span class="phase">${r.phase}</span><ol class="daylist">${r.day.map(s=>`<li>${s}</li>`).join('')}</ol><p class="team"><b>함께 일하는 사람</b><br>${r.team}</p><div class="mission"><b>작은 직업 체험</b><p>${r.mission}</p></div><h3>🔎 진짜 영화인의 이야기</h3><p class="watch"><b>이것을 찾아보세요</b><br>${r.watch}</p><div class="resourcecards">${(r.resources||[]).map(l=>`<a href="${l.url}" target="_blank" rel="noopener noreferrer"><small>${l.provider}</small><strong>${l.title} ↗</strong><span>${l.note}</span></a>`).join('')}<a href="${r.url}" target="_blank" rel="noopener noreferrer"><small>${r.provider}</small><strong>${r.title} ↗</strong><span>${r.note}</span></a></div><p class="resourceNote">자료 확인: 2026.10.30 · 자료는 새 창에서 열려요.</p></${compact?'details':'section'}>`}

$('#closeInfo').onclick=()=>$('#infoDialog').close();function fitViewport(){document.documentElement.style.setProperty('--app-h',(window.visualViewport?.height||innerHeight)+'px')}window.visualViewport?.addEventListener('resize',fitViewport);window.addEventListener('resize',fitViewport);fitViewport();document.fonts.ready.then(()=>draw());render();


function faceModeTabs(){return `<div class="faceModeTabs"><button data-face-mode="photo" class="${faceMode==='photo'?'primary':''}" aria-pressed="${faceMode==='photo'}">📷 사진 넣기</button><button data-face-mode="avatar" class="${faceMode==='avatar'?'primary':''}" aria-pressed="${faceMode==='avatar'}">😊 아바타 꾸미기</button></div>`}
function avatarDefaults(){return {version:3,hair:0,maleHair:0,eyes:0,mouth:0,glasses:0,hat:0,hatChosen:false,pin:0,clothes:0}}
function normalizeAvatar(value){
 const a=avatarDefaults();
 if(value?.version===3){
  for(const key of ['hair','maleHair','eyes','mouth','glasses','hat','pin','clothes'])a[key]=Math.max(0,Math.min(({hair:4,maleHair:2,eyes:1,mouth:1,glasses:2,hat:2,pin:2,clothes:5})[key],Math.floor(+value[key]||0)));
  // Legacy saved/random hats are not a default outfit. Only hats explicitly
  // chosen in the hat menu are restored; other avatar choices remain intact.
  a.hatChosen=value.hatChosen===true;if(!a.hatChosen)a.hat=0;
 }
 return a;
}
function avatarGroups(){return [
 ['hair','머리',state.style===0?['기본 짧은 머리','가르마 머리','앞머리']:['단발','긴 머리','묶은 머리','양 갈래','앞머리 있는 머리']],
 ['eyes','눈',['뜬눈','웃는 눈']],['mouth','입',['살짝 웃기','활짝 웃기']],
 ['accessory','액세서리',[]],['clothes','옷 색깔',clothingOptions.map(o=>o[0])]
]}
function accessoryOptions(key){return ({glasses:['없음','둥근 안경','네모 안경'],hat:['없음','야구 모자','벙거지 모자'],pin:['없음','분홍 머리핀','별 머리핀']})[key]}
function avatarChoicePreview(key,value,avatar=state.avatar){
 const preview={...avatar,[key]:value};
 if(key!=='clothes')for(const accessory of ['hat','glasses','pin'])if(key!==accessory)preview[accessory]=0;
 return preview;
}
function renderAvatar(){
 const groups=avatarGroups(),selected=groups.find(v=>v[0]===avatarTab)||groups[0],isAccessory=selected[0]==='accessory';
 const [groupKey,label,options]=isAccessory?[accessoryTab,({glasses:'안경',hat:'모자',pin:'머리핀'})[accessoryTab],accessoryOptions(accessoryTab)]:selected;
 const key=groupKey==='hair'&&state.style===0?'maleHair':groupKey,activeIndex=state.avatar[key];
 stage.innerHTML=`<div class="stageHeading"><h2>나만의 아바타 꾸미기</h2><div class="compactVariants">${variantPicker()}</div></div>${faceModeTabs()}<div class="avatarEditor"><div class="avatarSurface">${!avatarArtReady()?'<span class="avatarLoading">꾸미기 그림을 불러오는 중…</span>':''}<canvas id="portrait" width="600" height="600" aria-label="내가 꾸민 얼굴과 직업 의상"></canvas></div><section class="avatarControls"><div class="avatarTabs">${groups.map(([k,n])=>`<button data-avatar-tab="${k}" class="${selected[0]===k?'primary':''}" aria-pressed="${selected[0]===k}">${n}</button>`).join('')}</div>${isAccessory?`<div class="accessoryTabs">${[['glasses','안경'],['hat','모자'],['pin','머리핀']].map(([k,n])=>`<button data-accessory-tab="${k}" class="${key===k?'primary':''}" aria-pressed="${key===k}">${n}</button>`).join('')}</div>`:''}<h3>${label} 고르기</h3><div class="avatarChoices" data-count="${options.length}">${options.map((o,i)=>`<button class="avatarChoice ${activeIndex===i?'selected':''}" data-avatar-option="${i}" aria-pressed="${activeIndex===i}"><canvas width="160" height="160" aria-hidden="true"></canvas><span>${key==='clothes'&&i?`<i class="clothChip" style="background:${clothingOptions[i][2]}" aria-hidden="true"></i>`:''}${o}${activeIndex===i?' ✓':''}</span></button>`).join('')}</div><div class="avatarActions"><button id="randomAvatar">🎲 골고루 바꾸기</button><button id="resetAvatar">처음 모습</button></div></section></div><div class="bottom"><button id="back">← 직업 탐색</button><button id="next" class="primary">조사 내용 정리 →</button></div>`;
 document.querySelectorAll('[data-avatar-tab]').forEach(b=>b.onclick=()=>{avatarTab=b.dataset.avatarTab;render()});
 document.querySelectorAll('[data-accessory-tab]').forEach(b=>b.onclick=()=>{accessoryTab=b.dataset.accessoryTab;render()});
 document.querySelectorAll('[data-avatar-option]').forEach(b=>{const i=+b.dataset.avatarOption,a=avatarChoicePreview(key,i),g=b.querySelector('canvas').getContext('2d');if(key==='clothes')drawCostume(g,0,0,160,160,a);else paintAvatar(g,80,147,a,.34);b.onclick=()=>{state.avatar[key]=i;if(key==='hat')state.avatar.hatChosen=true;persist();render()}});
 $('#randomAvatar').onclick=()=>{state.avatar={...state.avatar,hair:state.style===1?Math.floor(Math.random()*5):state.avatar.hair,maleHair:state.style===0?Math.floor(Math.random()*3):state.avatar.maleHair,eyes:Math.floor(Math.random()*2),mouth:Math.floor(Math.random()*2),glasses:Math.floor(Math.random()*3),pin:Math.floor(Math.random()*3),clothes:Math.floor(Math.random()*6)};persist();render()};
 $('#resetAvatar').onclick=()=>{state.avatar=avatarDefaults();persist();render()};$('#back').onclick=()=>go(0);$('#next').onclick=()=>go(2);
}
var costumeCache,garmentMaskCache,accessorySpriteCache,headSpriteCache,foregroundCache;
function costumeLayer(a=state.avatar,style=state.style||0,job=state.job){
 if(!costumeCache)costumeCache=new Map();const key=style+':'+job+':'+a.clothes;if(costumeCache.has(key))return costumeCache.get(key);
 const source=costumeAtlases[style];if(!source.complete||!source.naturalWidth)return null;
 const result=document.createElement('canvas');result.width=result.height=600;
 const g=result.getContext('2d',{willReadFrequently:true}),cw=source.naturalWidth/4,ch=source.naturalHeight/2,row=Math.floor(job/4),neckBottom=avatarCostumeMaps[style][job][2];
 const sy=row?468:0,sh=row?source.naturalHeight-468:468;
 g.drawImage(source,(job%4)*cw,sy,cw,sh,0,374-neckBottom+(sy-row*ch)*600/ch,600,sh*600/ch);
 if(a.clothes>0)recolorGarment(g,style,job,a.clothes);
 costumeCache.set(key,result);if(costumeCache.size>24)costumeCache.delete(costumeCache.keys().next().value);return result;
}
function drawCostume(g,x,y,w,h,a=state.avatar,style=state.style||0,job=state.job){
 g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle='#fffaf0';g.fillRect(x,y,w,h);
 const fit=Math.min(w/600,h/600);g.translate(x+(w-600*fit)/2,y+(h-600*fit)/2);g.scale(fit,fit);
 const nx=avatarCostumeMaps[style][job][0],costume=costumeLayer(a,style,job);
 if(costume)g.drawImage(costume,0,0);paintAvatar(g,nx,374,a,1,style);
 const tools=foregroundTools(style,job,a);if(tools)g.drawImage(tools,0,0);
 g.restore();
}
function paintAvatar(g,nx,ny,a,scale=1,style=state.style||0){
 if(!avatarArtReady())return;const head=style===0?[0,6,7][a.maleHair||0]:1+a.hair,expression=(a.eyes?'closed':'open')+'-'+(a.mouth?'wide':'soft');
 const sprite=headSprite(head,expression);
 g.save();g.translate(nx,ny);g.scale(scale,scale);
 const [cx,ey,span]=head>=6?extraHeadRegistration[head-6][avatarExpressions.indexOf(expression)]:headRegistration[head],unit=104/span;
 g.save();
 if(a.hat){g.beginPath();g.moveTo(-260,-135);g.quadraticCurveTo(-180,-130,-154,-197);g.quadraticCurveTo(0,-245,154,-197);g.quadraticCurveTo(180,-130,260,-135);g.lineTo(260,100);g.lineTo(-260,100);g.closePath();g.clip()}
 g.drawImage(sprite,-cx*unit,-136-ey*unit,512*unit,512*unit);g.restore();
 // Head coordinates are registered to the eyes before costume/job placement.
 // Each hat has its own fit; the bucket keeps its natural painted aspect ratio.
 if(a.hat){const hat=hatPlacement[a.hat];paintAccessory(g,hat.sprite,0,hat.bottom,hat.width,'bottom',0,hat.height)}
 if(a.pin)paintAccessory(g,a.pin===1?4:5,102,a.hat?-169:-220,43,'center',.18);
 if(a.glasses)paintAccessory(g,a.glasses-1,0,-136,200);
 g.restore();
}
// Keep each complete head as one registered painted sprite. Neighboring
// sheet fragments are discarded by alpha connectivity, without cutting hair.
function headSprite(index,expression){
 if(!headSpriteCache)headSpriteCache=new Map();const key=index+':'+expression;if(headSpriteCache.has(key))return headSpriteCache.get(key);
 const extra=index>=6,im=extra?maleHeadAtlas:headAtlases[expression],cw=im.naturalWidth/(extra?4:3),ch=im.naturalHeight/2,c=document.createElement('canvas');c.width=c.height=512;
 const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,(extra?avatarExpressions.indexOf(expression):index%3)*cw,(extra?index-6:Math.floor(index/3))*ch,cw,ch,0,0,512,512);
 const image=g.getImageData(0,0,512,512),d=image.data,total=512*512,seen=new Uint8Array(total),queue=new Int32Array(total);let best=new Int32Array(0);
 for(let seed=0;seed<total;seed++){if(seen[seed]||d[seed*4+3]<30)continue;let front=0,end=1;queue[0]=seed;seen[seed]=1;
  while(front<end){const i=queue[front++],x=i%512,y=Math.floor(i/512);for(const n of [x?i-1:-1,x<511?i+1:-1,y?i-512:-1,y<511?i+512:-1,x&&y?i-513:-1,x<511&&y?i-511:-1,x&&y<511?i+511:-1,x<511&&y<511?i+513:-1])if(n>=0&&!seen[n]&&d[n*4+3]>=30){seen[n]=1;queue[end++]=n}}
  if(end>best.length)best=queue.slice(0,end);
 }
 const keep=new Uint8Array(total);for(const i of best){const x=i%512,y=Math.floor(i/512);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const xx=x+dx,yy=y+dy;if(xx>=0&&xx<512&&yy>=0&&yy<512)keep[yy*512+xx]=1}}
 for(let i=0;i<total;i++)if(!keep[i])d[i*4+3]=0;g.putImageData(image,0,0);headSpriteCache.set(key,c);return c;
}
// Held equipment and hands render in front of hair; garment colors and
// stock necks do not. Screens and the lighting fixture stay behind the head.
function foregroundTools(style,job,a=state.avatar){
 if(!foregroundCache)foregroundCache=new Map();const key=style+':'+job+':'+a.clothes;if(foregroundCache.has(key))return foregroundCache.get(key);
 const base=costumeLayer(avatarDefaults(),style,job);if(!base)return null;
 const c=document.createElement('canvas');c.width=c.height=600;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(base,0,0);
 const image=g.getImageData(0,0,600,600),d=image.data,nx=avatarCostumeMaps[style][job][0],hue=[178,5,212,275,43,145,340,215][job];
 for(let i=0;i<360000;i++){const x=i%600,y=Math.floor(i/600),k=i*4;
  // The whole lamp head belongs behind the avatar. Hue-based foreground
  // extraction split its yellow bulb from its dark frame and cut into hats.
  if(job===4&&y<(style===0?375:300)){d[k+3]=0;continue}
  const region=[y>285&&x>190&&x<580,y>340&&x>140&&x<590,y>285&&x<535&&y<580,(style===0?x>450:x<220)||y>405&&x>200&&x<550,style===0?x>355||y>455&&x>230:x<250||y>455&&x<300,x<270&&y>290&&y<500||y>440,y>500,y>390||x<260&&y>285][job];
  if(!region||!d[k+3]){d[k+3]=0;continue}
  const[h,s,v]=rgbHSV(d[k],d[k+1],d[k+2]),diff=Math.min(Math.abs(h-hue),360-Math.abs(h-hue)),skin=h>=12&&h<=32&&d[k]>160&&d[k+1]>90&&d[k+2]>55,neck=(skin||h>=8&&h<=40&&s>.25)&&Math.abs(x-nx)<70&&y<374;
  if(neck||!(s<.26||diff>35||skin))d[k+3]=0;
 }
 // Use the original pixels only to find the foreground. Its visible colors
 // always come from the selected costume, so highlights cannot restore the
 // original garment color over the recolored layer.
 const colored=costumeLayer(a,style,job).getContext('2d').getImageData(0,0,600,600).data;
 for(let k=0;k<d.length;k+=4){d[k]=colored[k];d[k+1]=colored[k+1];d[k+2]=colored[k+2]}
 g.putImageData(image,0,0);foregroundCache.set(key,c);if(foregroundCache.size>24)foregroundCache.delete(foregroundCache.keys().next().value);return c;
}
function accessorySprite(index){
 if(!accessorySpriteCache)accessorySpriteCache=new Map();if(accessorySpriteCache.has(index))return accessorySpriteCache.get(index);
 const source=index===3?bucketHat:accessoryAtlas,rects=[[0,0,512,512],[512,0,512,512],[1024,0,512,512],[0,0,bucketHat.naturalWidth,bucketHat.naturalHeight],[570,512,454,512],[1024,512,512,512]],[sx,sy,sw,sh]=rects[index],c=document.createElement('canvas');c.width=sw;c.height=sh;
 const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(source,sx,sy,sw,sh,0,0,c.width,c.height);
 const d=g.getImageData(0,0,c.width,c.height).data;let l=c.width,t=c.height,r=0,b=0;
 for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]>40){l=Math.min(l,x);r=Math.max(r,x+1);t=Math.min(t,y);b=Math.max(b,y+1)}
 const part={image:c,x:l,y:t,w:Math.max(1,r-l),h:Math.max(1,b-t)};accessorySpriteCache.set(index,part);return part;
}
function paintAccessory(g,index,x,y,width,align='center',angle=0,height=0){const s=accessorySprite(index),h=height||width*s.h/s.w;g.save();g.translate(x,y);g.rotate(angle);g.drawImage(s.image,s.x,s.y,s.w,s.h,-width/2,align==='bottom'?-h:-h/2,width,h);g.restore()}
function rgbHSV(r,g,b){r/=255;g/=255;b/=255;const v=Math.max(r,g,b),min=Math.min(r,g,b),d=v-min;let h=0;if(d)h=v===r?60*((g-b)/d%6):v===g?60*((b-r)/d+2):60*((r-g)/d+4);return [(h+360)%360,v?d/v:0,v]}
function hueRGB(h,s,v){const c=v*s,x=c*(1-Math.abs(h/60%2-1)),m=v-c;let r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return [Math.round((r+m)*255),Math.round((g+m)*255),Math.round((b+m)*255)]}
// Skin is protected at the registered neck and hands, rather than treating
// every warm highlight on a red or yellow garment as skin.
const garmentHandZones=[
 [[[140,355,300,495],[410,475,540,590]],[[140,455,320,600],[450,275,600,460]],[[90,510,265,600],[290,465,535,600]],[[185,500,320,600],[465,345,580,485]],[[230,435,400,575],[355,345,485,490]],[[135,370,245,510]],[[145,485,290,600],[330,465,465,575]],[[130,335,240,500],[355,455,540,600]]],
 [[[140,370,325,520],[390,475,535,600]],[[140,445,310,600],[305,465,470,600]],[[110,535,255,600],[265,490,535,600]],[[130,340,220,470],[335,480,470,600]],[[90,320,215,515],[130,385,290,530]],[[115,425,235,570],[350,485,520,590]],[[130,455,265,575],[370,485,535,600]],[[155,340,275,520],[305,470,485,600]]]
];
function inGarmentPolygon(x,y,points){let inside=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const[a,b]=points[i],[c,d]=points[j];if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)inside=!inside}return inside}
function nearGarmentPolygon(x,y,p,margin=4){if(inGarmentPolygon(x,y,p))return true;for(let i=0,j=p.length-1;i<p.length;j=i++){const[a,b]=p[i],[c,d]=p[j],dx=c-a,dy=d-b,t=Math.max(0,Math.min(1,((x-a)*dx+(y-b)*dy)/(dx*dx+dy*dy||1)));if((x-a-t*dx)**2+(y-b-t*dy)**2<=margin*margin)return true}return false}
const directorPropAreas=[
 [[[281,388],[472,297],[485,326],[296,422]],[[289,409],[503,380],[522,542],[309,572]]],
 [[[260,387],[438,302],[454,338],[278,427]],[[218,437],[458,422],[469,600],[223,600]]]
];
const lightingNeckSkin=[[[216,312],[298,312],[298,340],[308,350],[307,358],[300,368],[292,374],[266,380],[238,375],[224,368],[212,357],[207,347],[214,332]],[[312,287],[377,287],[379,319],[376,329],[367,344],[356,360],[350,372],[323,380],[299,373],[291,362],[296,346],[300,333],[313,321]]];
const lightingHandSkin=[[[[270,495],[281,480],[295,471],[318,466],[342,473],[361,484],[370,494],[367,511],[352,523],[333,526],[312,540],[289,542],[274,533],[268,516]],[[390,369],[418,363],[444,371],[454,388],[458,408],[453,430],[440,448],[418,457],[400,451],[387,432],[386,412],[388,393]]],[[[114,347],[139,339],[159,345],[173,356],[174,372],[169,385],[168,398],[153,414],[143,430],[141,451],[130,473],[113,488],[99,484],[99,464],[105,440],[109,412],[112,391]],[[148,420],[166,412],[187,419],[207,431],[226,438],[244,448],[256,465],[255,486],[239,493],[217,480],[191,466],[173,457],[156,448],[147,437]]]];
const cameraMaleSkin=[[[272,322],[356,322],[358,344],[349,360],[333,369],[311,374],[289,367],[275,354]],[[104,544],[120,541],[150,542],[167,530],[178,525],[197,528],[212,536],[237,539],[241,550],[239,565],[234,581],[215,594],[189,599],[157,593],[127,585],[111,571],[103,557]],[[314,490],[337,488],[355,498],[374,510],[399,515],[443,511],[469,510],[487,514],[499,526],[504,544],[503,558],[491,570],[471,576],[442,575],[404,573],[374,559],[350,552],[330,545],[318,538],[310,525],[311,510]]];
const actorFemalePaper=[[247,374],[452,408],[385,600],[227,600],[230,511],[238,430]];
const actorFemaleHands=[[[166,584],[174,549],[182,530],[194,515],[206,498],[224,486],[251,481],[270,484],[285,494],[287,509],[284,520],[288,530],[280,544],[268,556],[244,560],[223,569],[202,584],[177,600]],[[338,524],[347,507],[372,503],[397,508],[412,519],[424,535],[433,555],[444,580],[448,600],[397,600],[382,584],[372,568],[356,558],[344,545]]];
const cameraPropAreas=[[[[20,377],[147,377],[145,298],[239,295],[244,348],[301,374],[344,388],[379,406],[382,495],[363,533],[280,570],[235,571],[204,552],[110,552],[22,534]]],[[[15,365],[170,338],[196,400],[50,424]],[[30,417],[246,405],[281,420],[357,442],[359,543],[330,577],[231,588],[205,574],[35,559]],[[206,366],[308,365],[319,396],[221,399]],[[405,466],[516,465],[533,495],[536,540],[441,545],[405,529]]]];
const lightingMaleHead=[[338,207],[389,199],[389,164],[400,142],[490,136],[501,195],[512,203],[576,185],[598,190],[598,329],[523,331],[550,364],[519,381],[459,378],[425,355],[407,357],[384,348],[372,334],[340,331]];
function garmentPropPixel(x,y,style,job,h,s,v){
 if(job===0)return directorPropAreas[style].some(p=>inGarmentPolygon(x,y,p));
 if(job===1&&style===1&&s<.4&&inGarmentPolygon(x,y,actorFemalePaper))return true;
 if(job===2)return cameraPropAreas[style].some(p=>inGarmentPolygon(x,y,p))||style===1&&x>=359&&x<=405&&y>=414&&y<=479&&s<.14&&v>.42;
 if(job!==4)return false;
 if(style===0?inGarmentPolygon(x,y,lightingMaleHead):x<286&&y<302)return true;
 const pole=style===0?x>=399&&x<=427&&y>=344||x>=394&&x<=431&&y>=478&&y<=565:x>=142&&x<=174&&y>=298||x>=118&&x<=199&&y>=505&&y<=552;
 const handle=style===0&&y>404&&Math.abs(x-(603-.51*y))<27;
 return (pole||handle)&&(v<.47||s<.2);
}
function garmentSkinPixel(d,k,x,y,style,job,h,s){
 if(job===1&&style===1&&h<17)return false;
 if(h<8||h>38||s<.2||d[k]<145||d[k+1]<80||d[k+2]<45||d[k]-d[k+1]<28||d[k+1]-d[k+2]<16)return false;
 const nx=avatarCostumeMaps[style][job][0];
 if(style===0&&job===2)return cameraMaleSkin.some((p,i)=>nearGarmentPolygon(x,y,p,i?4:8));
 if(job===4)return nearGarmentPolygon(x,y,lightingNeckSkin[style],2)||s<.7&&lightingHandSkin[style].some(p=>nearGarmentPolygon(x,y,p,style===0?6:1));
 if(Math.abs(x-nx)<55&&y<379)return true;
 if(job===1&&style===1)return actorFemaleHands.some(p=>nearGarmentPolygon(x,y,p));
 return garmentHandZones[style][job].some(([l,t,r,b])=>x>=l&&x<=r&&y>=t&&y<=b);
}
const warmHandSeeds=[
 [[],[[194,548],[543,370]],[[170,556],[445,540]],[],[[313,500],[415,415]],[],[],[]],
 [[],[[235,535],[382,546]],[[169,583],[422,575]],[],[[144,373],[205,458]],[],[],[]]
];
function warmHandMask(image,style,job){
 const seeds=warmHandSeeds[style][job];if(!seeds.length)return null;
 const d=image.data,candidate=new Uint8Array(360000),mask=new Uint8Array(360000),queue=new Int32Array(360000);
 for(let i=0;i<360000;i++){const k=i*4;if(d[k+3]<8||d[k]<140||d[k+1]<75||d[k+2]<40||d[k]-d[k+1]<25||d[k+1]-d[k+2]<15)continue;const[h,s]=rgbHSV(d[k],d[k+1],d[k+2]);if(h>=15&&h<=33&&s>.18&&s<(job===4?.7:.68)){const x=i%600,y=Math.floor(i/600);if(style===0&&job===2&&!(x>=100&&x<=244&&y>=520||x>=300&&x<=507&&y>=482&&y<=577))continue;candidate[i]=1}}
 // Follow the connected painted hand, including its shaded edge. Warm paint
 // elsewhere on the costume is not selected merely because it looks peach.
 for(const[sx,sy]of seeds){let seed=-1;for(let r=0;r<=12&&seed<0;r++)for(let dy=-r;dy<=r&&seed<0;dy++)for(let dx=-r;dx<=r;dx++){const x=sx+dx,y=sy+dy;if(x>=0&&x<600&&y>=0&&y<600&&candidate[y*600+x]){seed=y*600+x;break}}
  if(seed<0||mask[seed])continue;let front=0,end=1;queue[0]=seed;mask[seed]=1;while(front<end){const i=queue[front++],x=i%600,y=Math.floor(i/600);for(const n of[x?i-1:-1,x<599?i+1:-1,y?i-600:-1,y<599?i+600:-1])if(n>=0&&candidate[n]&&!mask[n]){mask[n]=1;queue[end++]=n}}
 }
 return mask;
}
function cameraGarmentArea(x,y,style){
 if(style===0)return x>=370||y>=550&&x>=220;
 return x>=177&&x<=223&&y<418||x>=359&&x<=407&&y<505||y>=552&&x>=211;
}
function cameraShirtArea(x,y,style){
 if(style===0)return x>402&&y>345||x>262&&x<405&&y>320&&y<398||x>48&&x<238&&y>532;
 if(y<320)return false;
 if(y<406)return x>=239&&x<512&&!(x<314&&y>=359);
 if(y<468)return x>=358;
 if(y<552)return x>=522||y>=538&&x>=400;
 return x>=205;
}
function garmentMask(image,style,job){
 if(!garmentMaskCache)garmentMaskCache=new Map();const key=style+':'+job;if(garmentMaskCache.has(key))return garmentMaskCache.get(key);
 const d=image.data,total=600*600,mask=new Uint8Array(total),hands=warmHandMask(image,style,job),center=[178,5,212,275,43,145,350,225][job],range=[39,29,39,42,29,38,20,45][job];
 for(let i=0;i<total;i++){
  const k=i*4,x=i%600,y=Math.floor(i/600);if(d[k+3]<8||y<275)continue;
  const [h,s,v]=rgbHSV(d[k],d[k+1],d[k+2]),dist=Math.min(Math.abs(h-center),360-Math.abs(h-center));
  if(hands?.[i]||garmentSkinPixel(d,k,x,y,style,job,h,s))continue;
  if(garmentPropPixel(x,y,style,job,h,s,v))continue;
  
  if(job===1&&(s<.28&&v>.6&&(style===0||y<395)||h>29&&h<65&&s>.55))continue;
  if(job===6&&v<.4&&s<.38||job===3&&v<.4&&s<.20||job===4&&v<.4&&s<.5)continue;
  if(s>.055&&v>.05&&dist<=range&&(job!==2||cameraGarmentArea(x,y,style)))mask[i]=1;
  // Camera operators have two visible fabrics: a light shirt / a dark shirt
  // under the blue overalls. Both follow the palette with a contrasting tone.
  if(job===2&&!mask[i]&&cameraShirtArea(x,y,style)&&(style===0?v>.18&&(h>=8&&h<=85||s<.16):v>.02&&(h>=205&&h<=315||s<.16)))mask[i]=2;
 }
 // The set model, color cards and monitor share some clothing hues. Keep
 // connected garment pieces and leave those separate professional props alone.
 if(job===5||job===6){
  const seen=new Uint8Array(total),queue=new Int32Array(total),components=[];
  for(let seed=0;seed<total;seed++){if(!mask[seed]||seen[seed])continue;let front=0,end=1;queue[0]=seed;seen[seed]=1;
   while(front<end){const i=queue[front++],x=i%600,y=Math.floor(i/600);for(const n of[x?i-1:-1,x<599?i+1:-1,y?i-600:-1,y<599?i+600:-1])if(n>=0&&mask[n]&&!seen[n]){seen[n]=1;queue[end++]=n}}
   components.push(queue.slice(0,end));
  }
  components.sort((a,b)=>b.length-a.length);const largest=components[0]?.length||0;mask.fill(0);
  for(const component of components)if(component.length>=Math.max(job===5?500:100,largest*(job===5?.10:.035)))for(const i of component)mask[i]=1;
 }
 completeGarmentDetails(image,mask,style,job,hands);
 garmentMaskCache.set(key,mask);return mask;
}
// Small cloth details can sit inside a conservative prop outline or form a
// separate island at a button. Recover those actual fabric pixels without
// expanding the silhouette, recoloring skin, or painting over neutral tools.
const cameraClothDetails=[
 [[[237,552],[283,545],[367,545],[376,576],[342,600],[233,600]],[[372,397],[401,397],[411,493],[374,497]]],
 [[[175,373],[220,360],[232,395],[224,421],[177,419]],[[359,360],[405,370],[404,498],[365,499]],[[210,550],[435,535],[497,543],[514,572],[491,600],[210,600]]]
];
function completeGarmentDetails(image,mask,style,job,hands){
 const d=image.data,total=360000,center=[178,5,212,275,43,145,350,225][job],range=[49,29,47,50,32,46,26,52][job];
 const distance=new Uint8Array(total);distance.fill(30);
 for(let i=0;i<total;i++)if(mask[i])distance[i]=0;
 for(let y=0;y<600;y++)for(let x=0;x<600;x++){const i=y*600+x;if(x)distance[i]=Math.min(distance[i],distance[i-1]+1);if(y)distance[i]=Math.min(distance[i],distance[i-600]+1)}
 for(let y=599;y>=0;y--)for(let x=599;x>=0;x--){const i=y*600+x;if(x<599)distance[i]=Math.min(distance[i],distance[i+1]+1);if(y<599)distance[i]=Math.min(distance[i],distance[i+600]+1)}
 for(let i=0;i<total;i++){
  if(mask[i])continue;const k=i*4,x=i%600,y=Math.floor(i/600);if(d[k+3]<8||y<300)continue;
  const[h,s,v]=rgbHSV(d[k],d[k+1],d[k+2]);
  if(hands?.[i]||garmentSkinPixel(d,k,x,y,style,job,h,s))continue;
  // A slate outline overlaps the teal coat. Recover only its painted teal,
  // including the dark seam; the black slate and gold chair keep their colors.
  if(job===0&&h>=139&&h<=220&&(s>.5||y>425&&s>.12)&&v>.04){mask[i]=1;continue}
  if(job===2&&h>=175&&h<=245&&s>.25&&v>.06&&cameraClothDetails[style].some(p=>inGarmentPolygon(x,y,p))){mask[i]=1;continue}
  if(garmentPropPixel(x,y,style,job,h,s,v))continue;
  if(job===1&&(s<.28&&v>.6&&(style===0||y<395)||h>29&&h<65&&s>.55))continue;
  if(job===6&&v<.4&&s<.38||job===3&&v<.4&&s<.20||job===4&&v<.4&&s<.5)continue;
  const diff=Math.min(Math.abs(h-center),360-Math.abs(h-center));
  if(distance[i]<=(job===5||job===6?6:3)&&s>.055&&v>.045&&diff<=range&&(job!==2||cameraGarmentArea(x,y,style)))mask[i]=1;
  // The dark shirt runs behind the right camera buckle and camera body.
  // Its purple-blue shading is fabric; the silver buckle stays protected.
  if(job===2&&style===1&&h>=245&&h<=315&&s>.14&&v>.12&&((x>=300&&x<=358&&y>=400&&y<=435)||(x>=359&&x<=405&&y>=399&&y<=470)||(x>=400&&x<=540&&y>=532&&y<=562)))mask[i]=2;
 }
}
function rgbHSL(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,l=(max+min)/2;let h=0,s=0;if(delta){s=delta/(1-Math.abs(2*l-1));h=max===r?60*((g-b)/delta%6):max===g?60*((b-r)/delta+2):60*((r-g)/delta+4)}return [(h+360)%360,s,l]}
function hslRGB(h,s,l){const v=l+s*Math.min(l,1-l);return hueRGB(h,v?2*(1-l/v):0,v)}
function recolorGarment(g,style,job,colorIndex){
 const image=g.getImageData(0,0,600,600),d=image.data,mask=garmentMask(image,style,job),hex=clothingOptions[colorIndex][2],rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)),[h,s,l]=rgbHSL(...rgb),hist=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],totals=[0,0,0];
 for(let i=0;i<mask.length;i++)if(mask[i]&&d[i*4+3]>100){const k=i*4,light=Math.round((Math.max(d[k],d[k+1],d[k+2])+Math.min(d[k],d[k+1],d[k+2]))/2);hist[mask[i]][light]++;totals[mask[i]]++}
 const median=hist.map((bins,part)=>{let n=0;for(let i=0;i<256;i++){n+=bins[i];if(n>=totals[part]/2)return i/255}return .5});
 for(let i=0;i<mask.length;i++)if(mask[i]){
  const k=i*4,part=mask[i],sourceL=(Math.max(d[k],d[k+1],d[k+2])+Math.min(d[k],d[k+1],d[k+2]))/510,delta=sourceL-(job===2?(median[1]+median[2])/2:median[part]),baseL=l,newL=Math.max(.08,Math.min(.94,baseL+delta*(job===2?.65:.95))),newS=s*(1-.25*Math.max(0,Math.min(1,delta/.23))),color=hslRGB(h,newS,newL);
  d[k]=color[0];d[k+1]=color[1];d[k+2]=color[2];
 }
 g.putImageData(image,0,0);
}
