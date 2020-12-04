import { db, storage } from "@/main";

export async function getAllData() {
    let buffData = [];
    const snapshot = await db.collection("comments").get().catch(() => {
        alert("エラーが発見されました");
    });
    snapshot.forEach(doc => {
        async function download() {
            let getData = await downloadImage(doc.data()).then(res => {
                return res
            })
            buffData.push(getData);
        }
        download();
    })
    return buffData;
}

export async function downloadImage(getData) {
    const imageURL = await storage.ref().child(getData.imageURl).getDownloadURL().catch(() => {
        alert("エラーが発生されました");
    });
    getData["downloadURL"] = imageURL;
    return getData;
}