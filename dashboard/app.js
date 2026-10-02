const state={
 departments:[
  {name:"企画部",manager:"Plan-01 / 企画部長",desc:"新作企画・セリフ・シリーズ構成を担当",count:3},
  {name:"制作部",manager:"Create-01 / 制作部長",desc:"LINEスタンプ・グッズの制作を担当",count:4},
  {name:"品質管理部",manager:"Check-01 / 品質管理部長",desc:"文字欠け・重複・仕様違反を確認",count:2},
  {name:"登録販売部",manager:"Sales-01 / 登録販売部長",desc:"LINE・UP-T等の登録準備を担当",count:2},
  {name:"広報部",manager:"PR-01 / 広報部長",desc:"Instagram・Xの投稿と販促を担当",count:2},
  {name:"Webシステム部",manager:"Web-01 / システム部長",desc:"TTworks公式サイトと自動化を担当",count:2}
 ],
 projects:[
  {id:"FISH-001",name:"釣りスタンプ FISH-001",department:"登録販売部",owner:"Sales-02",status:"ready",progress:100,priority:"高"},
  {id:"FISH-002",name:"釣りスタンプ FISH-002",department:"制作部",owner:"Create-02",status:"active",progress:63,priority:"最優先"},
  {id:"FISH-003",name:"釣りスタンプ FISH-003",department:"企画部",owner:"Plan-02",status:"active",progress:18,priority:"中"},
  {id:"FISH-004",name:"釣りスタンプ FISH-004",department:"企画部",owner:"Plan-03",status:"active",progress:10,priority:"中"},
  {id:"CAT",name:"つくね・つみれ",department:"品質管理部",owner:"Check-02",status:"review",progress:78,priority:"高"},
  {id:"GOODS",name:"TTworks GOODS",department:"登録販売部",owner:"Sales-01",status:"ready",progress:45,priority:"中"},
  {id:"WEB",name:"TTworks公式Web",department:"Webシステム部",owner:"Web-01",status:"active",progress:72,priority:"高"},
  {id:"SNS",name:"Instagram / X",department:"広報部",owner:"PR-02",status:"active",progress:20,priority:"中"}
 ],
 agents:[
  ["P1","Plan-01","企画部長","企画方針・優先順位を統括"],
  ["P2","Plan-02","企画担当","LINEスタンプ企画・セリフ設計"],
  ["C1","Create-01","制作部長","制作工程・デザイン基準を統括"],
  ["C2","Create-02","制作担当","画像制作・シリーズ展開"],
  ["Q1","Check-01","品質管理部長","仕様・重複・文字品質を統括"],
  ["S1","Sales-01","登録販売部長","販売準備・登録内容を統括"],
  ["PR","PR-01","広報部長","SNS・販促計画を統括"],
  ["W1","Web-01","システム部長","Web・GitHub・自動化を統括"],
  ["CO","COO-01","業務統括AI","全社進捗を監視し代表へ報告"]
 ],
 approvals:[
  ["FISH-002","40点完成後の最終品質確認","画像生成・修正"],
  ["TTworks GOODS","価格・販売ページ公開の承認","販売"],
  ["LINE登録","申請・公開は代表承認後のみ","外部操作"],
  ["外部サービス","契約・決済・有料処理は自動実行しない","金銭"]
 ],
 reports:[
  ["制作部","FISH-002 第3弾を最優先として進行。未完成範囲を制作対象として管理。"],
  ["品質管理部","完成品は文字欠け・可読性・重複の順で確認する運用。"],
  ["登録販売部","1セット登録完了後、登録名を含む枝分かれ管理へ移行。"],
  ["Webシステム部","会社HQダッシュボードは本番サイトと分離したブランチで開発中。"]
 ],
 messages:[
  {from:"COO-01",role:"業務統括AI",text:"本日の最優先案件は FISH-002 です。制作部で進行し、完成後は品質管理部へ回します。"},
  {from:"Check-01",role:"品質管理部長",text:"完成済み画像は重複生成せず、文字欠け・読みにくさだけを修正対象にします。"}
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
 const ready=state.projects.filter(x=>x.status==="ready").length;
 document.querySelector("#metrics").innerHTML=[
  [state.departments.length,"稼働部署"],
  [state.agents.length,"AI社員"],
  [state.projects.length,"管理案件"],
  [active,"進行中"],
  [review+ready,"確認・登録待ち"]
 ].map(x=>`<div class="metric"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("");
 document.querySelector("#ceoApprovalCount").textContent=state.approvals.length;
 document.querySelector("#ceoRiskCount").textContent=state.projects.filter(x=>x.status==="review").length;
}

function management(){
 const avg=Math.round(state.projects.reduce((a,b)=>a+b.progress,0)/state.projects.length);
 document.querySelector("#managementList").innerHTML=[
  ["全体進捗",avg+"%"],
  ["最優先","FISH-002"],
  ["登録準備",state.projects.filter(x=>x.status==="ready").length+"件"],
  ["品質確認",state.projects.filter(x=>x.status==="review").length+"件"]
 ].map(x=>`<div class="management-item"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join("");
}

function departments(){
 document.querySelector("#departmentsGrid").innerHTML=state.departments.map(d=>`
 <article class="department">
  <div class="head"><b>${d.name}</b><span class="dept-count">${d.count} AI</span></div>
  <p>${d.desc}</p>
  <div class="manager">責任者：${d.manager}</div>
 </article>`).join("");
}

function projects(filter="all"){
 const items=state.projects.filter(p=>filter==="all"||p.status===filter);
 document.querySelector("#projectGrid").innerHTML=items.map(p=>`
 <div class="project-row">
  <strong>${p.id}</strong>
  <div><strong>${p.name}</strong></div>
  <span class="department-name">${p.department}</span>
  <span class="owner-name">${p.owner}</span>
  <div class="progress-cell"><div class="mini-progress"><i style="width:${p.progress}%"></i></div></div>
  <span class="status ${p.status}">${labels[p.status]}</span>
 </div>`).join("");
}

function staff(){
 document.querySelector("#agents").innerHTML=state.agents.map(a=>`
 <div class="staff">
  <div class="avatar">${a[0]}</div>
  <div><strong>${a[1]}</strong><span>${a[3]}</span></div>
  <span class="role-chip">${a[2]}</span>
 </div>`).join("");
}

function approvals(){
 document.querySelector("#nextActions").innerHTML=state.approvals.map((a,i)=>`
 <div class="approval">
  <div class="avatar">${String(i+1).padStart(2,"0")}</div>
  <div><strong>${a[0]}</strong><span>${a[1]}</span></div>
  <span class="role-chip">${a[2]}</span>
 </div>`).join("");
}

function reports(){
 document.querySelector("#reportsList").innerHTML=state.reports.map(r=>`
 <div class="report"><strong>${r[0]}</strong><span>${r[1]}</span></div>`).join("");
}

function renderChat(){
 document.querySelector("#chatLog").innerHTML=state.messages.map(m=>`
 <div class="message ${m.from==="てっぺい"?"ceo":""}">
  <div class="avatar">${m.from==="てっぺい"?"CEO":m.from.slice(0,2)}</div>
  <div class="bubble"><strong>${m.from} / ${m.role}</strong><p>${m.text}</p></div>
 </div>`).join("");
 const box=document.querySelector("#chatLog"); box.scrollTop=box.scrollHeight;
}

function characters(){
 document.querySelector("#charactersGrid").innerHTML=state.characters.map(c=>`
 <div class="character"><strong>${c[0]}</strong><p>${c[1]}</p></div>`).join("");
}

document.querySelector("#projectFilter").addEventListener("change",e=>projects(e.target.value));
document.querySelector("#commandForm").addEventListener("submit",e=>{
 e.preventDefault();
 const input=document.querySelector("#commandInput");
 const value=input.value.trim();
 if(!value)return;
 state.messages.push({from:"てっぺい",role:"代表取締役",text:value});
 state.messages.push({from:"COO-01",role:"業務統括AI",text:"指示を社内記録に追加しました。現在は外部処理を行わず、実行対象として保留します。"});
 input.value="";
 renderChat();
});
document.querySelector("#newProjectBtn").addEventListener("click",()=>{
 document.querySelector("#commandInput").focus();
 document.querySelector("#commandInput").placeholder="新規案件名と指示内容を入力してください";
});

metrics();management();departments();projects();staff();approvals();reports();renderChat();characters();