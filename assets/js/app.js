// ==========================================
// KONFIGURASI LINK GOOGLE APPS SCRIPT
// ==========================================
// Ganti URL di bawah ini dengan URL Web App Google Apps Script Anda nanti!
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsJEDhyOBtjz5w6tLB70ODJqIAXfhAB-s54nTKhKx6r81nMJKOwd6z3zU85RvyBa6B/exec';
// ==========================================

document.getElementById('tgl_skrining').valueAsDate = new Date();

// Data Kuesioner
const phq4Data = [
    { id: "phq1", text: "Dalam 2 minggu terakhir, seberapa sering Anda kurang bersemangat melakukan kegiatan sehari-hari?", options: ["Tidak sama sekali", "Kurang dari 1 minggu", "Lebih dari 1 minggu", "Hampir setiap hari"] },
    { id: "phq2", text: "Dalam 2 minggu terakhir, seberapa sering Anda merasa murung, tertekan, atau putus asa?", options: ["Tidak sama sekali", "Kurang dari 1 minggu", "Lebih dari 1 minggu", "Hampir setiap hari"] },
    { id: "phq3", text: "Dalam 2 minggu terakhir, seberapa sering Anda merasa gugup, cemas, atau gelisah?", options: ["Tidak sama sekali", "Kurang dari 1 minggu", "Lebih dari 1 minggu", "Hampir setiap hari"] },
    { id: "phq4", text: "Dalam 2 minggu terakhir, seberapa sering Anda tidak mampu mengendalikan rasa khawatir?", options: ["Tidak sama sekali", "Kurang dari 1 minggu", "Lebih dari 1 minggu", "Hampir setiap hari"] }
];

const epdsData = [
    { id: "ep1", text: "Saya bisa tertawa dan melihat sisi lucu dari berbagai hal:", options: [{t: "Ya, seperti biasanya", v: 0}, {t: "Sekarang tidak terlalu sering", v: 1}, {t: "Sekarang agak jarang", v: 2}, {t: "Tidak sama sekali", v: 3}] },
    { id: "ep2", text: "Saya memandang masa depan dengan penuh harapan:", options: [{t: "Seperti yang pernah saya lakukan dulu", v: 0}, {t: "Agak kurang dari biasanya", v: 1}, {t: "Jelas kurang dari biasanya", v: 2}, {t: "Hampir tidak sama sekali", v: 3}] },
    { id: "ep3", text: "Saya menyalahkan diri saya sendiri ketika ada hal-hal yang salah:", options: [{t: "Ya, hampir selalu", v: 3}, {t: "Ya, kadang-kadang", v: 2}, {t: "Tidak terlalu sering", v: 1}, {t: "Tidak, tidak pernah", v: 0}] },
    { id: "ep4", text: "Saya cemas atau khawatir tanpa alasan yang jelas:", options: [{t: "Tidak, tidak sama sekali", v: 0}, {t: "Hampir tidak pernah", v: 1}, {t: "Ya, kadang-kadang", v: 2}, {t: "Ya, sangat sering", v: 3}] },
    { id: "ep5", text: "Saya merasa takut atau panik tanpa alasan yang sangat jelas:", options: [{t: "Ya, cukup sering", v: 3}, {t: "Ya, kadang-kadang", v: 2}, {t: "Tidak, tidak sering", v: 1}, {t: "Tidak, tidak sama sekali", v: 0}] },
    { id: "ep6", text: "Banyak hal menjadi beban untuk saya:", options: [{t: "Ya, sering kali saya tidak dapat mengatasinya", v: 3}, {t: "Ya, kadang saya tidak dapat mengatasi seperti biasanya", v: 2}, {t: "Tidak, saya hampir selalu dapat mengatasinya dengan baik", v: 1}, {t: "Tidak, saya selalu dapat mengatasinya dengan baik", v: 0}] },
    { id: "ep7", text: "Saya merasa tidak bahagia sehingga sulit tidur:", options: [{t: "Ya, sering kali", v: 3}, {t: "Ya, kadang-kadang", v: 2}, {t: "Tidak terlalu sering", v: 1}, {t: "Tidak, tidak sama sekali", v: 0}] },
    { id: "ep8", text: "Saya merasa sedih atau menderita:", options: [{t: "Ya, sering kali", v: 3}, {t: "Ya, cukup sering", v: 2}, {t: "Tidak terlalu sering", v: 1}, {t: "Tidak, tidak sama sekali", v: 0}] },
    { id: "ep9", text: "Saya merasa sangat tidak senang sehingga saya sering menangis:", options: [{t: "Ya, sering kali", v: 3}, {t: "Ya, cukup sering", v: 2}, {t: "Hanya sesekali", v: 1}, {t: "Tidak, tidak pernah", v: 0}] },
    { id: "ep10", text: "Pikiran untuk menyakiti diri sendiri telah terfikir oleh saya:", options: [{t: "Ya, cukup sering", v: 3}, {t: "Kadang-kadang", v: 2}, {t: "Hampir tidak pernah", v: 1}, {t: "Tidak pernah", v: 0}] }
];

