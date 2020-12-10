import { db, storage } from "@/main";
import firebase from "firebase";

export async function getAllData(limit, pagingToken) {
    let nextToken = "";
    let query = db.collection("comments").orderBy('createdAt', 'desc').limit(limit);
    if (pagingToken != "") {
        const [seconds, nanoseconds] = pagingToken.split(':');
        const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        query = query.startAfter(timestamp);
    }
    const result = await query.get().then((snapshot) => {
        if (snapshot) {
            if (snapshot.docs.length >= limit) {
                const last = snapshot.docs[snapshot.docs.length - 1];
                const lastData = last.data();
                const time = lastData.createdAt;
                nextToken = `${time.seconds}:${time.nanoseconds}`;
            }
            return { "BuffData": snapshot, "nextPageToken": nextToken };
        }
    }).catch(() => {
        alert("エラーが発見されました：データ取得時");
    });
    return result;
}

export async function downloadImageToBox(snapshot) {
    let buffData = [];
    for (let i = 0, len = snapshot.docs.length; i < len; ++i) {
        let data = snapshot.docs[i].data();
        data.createdAt = dateCheck(data.createdAt);
        let getData = await downloadImage(data);
        buffData.push(getData);
    }
    return buffData
}

export async function getSearchData(limit, searchWord, searchUser) {
    let buffData = [];
    let snapshot = null;
    if (searchWord != null && searchUser == null) {
        let query = db.collection("comments").orderBy('createdAt').where('title', '==', searchWord).limit(limit);
        snapshot = await query.get().catch(() => {
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
        let query = db.collection("comments").orderBy('createdAt').where('displayName', '==', searchUser).limit(limit);
        snapshot = await query.get().catch(() => {
            alert("エラーが発見されました：データ取得時");
        });
    }
    else if (searchUser != null && searchWord != null) {
        let query = db.collection("comments").orderBy('createdAt').where('displayName', '==', searchUser).where('title', '==', searchWord).limit(limit);
        snapshot = await query.get().catch(() => {
            alert("エラーが発見されました：データ取得時");
        });
    }

    if (snapshot) {
        snapshot.forEach(doc => {
            let data = doc.data();
            data.createdAt = dateCheck(data.createdAt);
            (async () => {
                let getData = await downloadImage(data);
                buffData.push(getData);
                console.log(buffData.length);
            })();

        })
    }
    return buffData;
}

async function downloadImage(getData) {
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
        createdAt: data['createdAt'],
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

function dateCheck(createdAt) {
    var d = createdAt.toDate();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    var min = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
    createdAt = year + '年' + month + '月' + day + '日' + hour + '時' + min + '分';
    return createdAt;
}
