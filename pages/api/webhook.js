import axios from "axios";
import Bitrix from "@2bad/bitrix";

const bitrix = Bitrix(
    "https://b24-iqw9zu.bitrix24.com.br/rest/1/9c4w1aiyk0wzhplp/"
);

export default async function handler(req, res) {
    //const data = await axios.get("https://oimenu.bitrix24.com.br/rest/24088/y6nxi5u1y6p3l6ta/events.json")
    bitrix.deals.get(req.body["data[FIELDS][ID]"]).then(({ result }) => {
        if (result.STAGE_ID === "EXECUTING") {
            console.log("passei aqui");
            axios.post(
                "https://discordapp.com/api/webhooks/1060977635393544312/GNMePjBnzXEX96PbyT1QRPwwcdjnQTvjzr5Tdr-KHolZWsgqC6DJPOFt8olwyjzKZ39n",
                {
                    content: `⚠️⚠️⚠️ATENÇÃO @Suporte ⚠️⚠️⚠️ PRÉ GOLIVE - ${
                        result.TITLE
                    } - Info: ${result.UF_CRM_1673270284034} - Tablets: ${
                        result.UF_CRM_1673272410518
                            ? `${result.UF_CRM_1673272410518}`
                            : "Não"
                    } - Possui Pocket?: ${
                        result.UF_CRM_1673272763373 === "1" ? "Sim" : "Não"
                    }`,
                }
            );
            console.log("executei");
        }
    });
    switch (req.body.event) {
        case "ONCRMDEALUPDATE":
            bitrix.deals
                .get(req.body["data[FIELDS][ID]"])
                .then(({ result }) => {
                    if (result.STAGE_ID === "EXECUTING") {
                        console.log("passei aqui");
                        axios.post(
                            "https://discordapp.com/api/webhooks/1060977635393544312/GNMePjBnzXEX96PbyT1QRPwwcdjnQTvjzr5Tdr-KHolZWsgqC6DJPOFt8olwyjzKZ39n",
                            {
                                content: `⚠️⚠️⚠️ATENÇÃO @Suporte ⚠️⚠️⚠️ PRÉ GOLIVE - ${
                                    result.TITLE
                                } - Info: ${
                                    result.UF_CRM_1673270284034
                                } - Tablets: ${
                                    result.UF_CRM_1673272410518
                                        ? `${result.UF_CRM_1673272410518}`
                                        : "Não"
                                } - Possui Pocket?: ${
                                    result.UF_CRM_1673272763373 === "1"
                                        ? "Sim"
                                        : "Não"
                                }`,
                            }
                        );
                        console.log("executei");
                    }

                    if (result.STAGE_ID === "UC_L5XUJQ") {
                        console.log("passei aqui");
                        axios.post(
                            "https://discordapp.com/api/webhooks/1062011254841016442/j_AKYw44BX7IZhpHZRo6vOTdHqcBD4AcMEv3tg22sBcFeJhfMEuIp7k4fq9mg72_aG2J",
                            {
                                content: `⚠️⚠️⚠️ATENÇÃO ⚠️⚠️⚠️ GO LIVE!!! - ${
                                    result.TITLE
                                } - Info: ${
                                    result.UF_CRM_1673270284034
                                } - Tablets: ${
                                    result.UF_CRM_1673272410518
                                        ? `${result.UF_CRM_1673272410518}`
                                        : "Não"
                                } - Possui Pocket?: ${
                                    result.UF_CRM_1673272763373 === "1"
                                        ? "Sim"
                                        : "Não"
                                }`,
                            }
                        );
                        console.log("executei");
                    }
                });
            break;

        default:
            console.log("Not found!");
            break;
    }

    //console.log(req.body)
    res.status(200).json({ page: req.body });
    res.end();
}
