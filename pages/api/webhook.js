import axios from "axios";
import Bitrix from "@2bad/bitrix";

const bitrix = Bitrix(
    "https://b24-iqw9zu.bitrix24.com.br/rest/1/9c4w1aiyk0wzhplp/"
);

export default async function handler(req, res) {
    //const data = await axios.get("https://oimenu.bitrix24.com.br/rest/24088/y6nxi5u1y6p3l6ta/events.json")
    switch (req.body.event) {
        case "ONCRMDEALUPDATE":
            await bitrix.deals
                .get(req.body["data[FIELDS][ID]"])
                .then(async ({ result }) => {
                    if (result.STAGE_ID === "EXECUTING") {
                        console.log("passei aqui");
                        const user = await axios.post(
                            `https://b24-iqw9zu.bitrix24.com.br/rest/1/9c4w1aiyk0wzhplp/user.get.json?ID=${result.UF_CRM_1673289796}`
                        );
                        const userData = JSON.parse(
                            JSON.stringify(user.data.result[0].NAME)
                        );
                        await axios.post(
                            "https://discordapp.com/api/webhooks/1060977635393544312/GNMePjBnzXEX96PbyT1QRPwwcdjnQTvjzr5Tdr-KHolZWsgqC6DJPOFt8olwyjzKZ39n",
                            {
                                content: `***⚠️⚠️⚠️ATENÇÃO @Suporte ⚠️⚠️⚠️ PRÉ GOLIVE*** \n**Restaurante:** -> ${
                                    result.TITLE + ' <-'
                                } \n**Info:** ${
                                    result.UF_CRM_1673270284034
                                } \n**Tablets:** ${
                                    result.UF_CRM_1673272410518
                                        ? `${result.UF_CRM_1673272410518}`
                                        : "Não"
                                } \n**Possui Pocket?:** ${
                                    result.UF_CRM_1673272763373 === "1"
                                        ? "Sim"
                                        : "Não"
                                } \n**Integração:** ${result.UF_CRM_1673289920667} \n**Quem fez?:** ${userData ? userData : ""}
                                `,
                            }
                        );
                        console.log("executei");
                    }

                    if (result.STAGE_ID === "UC_L5XUJQ") {
                        console.log("passei aqui");
                        const user = await axios.post(
                            `https://b24-iqw9zu.bitrix24.com.br/rest/1/9c4w1aiyk0wzhplp/user.get.json?ID=${result.UF_CRM_1673289796}`
                        );
                        const userData = JSON.parse(
                            JSON.stringify(user.data.result[0].NAME)
                        );
                        await axios.post(
                            "https://discordapp.com/api/webhooks/1062011254841016442/j_AKYw44BX7IZhpHZRo6vOTdHqcBD4AcMEv3tg22sBcFeJhfMEuIp7k4fq9mg72_aG2J",
                            {
                                content: `***⚠️⚠️⚠️ATENÇÃO @Suporte ⚠️⚠️⚠️ GOLIVE*** \n**Restaurante:** -> ${
                                    result.TITLE + ' <-'
                                } \n**Info:** ${
                                    result.UF_CRM_1673270284034
                                } \n**Tablets:** ${
                                    result.UF_CRM_1673272410518
                                        ? `${result.UF_CRM_1673272410518}`
                                        : "Não"
                                } \n**Possui Pocket?:** ${
                                    result.UF_CRM_1673272763373 === "1"
                                        ? "Sim"
                                        : "Não"
                                } \n**Integração:** ${result.UF_CRM_1673289920667} \n**Quem fez?:** ${userData ? userData : ""}
                                `,
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
