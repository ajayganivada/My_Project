const plants = [
  {
    name: "Ficus",
    img: "https://www.bonsaiempire.com/images/site/species/ficus-bonsai.jpg",
  },
  {
    name: "Dwarf Jade",
    img: "https://www.bonsaiempire.com/images/site/species/jade-bonsai.jpg",
  },
  {
    name: "Fukien Tea",
    img: "https://www.bonsaiempire.com/images/site/species/carmona-bonsai.jpg",
  },
  {
    name: "Azalea",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-azalea-bonsai-heike.jpg",
  },
  {
    name: "Snow Rose",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-serissa-fotoproze.jpg",
  },
  {
    name: "Bougainvillea",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-bougainvillea-IMG-6065.jpg",
  },
  {
    name: "Sweet Plum",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-sageretia-sodas.jpg",
  },
  {
    name: "Box Wood",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-buxusIMG-5917.jpg",
  },
  {
    name: "Olive",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-oliveIMG-7167.jpg",
  },
  {
    name: "Hawaiian Umbrella",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-hawaiian-umbrella.jpg",
  },
  {
    name: "Money Tree",
    img: "https://www.bonsaiempire.com/images/site/species/species-money-tree.jpg",
  },
  {
    name: "Privet",
    img: "https://www.bonsaiempire.com/images/site/species/bonsai-species-privet-saulieu2019-4457.jpg",
  },
];

let currentMode = "All";
let isReg = false;
const db = JSON.parse(localStorage.getItem("bonsai_vibrant_db")) || {};

function togReg() {
  isReg = !isReg;
  document.getElementById("reg-box").style.display = isReg ? "block" : "none";
  document.getElementById("sub-btn").innerText = isReg
    ? "JOIN THE FOREST"
    : "DISCOVER THE FOREST";
}

function setMode(m, event) {
  currentMode = m;
  document.getElementById("mode-display").innerText =
    `CURRENT MODE: ${m.toUpperCase()}`;
  document.querySelectorAll(".it").forEach((i) => i.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }
  render();
}

function render() {
  const gal = document.getElementById("gallery");
  gal.innerHTML = "";
  plants.forEach((p, i) => {
    gal.innerHTML += `
      <div class="tree-card" onclick="openModal(${i})">
        <img src="${p.img}" alt="${p.name}">
        <div class="card-info">
          <h2>${p.name}</h2>
        </div>
      </div>`;
  });
}

function showContact() {
  const gal = document.getElementById("gallery");
  document.getElementById("mode-display").innerText = "LET'S GROW TOGETHER";
  gal.innerHTML = `
    <div class="contact-box">
      <h2 style="color:var(--primary); font-weight: 800; margin-bottom: 10px; font-size: 18px;">Botanical Inquiry</h2>
      <p style="color:#666; margin-bottom:20px; font-size: 13px;">Contact our specialists for pruning and soil analysis.</p>
      <input type="text" placeholder="Full Name">
      <input type="email" placeholder="Email Address">
      <textarea rows="6" placeholder="Message..."></textarea>
      <button class="btn" onclick="alert('Inquiry Sent! We will bloom back shortly.')">SEND MESSAGE</button>
    </div>`;
}

function openModal(idx) {
  const p = plants[idx];
  document.getElementById("m-img").src = p.img;
  document.getElementById("m-title").innerText = p.name;
  document.getElementById("m-subtitle").innerText =
    `${currentMode} Comprehensive Botanical Profile`;

  let text = `Welcome to the detailed documentation for the <b>${p.name}</b> specimen focusing on <b>${currentMode}</b>. Cultivating a bonsai is an art of patience and precise environmental orchestration. <br><br>`;
  text += `In this vibrant analysis of <b>${currentMode}</b>, we highlight how the ${p.name} interacts with its surroundings. To exceed horticultural expertise, we observe that the ${p.name} thrives when <b>${currentMode}</b> components are optimized for seasonal growth. <br><br>`;
  text += `Detailed data indicates that specimens managed under these specific <b>${currentMode}</b> protocols develop a much stronger resistance to environmental changes and common garden pests, allowing them to live for generations.`;

  document.getElementById("m-content").innerHTML = text;
  document.getElementById("info-modal").style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("info-modal").style.display = "none";
  document.body.style.overflow = "auto";
}

document.getElementById("auth-form").onsubmit = (e) => {
  e.preventDefault();
  const u = document.getElementById("un").value;
  const p = document.getElementById("pw").value;

  if (isReg) {
    db[u] = p;
    localStorage.setItem("bonsai_vibrant_db", JSON.stringify(db));
    alert("Success! Please manually enter your details to login.");
    togReg();
  } else {
    if (db[u] === p) {
      document.getElementById("auth-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
      setTimeout(
        () => (document.getElementById("main-content").style.opacity = "1"),
        50,
      );
      render();
    } else {
      alert("Invalid credentials. Please try again.");
    }
  }
};