const sdqData = [
    "Gelisah, hiperaktif, tidak bisa diam untuk waktu lama", "Sering mengeluh sakit kepala, sakit perut atau sakit-sakit lainnya", "Sering sulit mengendalikan kemarahan", "Cenderung menyendiri atau lebih suka bermain sendiri", "Umumnya bertingkah laku baik, biasanya melakukan apa yang disuruh atau diminta (Reverse)", "Cemas atau sering kuatir terhadap apapun", "Terus menerus bergerak dengan resah atau mengeliat-geliat", "Mempunyai satu atau lebih teman baik (Reverse)", "Sering berkelahi dengan anak lain atau mengintimidasi mereka", "Sering menangis, merasa tidak bahagia atau sedih", "Pada umumnya disukai oleh anak lain (Reverse)", "Perhatian mudah teralih, tidak dapat berkonsentrasi", "Mudah kehilangan rasa percaya diri, gugup dalam situasi yang baru", "Sering berbohong atau berbuat curang", "Diganggu, dipermainkan, atau diintimidasi oleh anak lain", "Sebelum melakukan sesuatu berpikir dahulu tentang akibatnya (Reverse)", "Mencuri dari rumah, sekolah atau tempat lain", "Lebih mudah berteman dengan orang dewasa daripada anak-anak lain", "Mudah takut atau banyak yang ditakuti", "Mampu memperhatikan dengan baik, mampu menyelesaikan tugas (Reverse)"
];

