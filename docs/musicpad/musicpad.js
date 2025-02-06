const notes = new Array();

function cloneStaff() {
  const template = document.getElementById("staff");
  const clone = template.content.cloneNode(true);
  return clone;
}

function appendAndScrollToVisible(node) {
  document.getElementById("notes")?.appendChild(node);
  document
    .getElementById("pad")
    ?.scrollIntoView({ behavior: "smooth", block: "end" });
  const lastChild = document.getElementById("notes")?.lastElementChild;
  return lastChild;
}

const ledgers = {
  "13": [9, 11, 13],
  "12": [9, 11],
  "11": [9, 11],
  "10": [9],
  "9": [9],
  "-1": [-2],
  "-2": [-2],
  "-3": [-2, -4],
  "-4": [-2, -4],
  "-5": [-2, -4, -6],
};

function append(n) {
  const appendedElement = appendAndScrollToVisible(cloneStaff());
  const absolute = document.createElement("div");
  absolute.textContent = `♩`;
  absolute.style.position = "absolute";
  absolute.style.fontSize = "80px";
  absolute.style.left = "0px";
  absolute.style.top = `${-n * 11}px`;
  absolute.style.transform = "translate(-10px, 62px)";

  const ledgersToCreate = ledgers[n] ?? [];
  for (const n of ledgersToCreate) {
    const ledger = document.createElement("div");
    ledger.style.position = "absolute";
    ledger.style.width = "40px";
    ledger.style.height = "2px";
    ledger.style.background = "#666";
    ledger.style.left = "0px";
    ledger.style.top = `${-n * 11}px`;
    ledger.style.transform = "translate(5px, 148px)";

    appendedElement.appendChild(ledger);
  }

  appendedElement.appendChild(absolute);
  notes.push(n);
}

function appendEmpty() {
  appendAndScrollToVisible(cloneStaff());
  notes.push(null);
}

function deleteLast() {
  document.getElementById("notes")?.lastElementChild?.remove();
  return notes.pop();
}
function moveLastUp() {
  if (!notes.length) return;
  const lastNumber = deleteLast();
  if (typeof lastNumber != "number") return moveLastUp();

  append(Math.min(lastNumber + 1, 13));
}
function moveLastDown() {
  if (!notes.length) return;
  const lastNumber = deleteLast();
  if (typeof lastNumber != "number") return moveLastDown();

  append(Math.max(lastNumber - 1, -5));
}

Object.assign(window, {
  append,
  appendEmpty,
  deleteLast,
  moveLastUp,
  moveLastDown,
});
