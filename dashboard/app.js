const state = {
  projects: [
    {id:"FISH-001",name:"釣りスタンプ FISH-001",status:"active",progress:100,detail:"第1弾〜第3弾の制作・登録管理",next:"登録内容と枝分かれ管理"},
    {id:"FISH-002",name:"釣りスタンプ FISH-002",status:"active",progress:63,detail:"第3弾 21番以降を継続制作",next:"21〜40の重複確認と完成"},
    {id:"FISH-003",name:"釣りスタンプ FISH-003",status:"active",progress:18,detail:"セリフシリーズ #1〜#3",next:"制作台帳へ展開"},
    {id:"FISH-004",name:"釣りスタンプ FISH-004",status:"active",progress:10,detail:"セリフシリーズ #1〜#3",next:"制作順の確定"},
    {id:"CAT",name:"つくね・つみれ",status:"review",progress:78,detail:"LINEスタンプ・絵文字・シリーズ管理",next:"販売中/申請中/制作中を整理"},
    {id:"GOODS",name:"TTworks GOODS",status:"ready",progress:45,detail:"Tシャツ・パーカー・スウェット・マグ・バッグ",next:"商品台帳と販売リンク整備"},
    {id:"WEB",name:"TTworks Web",status:"active",progress:72,detail:"公式サイト・商品導線・ブランド表現",next:"商品リンクと画像差し替え"},
    {id:"SNS",name:"Instagram / X",status:"active",progress:20,detail:"投稿素材・告知・販売導線",next:"投稿テンプレート作成"}
  ],
  agents: [
    ["企","企画AI","新作案・セリフ・シリーズ設計"],
    ["制","制作AI","画像制作指示・バリエーション管理"],
    ["検","品質チェックAI","文字欠け・重複・仕様違反を確認"],
    ["登","登録準備AI","LINE/販売サイト用の入力情報を整形"],
    ["広","SNS AI","Instagram・X用の告知文と素材計画"],
    ["管","管理AI","進捗・次の作業・枝分かれを統括"]
  ],
  actions: [
    ["FISH-002","第3弾 21〜40を完成状態へ進める"],
    ["LINE管理","1セット登録完了ごとに登録名で枝分かれ"],
    ["キャラ台帳","現行キャラクター設定を一元化"],
    ["GOODS","商品ごとの画像・価格・リンク欄を整理"]
  ],
  characters: [
    ["コーギー系キャラ","親しみやすい釣りキャラクター。各シリーズ設定を優先。"],
    ["女性アングラー","キャラ別の口調設定を維持して運用。"],
    ["関西人アングラー","関西弁を使う男性アングラー。"],
    ["ブリオくん","癖のある話し方を固定。"],
    ["男性アングラー","標準キャラクター枠。"],
    ["猫アングラー","猫キャラクター枠。"],
    ["日焼けしたくない女性","釣り初心者。博多弁設定。"],
    ["つくね","茶系の猫キャラクター。"],
    ["つみれ","シルバー系の猫キャラクター。"]
  ]
};

const labels={active:"進行中",review:"確認待ち",ready:"登録準備"};
const projectGrid=document.querySelector("#projectGrid");
const projectFilter=document.querySelector("#projectFilter");

function renderProjects(filter="all"){
  const items=state.projects.filter(p=>filter==="all"||p.status===filter);
  projectGrid.innerHTML=items.map(p=>`
    <article class="project-card">
      <div class="card-top">
        <div><p class="eyebrow">${p.id}</p><h4>${p.name}</h4></div>
        <span class="badge ${p.status}">${labels[p.status]}</span>
      </div>
      <p>${p.detail}</p>
      <div class="progress" aria-label="進捗 ${p.progress}%"><i style="width:${p.progress}%"></i></div>
      <div class="meta"><span>次: ${p.next}</span><strong>${p.progress}%</strong></div>
    </article>
  `).join("");
}
function renderMetrics(){
  const active=state.projects.filter(p=>p.status==="active").length;
  const review=state.projects.filter(p=>p.status==="review").length;
  const avg=Math.round(state.projects.reduce((n,p)=>n+p.progress,0)/state.projects.length);
  document.querySelector("#metrics").innerHTML=[
    ["${state.projects.length}","管理プロジェクト"],
    ["${active}","進行中"],
    ["${review}","確認待ち"],
    ["${avg}%","全体進捗"]
  ].map(x=>`<div class="metric"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("");
}
function renderAgents(){
  document.querySelector("#agents").innerHTML=state.agents.map(a=>`
    <div class="agent"><div class="icon">${a[0]}</div><div><strong>${a[1]}</strong><span>${a[2]}</span></div></div>
  `).join("");
}
function renderActions(){
  document.querySelector("#nextActions").innerHTML=state.actions.map((a,i)=>`
    <div class="action"><div class="icon">${String(i+1).padStart(2,"0")}</div><div><strong>${a[0]}</strong><span>${a[1]}</span></div></div>
  `).join("");
}
function renderCharacters(){
  document.querySelector("#characters").innerHTML=state.characters.map(c=>`
    <div class="character"><strong>${c[0]}</strong><p>${c[1]}</p></div>
  `).join("");
}
projectFilter.addEventListener("change",e=>renderProjects(e.target.value));
renderMetrics();renderProjects();renderAgents();renderActions();renderCharacters();