function renderKuesioner() {
    let htmlPHQ = ''; phq4Data.forEach((q, idx) => { let optionsHtml = q.options.map((opt, v) => `<div class="relative"><input type="radio" name="${q.id}" id="${q.id}_${v}" value="${v}" class="peer sr-only radio-custom" onchange="checkStep2Completion()"><label for="${q.id}_${v}" class="block p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 peer-checked:ring-2 peer-checked:ring-indigo-500 text-sm md:text-base">${opt}</label></div>`).join(''); htmlPHQ += `<div class="mb-4"><h3 class="font-medium mb-3 text-gray-800"><span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm mr-2">${idx+1}</span>${q.text}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-2">${optionsHtml}</div></div>`; }); document.getElementById('phq4-questions-container').innerHTML = htmlPHQ;
    let htmlEPDS = ''; epdsData.forEach((q, idx) => { let optionsHtml = q.options.map((opt, i) => `<div class="relative"><input type="radio" name="${q.id}" id="${q.id}_${i}" value="${opt.v}" class="peer sr-only radio-custom" onchange="checkStep2Completion()"><label for="${q.id}_${i}" class="block p-3 border rounded-lg cursor-pointer transition-colors hover:bg-pink-50 peer-checked:ring-2 peer-checked:ring-pink-500 peer-checked:border-pink-500 text-sm md:text-base">${opt.t}</label></div>`).join(''); htmlEPDS += `<div class="mb-4 pb-4 border-b border-gray-100 last:border-0"><h3 class="font-medium mb-3 text-gray-800"><span class="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm mr-2">${idx+1}</span>${q.text}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-2">${optionsHtml}</div></div>`; }); document.getElementById('epds-questions-container').innerHTML = htmlEPDS;
    let htmlSDQ = ''; sdqData.forEach((text, idx) => { let isReverse = text.includes("(Reverse)"); let cleanText = text.replace("(Reverse)", "").trim(); let vTidak = isReverse ? 2 : 0; let vKadang = 1; let vSering = isReverse ? 0 : 2; htmlSDQ += `<div class="mb-4 pb-4 border-b border-gray-100 last:border-0"><h3 class="font-medium mb-3 text-gray-800"><span class="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm mr-2">${idx+1}</span>${cleanText}</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-2"><div class="relative"><input type="radio" name="sdq${idx+1}" id="sdq${idx+1}_0" value="${vTidak}" class="peer sr-only radio-custom" onchange="checkStep2Completion()"><label for="sdq${idx+1}_0" class="block p-3 border rounded-lg cursor-pointer text-center peer-checked:ring-2 peer-checked:ring-teal-500">Tidak Pernah</label></div><div class="relative"><input type="radio" name="sdq${idx+1}" id="sdq${idx+1}_1" value="${vKadang}" class="peer sr-only radio-custom" onchange="checkStep2Completion()"><label for="sdq${idx+1}_1" class="block p-3 border rounded-lg cursor-pointer text-center peer-checked:ring-2 peer-checked:ring-teal-500">Kadang-kadang</label></div><div class="relative"><input type="radio" name="sdq${idx+1}" id="sdq${idx+1}_2" value="${vSering}" class="peer sr-only radio-custom" onchange="checkStep2Completion()"><label for="sdq${idx+1}_2" class="block p-3 border rounded-lg cursor-pointer text-center peer-checked:ring-2 peer-checked:ring-teal-500">Sering Kali</label></div></div></div>`; }); document.getElementById('sdq-questions-container').innerHTML = htmlSDQ;
}

renderKuesioner();

function toggleKuesioner() {
    const val = document.querySelector('input[name="jenis_skrining"]:checked').value;
    document.getElementById('kuesioner-phq4').classList.add('hidden'); document.getElementById('kuesioner-epds').classList.add('hidden'); document.getElementById('kuesioner-sdq').classList.add('hidden'); document.getElementById('container-nifas').classList.add('hidden');
    const allRadios = document.querySelectorAll('#kuesioner-phq4 input, #kuesioner-epds input, #kuesioner-sdq input'); allRadios.forEach(r => r.removeAttribute('required')); document.getElementById('jenis_nifas').removeAttribute('required');

    if(val === 'PHQ4') { document.getElementById('kuesioner-phq4').classList.remove('hidden'); document.querySelectorAll('#kuesioner-phq4 input[type="radio"]').forEach(r => r.setAttribute('required', 'true')); }
    else if (val === 'EPDS') { document.getElementById('kuesioner-epds').classList.remove('hidden'); document.getElementById('container-nifas').classList.remove('hidden'); document.getElementById('jenis_nifas').setAttribute('required', 'true'); document.querySelectorAll('#kuesioner-epds input[type="radio"]').forEach(r => r.setAttribute('required', 'true')); }
    else if (val === 'SDQ') { document.getElementById('kuesioner-sdq').classList.remove('hidden'); document.querySelectorAll('#kuesioner-sdq input[type="radio"]').forEach(r => r.setAttribute('required', 'true')); }
    document.getElementById('btn-submit').classList.remove('hidden');
    checkStep2Completion();
}

