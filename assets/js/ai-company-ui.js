(() => {
const labels={idle:"待機",working:"作業中",reporting:"海里へ報告",approval_wait:"CEO承認待ち",blocked:"停止",alert:"警告",completed:"完了"};
const icons={"AI-01":"HARU","AI-02":"KAIRI","AI-03":"TSUKUNE","AI-04":"TSUMIRE","AI-05":"KAYO","AI-06":"REI","AI-07":"GEN","AI-08":"MORIYA","AI-09":"KANTA","AI-10":"SANGI","AI-11":"KANADE","AI-12":"PICO"};
let people=[], logs=[];
const team=document.getElementById("team");
function card(p){return `<article class="card ${p.status}" data-id="${p.id}"><span class="avatar">${icons[p.id]}</span><div><span class="zone">${p.zone}</span><h3>${p.name}</h3><p>${p.role}</p></div><b class="status">${labels[p.status]||p.status}</b></article>`}
function counts(){document.getElementById("workingCount").textContent=people.filter(x=>["working","reporting"].includes(x.status)).length;document.getElementById("approvalCount").textContent=people.filter(x=>x.status==="approval_wait").length;document.getElementById("alertCount").textContent=people.filter(x=>x.status==="alert").length}
function render(){team.innerHTML=people.map(card).join("");counts()}
function log(e){logs.unshift(`<div class="log"><b>${e.id}</b> ${labels[e.status]||e.status} ${e.message||""}<br><small>${new Date(e.at).toLocaleString("ja-JP")}</small></div>`);logs=logs.slice(0,8);document.getElementById("activity").innerHTML=logs.join("");document.getElementById("approvalQueue").innerHTML=people.filter(x=>x.status==="approval_wait").map(x=>`<div class="log"><b>${x.name}</b>｜${x.role}</div>`).join("")||"現在、承認待ちはありません。"}
fetch("assets/data/ai-employees.json").then(r=>r.json()).then(d=>{people=d.employees;render()}).catch(()=>team.innerHTML="社員マスターを読み込めませんでした。");
window.addEventListener("ttworks:ai-status",ev=>{const p=people.find(x=>x.id===ev.detail.id);if(!p)return;p.status=ev.detail.status;render();log(ev.detail)});
setInterval(()=>document.getElementById("clock").textContent=new Date().toLocaleString("ja-JP"),1000);
})();