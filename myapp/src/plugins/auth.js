import { db, storage } from "@/main";

export async function getAllData() {
    let buffData = [];
    const snapshot = await db.collection("comments").get().catch(() => {
        alert("エラーが発見されました：データ取得時");
    });
    snapshot.forEach(doc => {
        async function download() {
            let getData = await downloadImage(doc.data())
            buffData.push(getData);
        }
        download();
    })
    return buffData;
}

export async function downloadImage(getData) {
    const imageURL = await storage.ref().child(getData.ID).getDownloadURL().catch(() => {
        alert("エラーが発生されました：画像取得時");
    });
    getData["downloadURL"] = imageURL;
    return getData;
}

export function postData(data) {
    db.collection("comments").add({
        ID: data['ID'],
        title: data['title'],
        comment: data['comment'],
        // dateに変更
        date: data['date'],
        userID: data['userID'],
        displayName: data['displayName']
    }).catch(() => {
        alert('エラーが発生しました：データ送信時');
    })
}

export async function uploadImage(uploadFile, imageURL) {
    var storageRef = storage.ref().child(imageURL);
    storageRef.put(uploadFile).catch(() => {
        alert('エラーが発生されました：画像アップロード');
    })
}