import axios from 'axios'
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';
async function upload(fileBuffer) {
  try {
    const fileTypeResult = await fileTypeFromBuffer(fileBuffer);
    const form = new FormData();

    if (fileTypeResult) {
      form.append('file', fileBuffer, 'file.' + fileTypeResult.ext);
    } else {
      form.append('file', fileBuffer, 'file.unknown');
      console.warn('Tipe file tidak terdeteksi.');
    }

    const response = await fetch('https://www.aplotpelrapikz.my.id/upload', {
      method: 'POST',
      body: form,
    });

    const htmlResponse = await response.text();
    const $ = cheerio.load(htmlResponse);
    const rawUrl = $('#rawUrlLink').attr('href');

    return rawUrl;
  } catch (error) {
    console.error('Terjadi kesalahan saat mengunggah:', error);
    throw error;
  }
}
export { upload }
