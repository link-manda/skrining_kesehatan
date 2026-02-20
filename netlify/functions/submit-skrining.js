// proxy endpoint for Google Apps Script
exports.handler = async function(event, context) {
  // Hanya ijinkan metode POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Masukkan URL Google Apps Script Web App asli di sini.
  // URL ini tidak akan pernah terlihat di frontend pengguna.
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxsJEDhyOBtjz5w6tLB70ODJqIAXfhAB-s54nTKhKx6r81nMJKOwd6z3zU85RvyBa6B/exec';

  try {
    const requestBody = event.body;

    // Teruskan kiriman data ke Google Apps Script
    // GAS biasanya membaca obyek dari JSON.parse(e.postData.contents) jika kita kirim text/plain
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'text/plain',
      }
    });

    // Kita ambil text-nya dulu untuk menangkal error jika GAS tidak mengembalikan JSON murni
    const responseText = await response.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch(err) {
      // Jika ternyata balasan dari GAS berupa HTML atau redirect page tanpa JSON
      console.warn("Google Apps Script did not return pure JSON:", responseText);
      data = { status: 'success', note: 'Data forwarded, but response was non-JSON' };
    }

    // Kembalikan response GAS ke frontend
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Error in Netlify Function Proxy:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request to Google Apps Script.' })
    };
  }
};
