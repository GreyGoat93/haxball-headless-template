const path = require('path');
const puppeteer = require('puppeteer');
require("dotenv").config();

const ROOM_LINK_CODE = "31sj31";
let ROOM_LINK_OBTAINED = false;

const playerNames = [
    "TAHA_1", "BURAK_2", "RTE_3", "ICARDI_4", "EZEL_5", "BÜLENT_ERSOY_6", "WALTER_WHITE_7",
    "FAT_BOY_8", "KURWA_9", "CARALHO_10", "JESSE_PINKMAN_11", "LUFFY_12", "ZORO_13", "NAMI_14",
    "USOPP_15", "CHOPPER_16", "NICO_ROBIN_17", "FRANKY_18", "BROOK_19", "JIMBEI_20",
];

(async () => {
    let ROOM_LINK = null;
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
            "--disable-features=WebRtcHideLocalIpsWithMdns",
        ]}
    );
    const page = await browser.newPage();
    await page.goto('https://haxball.com/headless');
    try {
        await page.addScriptTag({path: path.join(__dirname, './dist/main.js')});
        page.on("console", (message) => {
            if(!ROOM_LINK_OBTAINED) {
                if(message.type() === "info") {
                    const text = message.text();
                    if(text.includes(ROOM_LINK_CODE)){
                        ROOM_LINK = text.split(" ")[1];
                        // createPlayers(parseInt(process.env.PLAYER_COUNT), true);
                        ROOM_LINK_OBTAINED = true;
                    }
                }
            }
        })
    } catch(err) {
        console.log(err);
    }

    const createPlayers = (size, sync = true) => {
        const iterator = Array.from(Array(size)).map((_, index) => {
            return createPlayer.bind(this, index);
        })[Symbol.iterator]();
        const iterate = () => {
            const next = iterator.next();
            if(!next.done) {
                if(sync){
                    next.value().then(() => iterate());
                } else {
                    next.value();
                    iterate();
                }
            }
        }
        iterate();
    }

    const createPlayer = async (index) => {
        try {
            const page = await browser.newPage();
            await page.goto(ROOM_LINK);
            await page.waitForSelector('.gameframe');
            const elementHandle = await page.$('.gameframe');
            const frame = await elementHandle.contentFrame();
            await frame.$eval('[data-hook="input"]', (el, playerName) => el.value = playerName, playerNames[index]);
            await frame.$eval('[data-hook="ok"]', el => {
                el.disabled = false;
                el.click();
            });
            await frame.waitForSelector('[data-hook="menu"]');
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (err) {
            console.log(err);
        }
    }
})();