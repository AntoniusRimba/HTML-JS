// Objek untuk menyimpan data state
let state = {
    nama: "",
    jumlah: 0,
    daftarPilihan: [],
    pilihanFinal: "",
    email: ""
};

// Fungsi baru untuk menambah satu baris input secara dinamis
function tambahSatuInput() {
    state.jumlah++; // Tambah counter jumlah pilihan [cite: 11]
    const container = document.getElementById('containerPilihan');

    const div = document.createElement('div');
    div.className = 'input-row';
    div.innerHTML = `
        <label>Pilihan ${state.jumlah} :</label>
        <input type="text" class="input-teks-pilihan" placeholder="<Teks Pilihan ${state.jumlah}>">
    `;
    container.appendChild(div);
}

// Tahap 1 -> Tahap 2
function prosesTahap1() {
    const namaInput = document.getElementById('inputNama').value;
    const jmlInput = parseInt(document.getElementById('inputJml').value);
    const err = document.getElementById('err1');

    // Error Trapping [cite: 42]
    if (!namaInput || isNaN(jmlInput) || jmlInput <= 0) {
        err.innerText = "Nama dan Jumlah harus diisi dengan benar!";
        return;
    }

    state.nama = namaInput;
    state.jumlah = jmlInput;
    err.innerText = "";

    // Generate input dinamis [cite: 11]
    const container = document.getElementById('containerPilihan');
    container.innerHTML = "";
    for (let i = 1; i <= state.jumlah; i++) {
        container.innerHTML += `
            <div class="input-row">
                <label>Pilihan ${i} :</label>
                <input type="text" class="input-teks-pilihan" placeholder="<Teks Pilihan ${i}>">
            </div>
        `;
    }
    document.getElementById('step2').classList.remove('hidden');
}

// Tahap 2 -> Tahap 3
function prosesTahap2() {
    const inputs = document.querySelectorAll('.input-teks-pilihan');
    const err = document.getElementById('err2');
    let tempPilihan = [];

    // Error trapping: pastikan tidak ada yang kosong 
    for (let input of inputs) {
        if (!input.value.trim()) {
            err.innerText = "Semua teks pilihan harus diisi!";
            return;
        }
        tempPilihan.push(input.value);
    }

    state.daftarPilihan = tempPilihan;
    state.jumlah = tempPilihan.length; // Sinkronisasi jumlah akhir 
    err.innerText = "";

    // Lanjut ke pembuatan Radio Button (Tahap 3) [cite: 13, 21]
    const container = document.getElementById('containerSelection');
    container.innerHTML = "";
    state.daftarPilihan.forEach((teks, idx) => {
        container.innerHTML += `
            <div>
                <input type="radio" name="radioPilih" id="opt${idx}" value="${teks}">
                <label for="opt${idx}" style="color:black; width:auto; font-weight:normal;">${teks}</label>
            </div>
        `;
    });
    document.getElementById('step3').classList.remove('hidden');
}

// Tahap 3 -> Tahap 4
function prosesTahap3() {
    const selected = document.querySelector('input[name="radioPilih"]:checked');
    const err = document.getElementById('err3');

    if (!selected) {
        err.innerText = "Silakan pilih salah satu!";
        return;
    }

    state.pilihanFinal = selected.value;
    err.innerText = "";
    document.getElementById('step4').classList.remove('hidden');
}

// Tahap 4 -> Tahap 5 (Final)
function prosesTahap4() {
    const emailInput = document.getElementById('inputEmail').value;
    const err = document.getElementById('err4');

    // Pattern matching email [cite: 25]
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput)) {
        err.innerText = "Format email tidak valid (contoh: nama@domain.com)!";
        return;
    }

    state.email = emailInput;
    err.innerText = "";

    // Tampilkan Hasil Akhir [cite: 39]
    const daftarStr = state.daftarPilihan.join(", ");
    const hasil = `Hallo, nama saya ${state.nama}, email ${state.email} saya mempunyai sejumlah ${state.jumlah} pilihan yaitu ${daftarStr}, dan saya memilih ${state.pilihanFinal}`;

    document.getElementById('teksHasil').innerText = hasil;
    document.getElementById('step5').classList.remove('hidden');
}