import { invoke } from "@tauri-apps/api/tauri"
import { appWindow } from "@tauri-apps/plugin-window"

let greetInputEl: HTMLInputElement | null
let greetMsgEl: HTMLElement | null

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    })
  }
}
window.addEventListener("DOMContentLoaded", () => {
  if (appWindow.label == "main") {
    appWindow.show()
    appWindow.setFocus()
  }

  greetInputEl = document.querySelector("#greet-input")
  greetMsgEl = document.querySelector("#greet-msg")
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault()
    greet()
  })
})

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="dark:bg-slate-700 dark:text-white text-black bg-white h-screen">
  <form id="greet-form" class="flex flex-col">
   <input id="greet-input" class="dark:bg-slate-700 bg-white border" placeholder="Enter a name..." />
   <button type="submit">Greet<button>
  </form>
  <p id="greet-msg"></p>
</div>
`