// Visual Validation NIK
document.getElementById('nik').addEventListener('input', function(e) {
    const val = e.target.value;
    const feedback = document.getElementById('nik_feedback');
    if (val.length === 0) {
        feedback.innerText = "";
        e.target.classList.remove('border-red-500', 'border-green-500', 'ring-red-200', 'ring-green-200');
    } else if (val.length !== 16 || isNaN(val)) {
        feedback.innerHTML = '<i class="fas fa-times-circle text-red-500"></i> Harus 16 Digit Angka';
        e.target.classList.add('border-red-500', 'ring-red-200');
        e.target.classList.remove('border-green-500', 'ring-green-200');
    } else {
        feedback.innerHTML = '<i class="fas fa-check-circle text-green-500"></i> NIK Valid';
        e.target.classList.add('border-green-500', 'ring-green-200');
        e.target.classList.remove('border-red-500', 'ring-red-200');
    }
    saveDraft();
});

// Auto-save form as draft
const inputsToSave = ['tgl_skrining', 'nama', 'nik', 'tgl_lahir', 'no_wa', 'status_menikah', 'pendidikan', 'pekerjaan', 'institusi', 'provinsi', 'kabupaten', 'kecamatan', 'alamat'];
inputsToSave.forEach(id => {
    document.getElementById(id).addEventListener('input', saveDraft);
});

function saveDraft() {
    let draft = {};
    inputsToSave.forEach(id => { draft[id] = document.getElementById(id).value; });
    localStorage.setItem('ckg_draft', JSON.stringify(draft));
}

function loadDraft() {
    const draft = localStorage.getItem('ckg_draft');
    if (draft) {
        let data = JSON.parse(draft);
        inputsToSave.forEach(id => { if(data[id]) { document.getElementById(id).value = data[id]; } });
        // Trigger validation if NIK has value
        const nikEvent = new Event('input');
        document.getElementById('nik').dispatchEvent(nikEvent);
    }
}
loadDraft();

// Wizard Navigation Logic
let currentStep = 1;
const totalSteps = 3;

function updateProgressBar() {
    const percentage = ((currentStep) / totalSteps) * 100;
    document.getElementById('progressBar').style.width = percentage + '%';

    const stepTitles = ["Data Diri", "Pemilihan Skrining", "Kuesioner"];
    document.getElementById('stepIndicatorText').innerText = `Langkah ${currentStep} dari ${totalSteps}: ${stepTitles[currentStep-1]}`;
}

function nextStep(step) {
    // Basic validation before step 1 -> 2
    if(step === 2) {
        const step1Inputs = document.querySelectorAll('#step1 input[required], #step1 select[required], #step1 textarea[required]');
        for (let input of step1Inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return;
            }
        }
        const nikLen = document.getElementById('nik').value.length;
        if(nikLen !== 16) {
            alert("NIK harus tepat 16 digit angka!");
            document.getElementById('nik').focus();
            return;
        }
    }

    document.getElementById(`step${currentStep}`).classList.add('hidden');
    currentStep = step;
    document.getElementById(`step${currentStep}`).classList.remove('hidden');
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    currentStep = step;
    document.getElementById(`step${currentStep}`).classList.remove('hidden');
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkStep2Completion() {
    const btnToStep3 = document.getElementById('btn-to-step3');
    const selectedSkrining = document.querySelector('input[name="jenis_skrining"]:checked');

    if (selectedSkrining) {
        if (selectedSkrining.value === 'EPDS') {
            const nifasVal = document.getElementById('jenis_nifas').value;
            if (nifasVal !== '') {
                btnToStep3.disabled = false;
                btnToStep3.style.opacity = 1;
                btnToStep3.style.cursor = 'pointer';
            } else {
                btnToStep3.disabled = true;
                btnToStep3.style.opacity = 0.5;
                btnToStep3.style.cursor = 'not-allowed';
            }
        } else {
            btnToStep3.disabled = false;
            btnToStep3.style.opacity = 1;
            btnToStep3.style.cursor = 'pointer';
        }
    }
}

