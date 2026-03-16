let state = {
    nama: "",
    jml: 0,
    pilihan: [],
    terpilih: "",
    email: ""
};

function prosesTahap1() {
    let nama = document.getElementById('inputNama').value.trim();
    let jml = parseInt(document.getElementById('inputJml').value);

    if (!nama || isNaN(jml) || jml < 1 || jml > 10) {
        document.getElementById('err1').innerText = "Input tidak valid (1-10)";
        return;
    }

    state.nama = nama;
    state.jml = jml;

    const container = document.getElementById('containerPilihan');
    container.innerHTML = "";

    for (let i = 1; i <= jml; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control mb-2 pil-input";
        input.placeholder = "Pilihan " + i;

        container.appendChild(input);
    }

    document.getElementById('step2').classList.remove('d-none');
    document.getElementById('err1').innerText = "";
}

function prosesTahap2() {
    const inputs = document.querySelectorAll('.pil-input');
    state.pilihan = [];

    for (let input of inputs) {
        let val = input.value.trim();
        if (!val) {
            document.getElementById('err2').innerText = "Semua harus diisi";
            return;
        }
        state.pilihan.push(val);
    }

    const container = document.getElementById('containerSelection');
    container.innerHTML = "";

    state.pilihan.forEach((p, i) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <input type="radio" name="opt" value="${p}"> ${p}
        `;

        container.appendChild(div);
    });

    document.getElementById('step3').classList.remove('d-none');
    document.getElementById('err2').innerText = "";
}

function prosesTahap3() {
    const selected = document.querySelector('input[name="opt"]:checked');

    if (!selected) {
        document.getElementById('err3').innerText = "Pilih salah satu";
        return;
    }

    state.terpilih = selected.value;

    document.getElementById('step4').classList.remove('d-none');
    document.getElementById('err3').innerText = "";
}

function prosesTahap4() {
    const email = document.getElementById('inputEmail').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        document.getElementById('err4').innerText = "Email tidak valid";
        return;
    }

    state.email = email;

    const hasil = `Hallo, nama saya ${state.nama}, email ${state.email}, saya mempunyai sejumlah ${state.jml} pilihan yaitu ${state.pilihan.join(", ")}, dan saya memilih ${state.terpilih}.`;

    document.getElementById('teksHasil').innerText = hasil;
    document.getElementById('step5').classList.remove('d-none');
    document.getElementById('err4').innerText = "";
}