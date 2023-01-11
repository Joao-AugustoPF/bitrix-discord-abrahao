import axios from "axios";
import Bitrix from "@2bad/bitrix";

const bitrix = Bitrix(
    `${process.env.NEXT_APP_BITRIX_APP}`
);

export default async function handler(req, res) {
    switch (req.body.event) {
        case "ONCRMDEALUPDATE":
            await bitrix.deals
                .get(req.body["data[FIELDS][ID]"])
                .then(async ({ result }) => {
                    const user = await axios.post(
                        `${process.env.NEXT_APP_BITRIX_URL_USER}/user.get.json?ID=${result.UF_CRM_1673289796}`
                    );
                    const userData = JSON.parse(
                        JSON.stringify(user.data.result[0].NAME)
                    );


                    if (result.STAGE_ID === "EXECUTING") {
                        console.log("passei aqui");
                        await axios.post(
                            `${process.env.NEXT_APP_DISCORD_FIRST}`,
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
                        await axios.post(
                            `${process.env.NEXT_APP_DISCORD_SECOND}`,
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
