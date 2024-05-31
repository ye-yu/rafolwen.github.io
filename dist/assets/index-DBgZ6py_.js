(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=l(e);fetch(e.href,n)}})();const a=`<!-- Frame 6 -->
<div class="main-section flex-col-24px">
<!-- Header -->
  <div class="flex-row-8px px-40px">
    <div class="font-bold-16px">
      <span class="color-p1">$ ~</span> raflie.com
    </div>
  </div>

  <!-- Frame 3 -->
  <div class="flex-row-8px" style="justify-content: center; align-items: center; height: 420px">
    <div class="font-bold-12px" style="text-align: center;">
      programming. music. sleep.
      <br /><br />
      those are the things that i like to do as an avid programmer
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />
      see my interests below
    </div>
    <a href="https://linkedin.com/in/raflie">
      <button class="button-default">or get in touch with me now</button>
    </a>
  </div>
</div>`,d=`<div class="flex-col-24px" style="justify-content: center; align-items: center; background-color: #333333; height: 400px;">
  <div class="font-bold-12px">
    to be added
  </div>
</div>`,s=document.getElementById("app");function c(o){if(!s)throw new Error("no component #app found");const t=document.createElement("template");t.innerHTML=o,s.appendChild(t.content.cloneNode(!0))}c(a);c(d);
