#!/usr/bin/env node

const API_URL = 'https://api.mymemory.translated.net/get';
const FROM_LANG = 'ru';
const TO_LANG = 'en';

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function translate(text, callback) {
  const url = `${API_URL}?q=${encodeURIComponent(text)}&langpair=${FROM_LANG}|${TO_LANG}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        callback(json.responseData.translatedText);
      } catch (e) {
        console.error('Error:', e.message);
        callback(null);
      }
    });
  }).on('error', (e) => {
    console.error('HTTP Error:', e.message);
    callback(null);
  });
}

function prompt() {
  rl.question('> ', (input) => {
    if (!input.trim()) {
      console.log('Empty input!');
      prompt();
      return;
    }
    translate(input, (result) => {
      if (result) console.log('=>', result);
      prompt();
    });
  });
}

prompt();