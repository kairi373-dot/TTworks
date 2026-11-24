const button=document.querySelector(".menu-button"),nav=document.querySelector(".nav");button?.addEventListener("click",()=>{const open=nav.classList.toggle("open");button.setAttribute("aria-expanded",String(open))});nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");button?.setAttribute("aria-expanded","false")}));document.getElementById("year").textContent=new Date().getFullYear();const data=window.TTWORKS_DATA||{products:[],images:{},links:[]};const fallback=text=>{const d=document.createElement("div");d.className="image-fallback";d.textContent=text;return d};const grid=document.getElementById("product-grid");data.products.forEach(p=>{const card=document.createElement("article");card.className="product-card";const box=document.createElement("div");box.className="product-image";const img=new Image();img.alt=p.label+" 商品画像";img.src=p.image;img.onload=()=>box.appendChild(img);img.onerror=()=>box.appendChild(fallback(p.name));card.append(box);const heading=document.createElement("h3");heading.textContent=p.label;const detail=document.createElement("p");detail.textContent=p.name;card.append(heading,detail);if(p.url){const a=document.createElement("a");a.href=p.url;a.target="_blank";a.rel="noopener noreferrer";a.className="product-link";a.textContent="作品一覧を見る →";card.append(a)}grid?.appendChild(card)});document.querySelectorAll("[data-image-key]").forEach(slot=>{const path=data.images?.[slot.dataset.imageKey];if(!path)return;const img=new Image();img.alt="TTworks character collection";img.src=path;img.onload=()=>slot.replaceChildren(img)});const links=document.getElementById("external-links");data.links.forEach(item=>{const el=document.createElement(item.url?"a":"div");el.className=item.url?"external-link":"external-coming";if(item.url){el.href=item.url;el.target="_blank";el.rel="noopener noreferrer"}el.innerHTML="<span>"+item.name+"</span><small>"+(item.url?item.note:"Coming soon")+"</small>";links?.appendChild(el)});
// Verified product links are maintained in site-data.js.
const stickerGrid=document.getElementById("sticker-grid"), stickerFilters=document.getElementById("sticker-filters");
const stickers=Array.isArray(data.stickers)?data.stickers:[];
if(stickerGrid&&stickerFilters&&stickers.length){
  const categories=["すべて",...new Set(stickers.map(s=>s.category))];
  function renderStickers(category){
    const visible=stickers.filter(s=>category==="すべて"||s.category===category);
    stickerGrid.replaceChildren();
    visible.forEach(s=>{
      const article=document.createElement("article");article.className="sticker-card";
      const a=document.createElement("a");a.className="sticker-art";a.href=s.url;a.target="_blank";a.rel="noopener noreferrer";
      const img=new Image();img.alt=s.title;img.src=s.image;img.loading="lazy";img.width=240;img.height=240;
      img.onerror=()=>a.replaceChildren(fallback(s.title));a.append(img);
      const body=document.createElement("div");body.className="sticker-card-copy";
      const label=document.createElement("p");label.className="sticker-category";label.textContent=s.category;
      const h=document.createElement("h3");h.textContent=s.title;
      const p=document.createElement("p");p.textContent=s.description;
      const buy=document.createElement("a");buy.className="sticker-buy";buy.href=s.url;buy.target="_blank";buy.rel="noopener noreferrer";buy.textContent="LINE STOREで見る →";
      body.append(label,h,p,buy);article.append(a,body);stickerGrid.append(article);
    });
    stickerFilters.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.textContent===category)));
  }
  categories.forEach(category=>{
    const b=document.createElement("button");b.type="button";b.textContent=category;b.addEventListener("click",()=>renderStickers(category));stickerFilters.append(b);
  });
  renderStickers("すべて");
}