// Add event listener for epds select dropdown to check button completion
document.getElementById('jenis_nifas').addEventListener('change', checkStep2Completion);

function getAge(dateString) { var today = new Date(); var birthDate = new Date(dateString); var age = today.getFullYear() - birthDate.getFullYear(); var m = today.getMonth() - birthDate.getMonth(); if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; } return age; }

document.getElementById('main-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Cek Honeypot Spam
    if(document.getElementById('website_url_honeypot').value !== '') {
        console.warn("Spam terdeteksi! Menghentikan pengiriman.");
        return false; // Hentikan script, jangan kirim data
    }

    // Ubah tombol jadi loading
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const btnSubmit = document.getElementById('btn-submit');
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    btnSubmit.disabled = true;

    // Kumpulkan Data Biodata
    const payload = {
        tgl_skrining: document.getElementById('tgl_skrining').value,
        nama: document.getElementById('nama').value,
        nik: document.getElementById('nik').value,
        tgl_lahir: document.getElementById('tgl_lahir').value,
        usia: getAge(document.getElementById('tgl_lahir').value),
        no_wa: document.getElementById('no_wa').value,
        status_menikah: document.getElementById('status_menikah').value,
        pendidikan: document.getElementById('pendidikan').value,
        pekerjaan: document.getElementById('pekerjaan').value,
        institusi: document.getElementById('institusi').value,
        provinsi: document.getElementById('provinsi').value,
        kabupaten: document.getElementById('kabupaten').value,
        kecamatan: document.getElementById('kecamatan').value,
        alamat: document.getElementById('alamat').value,
        jenis_skrining: document.querySelector('input[name="jenis_skrining"]:checked').value,
        jenis_nifas: document.getElementById('jenis_nifas').value || '-',
        skor_hasil: '',
        kesimpulan_status: ''
    };

    let cardHtml = '';
    let tindakLanjutHtml = '';

    // Hitung Skor
    if(payload.jenis_skrining === 'PHQ4') {
        let q1 = parseInt(document.querySelector('input[name="phq1"]:checked').value); let q2 = parseInt(document.querySelector('input[name="phq2"]:checked').value); let q3 = parseInt(document.querySelector('input[name="phq3"]:checked').value); let q4 = parseInt(document.querySelector('input[name="phq4"]:checked').value);
        let scoreDepresi = q1 + q2; let scoreCemas = q3 + q4;
        payload.skor_hasil = `Depresi: ${scoreDepresi}, Cemas: ${scoreCemas}`;
        payload.kesimpulan_status = (scoreDepresi >= 3 || scoreCemas >= 3) ? 'Kemungkinan Gejala' : 'Normal';

        cardHtml = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center"><div class="p-4 rounded-xl border ${scoreDepresi >= 3 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}"><h4 class="font-bold text-gray-600 mb-1">Skor Depresi (PHQ-2)</h4><div class="text-3xl font-black ${scoreDepresi >= 3 ? 'text-red-600' : 'text-green-600'}">${scoreDepresi}</div><p class="mt-2 text-sm font-semibold">${scoreDepresi >= 3 ? 'Kemungkinan Gejala Depresi' : 'Normal (Tidak Ada Gejala)'}</p></div><div class="p-4 rounded-xl border ${scoreCemas >= 3 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}"><h4 class="font-bold text-gray-600 mb-1">Skor Kecemasan (GAD-2)</h4><div class="text-3xl font-black ${scoreCemas >= 3 ? 'text-amber-600' : 'text-green-600'}">${scoreCemas}</div><p class="mt-2 text-sm font-semibold">${scoreCemas >= 3 ? 'Kemungkinan Gejala Kecemasan' : 'Normal (Tidak Ada Gejala)'}</p></div></div>`;
        tindakLanjutHtml = (scoreDepresi >= 3 || scoreCemas >= 3) ? `<ul class="list-disc pl-5"><li><strong>Konseling awal</strong> oleh Perawat/Bidan.</li><li><strong>Pemeriksaan Medis</strong> oleh Dokter/Psikolog.</li><li class="text-red-600">Rujuk FKTL jika depresi berat atau tak membaik > 1 bulan.</li></ul>` : `Edukasi kesehatan jiwa dasar.`;
    } else if(payload.jenis_skrining === 'EPDS') {
        let totalScore = 0; let q10Score = 0;
        for(let i=1; i<=10; i++) { let val = parseInt(document.querySelector(`input[name="ep${i}"]:checked`).value); totalScore += val; if(i === 10) q10Score = val; }

        let status = (totalScore >= 14) ? "Depresi Sangat Mungkin Terjadi" : (totalScore >= 12) ? "Kemungkinan Depresi Cukup Tinggi" : (totalScore >= 9) ? "Kemungkinan Depresi" : "Tidak Depresi (Normal)";
        if(q10Score > 0) status += " (PERINGATAN: Ide Menyakiti Diri)";

        payload.skor_hasil = `Total: ${totalScore}`;
        payload.kesimpulan_status = status;

        cardHtml = `<div class="p-6 rounded-xl border bg-gray-50 text-center"><h4 class="font-bold text-gray-600 mb-2">Total Skor EPDS</h4><div class="text-5xl font-black ${(totalScore >= 14 || q10Score > 0) ? 'text-red-600' : 'text-indigo-600'}">${totalScore} / 30</div><p class="mt-3 text-lg font-bold">${status}</p></div>`;
        tindakLanjutHtml = (q10Score > 0) ? `<b class="text-red-600">RUJUK SEGERA!</b> Indikasi menyakiti diri.` : (totalScore >= 14) ? "Rujukan ke spesialis / psikiater." : "Observasi dan skrining ulang 2-4 minggu.";
    } else if(payload.jenis_skrining === 'SDQ') {
        let totalScore = 0; for(let i=1; i<=20; i++) totalScore += parseInt(document.querySelector(`input[name="sdq${i}"]:checked`).value);
        let batasRujuk = (payload.usia <= 10) ? 14 : 16;
        let isRujuk = totalScore >= batasRujuk;

        payload.skor_hasil = `Total: ${totalScore}`;
        payload.kesimpulan_status = isRujuk ? 'Indikasi Perlu Rujukan' : 'Batas Normal';

        cardHtml = `<div class="p-6 rounded-xl border ${isRujuk ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'} text-center"><h4 class="font-bold text-gray-600 mb-2">Total Skor SDQ</h4><div class="text-5xl font-black ${isRujuk ? 'text-red-600' : 'text-green-600'}">${totalScore}</div><p class="mt-3 text-lg font-bold ${isRujuk ? 'text-red-700' : 'text-green-700'}">${payload.kesimpulan_status}</p></div>`;
        tindakLanjutHtml = isRujuk ? "Disarankan berkonsultasi dengan Dokter / Psikolog." : "Tidak ditemukan masalah perilaku/emosional signifikan.";
    }

    // MENGIRIM DATA KE GOOGLE SHEETS VIA NETLIFY FUNCTION PROXY
    const functionUrl = '/.netlify/functions/submit-skrining';

    // Kembalikan format pengiriman data ke JSON string murni agar
    // serasi dengan parser Google Apps Script di backend.
    fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(() => {
        // Tampilkan halaman hasil setelah selesai dikirim
        document.getElementById('res-nama').innerText = payload.nama;
        document.getElementById('res-usia').innerText = payload.usia;
        document.getElementById('result-cards-container').innerHTML = cardHtml;
        document.getElementById('res-tindak-lanjut').innerHTML = tindakLanjutHtml;

        document.getElementById('progress-container').classList.add('hidden');
        document.getElementById('main-form').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');

        // Hapus Draft karena telah berhasil submit
        localStorage.removeItem('ckg_draft');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch(error => {
        alert("Gagal menyimpan ke database. Harap cek koneksi internet.");
        console.error('Error:', error);
    }).finally(() => {
        // Kembalikan tombol seperti semula
        btnText.classList.remove('hidden');
        btnLoading.classList.add('hidden');
        btnSubmit.disabled = false;
    });
});

function downloadPDF() {
    const btn = document.querySelector('button[onclick="downloadPDF()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<div class="loader"></div> Memproses PDF...';
    btn.disabled = true;

    // Populate data to hidden print area
    document.getElementById('pdf-tgl').innerText = document.getElementById('tgl_skrining').value;
    document.getElementById('pdf-nama').innerText = document.getElementById('nama').value;
    document.getElementById('pdf-nik').innerText = document.getElementById('nik').value;
    document.getElementById('pdf-usia').innerText = getAge(document.getElementById('tgl_lahir').value);

    // Alamat
    const alamatLengkap = `${document.getElementById('alamat').value}, Kec. ${document.getElementById('kecamatan').value}, Kab/Kota ${document.getElementById('kabupaten').value}, Prov. ${document.getElementById('provinsi').value}`;
    document.querySelectorAll('.pdf-alamat').forEach(el => el.innerText = alamatLengkap);

    // Hasil
    const jenis = document.querySelector('input[name="jenis_skrining"]:checked').value;
    document.getElementById('pdf-jenis').innerText = `Skrining ${jenis}`;

    // Ambil kesimpulan dari tampilan hasil (UI card)
    const cards = document.querySelectorAll('#result-cards-container > div');
    let skorGabungan = [];
    let statusGabungan = [];

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText;
        const score = card.querySelector('.text-3xl').innerText;
        const status = card.querySelectorAll('p')[1]?.innerText || '';
        skorGabungan.push(`${title}: ${score}`);
        if(status) statusGabungan.push(status);
    });

    document.getElementById('pdf-skor').innerHTML = skorGabungan.join('<br>');
    document.getElementById('pdf-status').innerHTML = statusGabungan.join('<br>');

    // Tindak lanjut
    document.getElementById('pdf-tindak-lanjut').innerHTML = document.getElementById('res-tindak-lanjut').innerHTML;

    // Tampilkan sebentar, cetak, sembunyikan lagi
    const printArea = document.getElementById('print-area');
    printArea.classList.remove('hidden');

    const opt = {
        margin:       0.5,
        filename:     `Hasil_Skrining_${document.getElementById('nama').value.replace(/\s+/g, '_')}_${document.getElementById('tgl_skrining').value}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(printArea).set(opt).save().then(() => {
        printArea.classList.add('hidden');
        btn.innerHTML = originalText;
        btn.disabled = false;
    });
}

function resetApp() {
    document.getElementById('main-form').reset();
    document.getElementById('tgl_skrining').valueAsDate = new Date();
    document.getElementById('result-section').classList.add('hidden');
    document.getElementById('main-form').classList.remove('hidden');
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');

    document.getElementById('kuesioner-phq4').classList.add('hidden'); document.getElementById('kuesioner-epds').classList.add('hidden'); document.getElementById('kuesioner-sdq').classList.add('hidden'); document.getElementById('container-nifas').classList.add('hidden'); document.getElementById('btn-submit').classList.add('hidden');
    document.getElementById('progress-container').classList.remove('hidden');

    // Reset Navigation
    currentStep = 1;
    updateProgressBar();

    // Reset visual feedback NIK
    const feedback = document.getElementById('nik_feedback');
    feedback.innerText = "";
    document.getElementById('nik').classList.remove('border-red-500', 'border-green-500', 'ring-red-200', 'ring-green-200');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
