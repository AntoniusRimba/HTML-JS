let state = {
    nama: "",
    jml: 0,
    pilihan: [],
    terpilih: "",
    email: ""
};

function prosesTahap1() {
    state.nama = document.getElementById('inputNama').value;
    state.jml = parseInt(document.getElementById('inputJml').value);

    if (!state.nama || isNaN(state.jml) || state.jml < 1) {
        document.getElementById('err1').innerText = "Mohon isi nama dan jumlah dengan benar.";
        return;
    }

    const container = document.getElementById('containerPilihan');
    container.innerHTML = "";
    for (let i = 1; i <= state.jml; i++) {
        container.innerHTML += `
            <div class="field">
                <label>Pilihan ${i}</label>
                <input type="text" class="pil-input" placeholder="Teks pilihan ${i}...">
            </div>`;
    }
    document.getElementById('step2').classList.remove('hidden');
    document.getElementById('err1').innerText = "";
}

function tambahSatuInput() {
    state.jml++;
    const container = document.getElementById('containerPilihan');
    const div = document.createElement('div');
    div.className = "field";
    div.innerHTML = `<label>Pilihan ${state.jml}</label>
                     <input type="text" class="pil-input" placeholder="Teks pilihan ${state.jml}...">`;
    container.appendChild(div);
}

function prosesTahap2() {
    const inputs = document.querySelectorAll('.pil-input');
    state.pilihan = Array.from(inputs).map(i => i.value);

    if (state.pilihan.some(p => p === "")) {
        document.getElementById('err2').innerText = "Harap isi semua teks pilihan.";
        return;
    }

    const container = document.getElementById('containerSelection');
    container.innerHTML = "";
    state.pilihan.forEach((p, idx) => {
        container.innerHTML += `
            <div class="radio-item">
                <input type="radio" name="opt" id="p${idx}" value="${p}">
                <label for="p${idx}" style="display:inline; font-weight:normal; margin-left:10px;">${p}</label>
            </div>`;
    });
    document.getElementById('step3').classList.remove('hidden');
    document.getElementById('err2').innerText = "";
}

function prosesTahap3() {
    const selected = document.querySelector('input[name="opt"]:checked');
    if (!selected) {
        document.getElementById('err3').innerText = "Pilih salah satu opsi.";
        return;
    }
    state.terpilih = selected.value;
    document.getElementById('step4').classList.remove('hidden');
    document.getElementById('err3').innerText = "";
}

function prosesTahap4() {
    const email = document.getElementById('inputEmail').value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        document.getElementById('err4').innerText = "Email tidak valid.";
        return;
    }

    state.email = email;
    const hasil = `Hallo, nama saya ${state.nama}, email ${state.email}, saya mempunyai sejumlah ${state.pilihan.length} pilihan yaitu ${state.pilihan.join(", ")}, dan saya memilih ${state.terpilih}.`;

    document.getElementById('teksHasil').innerText = hasil;
    document.getElementById('step5').classList.remove('hidden');
    document.getElementById('err4').innerText = "";
}