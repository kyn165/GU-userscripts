// @ts-check
import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.1.min.js";

const { div, p, a } = van.tags;

/** @param {{ id: number, name: string, description: string, filename: string }} param0 */
function Card({ id, name, description, filename }){
  // @ts-ignore
  const installed = typeof window.__installedExtension !== "undefined" && window.__installedExtension.includes(id);

  return div({
    className: "card",
    "data-id": id,
  }, [
    p({ className: "name" }, name),
    p({ className: "desc" }, description),
    a({
      className: "install",
      href: `https://github.com/kyn165/GU-userscripts/raw/main/scripts/${filename}`,
      // target: "_blank",
      // rel: "noreferrer noopener",
    }, installed ? "✅ インストール済み" : "⬇️ インストールする")
  ]);
}

export function App(){
  const scripts = van.state([]);
  const error = van.state(false);

  (async() => {
    const res = await fetch("./list.json");
    scripts.val = await res.json();
  })().catch(err => {
    console.error(err);
    error.val = true;
  });

  if(error.val){
    return p("エラーが発生しました");
  }

  return () => div({ className: "list" }, scripts.val.map(item => Card(item)));
}
