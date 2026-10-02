const state={
 departments:[
  ["企画部","新作企画・セリフ・シリーズ構成を担当",3],
  ["制作部","LINEスタンプ・グッズの制作を担当",4],
  ["品質管理部","文字欠け・重複・仕様違反を確認",2],
  ["登録販売部","LINE・UP-T等の登録準備を担当",2],
  ["広報部","Instagram・Xの投稿と販促を担当",2],
  ["Webシステム部","TTworks公式サイトと自動化を担当",2]
 ],
 projects:[
  {id:"FISH-001",name:"釣りスタンプ FISH-001",department:"登録販売部",status:"ready",progress:100},
  {id:"FISH-002",name:"釣りスタンプ FISH-002",department:"制作部",status:"active",progress:63},
  {id:"FISH-003",name:"釣りスタンプ FISH-003",department:"企画部",status:"active",progress:18},
  {id:"FISH-004",name:"釣りスタンプ FISH-004",department:"企画部",status:"active",progress:10},
  {id:"CAT",name:"つくね・つみれ",department:"品質管理部",status:"review",progress:78},
  {id:"GOODS",name:"TTworks GOODS",department:"登録販売部",status:"ready",progress:45},
  {id:"WEB",name:"TTworks公式Web",department:"Webシステム部",status:"active",progress:72},
  {id:"SNS",name:"Instagram / X",department:"広報部",status:"active",progress:20}
 ],
 agents:[
  ["企","企画AI","企画部 / 新作案・セリフ設計"],
  ["制","制作AI","制作部 / 画像制作・バリエーション"],
  ["検","品質管理AI","品質管理部 / 仕様・重複チェック"],
  ["登","登録準備AI","登録販売部 / 入力情報整形"],
  ["広","広報AI","広報部 / SNS投稿・販促"],
  ["管","管理AI","社長室 / 全部署の進捗統括"]
 ],
 approvals:[
  ["FISH-002","完成40点の最終確認"],
  ["TTworks GOODS","商品公開前の価格・販売確認"],
  ["LINE登録","申請ボタンは代表承認後のみ"],
  ["外部サービス","契約・決済は自動実行しない"]
 ],
 characters:[
  ["コーギー系キャラ","釣りシリーズ中心のキャラクター"],
  ["女性アングラー","キャラ別口調設定を維持"],
  ["関西人アングラー","関西弁を使う男性アングラー"],
  ["ブリオくん","癖のある話し方を固定"],
  ["日焼けしたくない女性","釣り初心者・博多弁"],
  ["つくね / つみれ","猫スタンプシリーズ"]
 ]
};
const labels={active:"進行中",review:"確認待ち",ready:"登録準備"};
function metrics(){
 const active=state.projects.filter(x=>x.status==="active").length;
 const review=state.projects.filter(x=>x.status==="review").length;
 const avg=Math.round(state.projects.reduce((a,b)=>a+b.progress,0)/state.projects.length);
 document.querySelector("#metrics").innerHTML=[
  [state.departments.length,"稼働部署"],
  [state.projects.length,"管理案件"],
  [active,"進行中"],
  [review,"社長確認待ち"]
 ].map(x=>`<div class="metric"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("");
}
function departments(){
 document.querySelector("#departmentsGrid").innerHTML=state.departments.map(d=>`
 <article class="department"><div class="head"><b>${d[0]}</b><span class="dept-count">${d[2]} AI</span></div><p>${d[1]}</p></article>`).join("");
}
function projects(filter="all"){
 const items=state.projects.filter(p=>filter==="all"||p.status===filter);
 document.querySelector("#projectGrid").innerHTML=items.map(p=>`
 <div class="project-row">
  <strong>${p.id}</strong>
  <div><strong>${p.name}</strong></div>
  <span class="department-name">${p.department}</span>
  <div class="progress-cell"><div class="mini-progress"><i style="width:${p.progress}%"></i></div></div>
  <span class="status ${p.status}">${labels[p.status]}</span>
 </div>`).join("");
}
function staff(){
 document.querySelector("#agents").innerHTML=state.agents.map(a=>`
 <div class="staff"><div class="avatar">${a[0]}</div><div><strong>${a[1]}</strong><span>${a[2]}</span></div></div>`).join("");
}
function approvals(){
 document.querySelector("#nextActions").innerHTML=state.approvals.map((a,i)=>`
 <div class="approval"><div class="avatar">${String(i+1).padStart(2,"0")}</div><div><strong>${a[0]}</strong><span>${a[1]}</span></div></div>`).join("");
}
function characters(){
 document.querySelector("#charactersGrid").innerHTML=state.characters.map(c=>`
 <div class="character"><strong>${c[0]}</strong><p>${c[1]}</p></div>`).join("");
}
document.querySelector("#projectFilter").addEventListener("change",e=>projects(e.target.value));
metrics();departments();projects();staff();approvals();characters();