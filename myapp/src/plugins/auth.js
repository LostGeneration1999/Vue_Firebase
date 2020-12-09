import { db, storage } from "@/main";

export async function getAllData() {
    let buffData = [];
    const snapshot = await db.collection("comments").orderBy('title').limit(10).get().catch(() => {
        alert("エラーが発見されました：データ取得時");
    });
    snapshot.forEach(doc => {
        async function download() {
            let getData = await downloadImage(doc.data());
            buffData.push(getData);
        }
        download();
    })
    return buffData;
}

export async function getSearchData(searchWord, searchUser) {
    let buffData = [];
    let snapshot = null;
    if (searchWord != null && searchUser == null) {
        let searchList = db.collection("comments").where('title', '==', searchWord).limit(4);
        snapshot = await searchList.get().catch(() => {
            alert("エラーが発見されました：データ取得時");
        });
        //複数検索を文字列で分割し、複数検索
        //firestoreではLIKE検索できないっぽいので断念
        //const wordlist = searchWord.split(/[\x20\u3000]/);
        //for (let i = 0, len = wordlist.length; i < len; ++i) {
        // if (wordlist[i].length > 0) {
        //         console.log(wordlist[i]);
        //     searchlist.orderBy('title').startAt(wordlist[i]).endAt(wordlist[i] + '\uf8ff');
        //     }
        // }
    }
    else if (searchUser != null && searchWord == null) {
        let searchList = db.collection("comments").where('displayName', '==', searchUser).limit(4);
        snapshot = await searchList.get().catch(() => {
            alert("エラーが発見されました：データ取得時");
        });
    }
    else if (searchUser != null && searchWord != null) {
        let searchList = db.collection("comments").where('displayName', '==', searchUser).where('title', '==', searchWord).limit(4);
        snapshot = await searchList.get().catch(() => {
            alert("エラーが発見されました：データ取得時");
        });
    }

    snapshot.forEach(doc => { console.log(doc.data()) });
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
        alert("一部の画像を取得できませんでした");
    });
    getData["downloadURL"] = imageURL;
    return getData;
}

export function postData(data) {
    return db.collection("comments").doc(data['ID']).set({
        ID: data['ID'],
        title: data['title'],
        comment: data['comment'],
        date: data['date'],
        userID: data['userID'],
        displayName: data['displayName']
    }).then(() => {
        console.log('データ送信完了')
    }).catch(() => {
        alert('エラーが発生しました：データ送信時');
    })
}

export async function uploadImage(uploadFile, imageURL) {
    var storageRef = storage.ref().child(imageURL);
    return storageRef.put(uploadFile).then(() => {
        console.log('画像送信完了')
    }).catch(() => {
        alert('エラーが発生されました：画像アップロード');
    })
}

