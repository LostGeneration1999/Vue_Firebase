import { db, storage } from "@/main";
import firebase from "firebase";
import router from '@/router'

export async function getAllData(limit, pagingToken) {
    let nextToken = "";
    let query = db.collection("comments").orderBy('createdAt', 'desc').limit(limit);
    if (pagingToken != "") {
        const [seconds, nanoseconds] = pagingToken.split(':');
        const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        query = query.startAfter(timestamp);
    }
    const result = await query.get().then((snapshot) => {
        if (snapshot.docs.length >= limit) {
            const last = snapshot.docs[snapshot.docs.length - 1];
            const lastData = last.data();
            const time = lastData.createdAt;
            nextToken = `${time.seconds}:${time.nanoseconds}`;
        }
        return { "BuffData": snapshot, "nextPageToken": nextToken };
    }).catch(() => {
        alert("エラーが発生しました");
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

export async function deleteData(ID) {
    db.collection("comments").doc(ID).delete().then(() => {
        deleteImageFile(ID);
    }).catch(() => {
        alert('エラーが発生しました');
    });
}

function deleteImageFile(ID) {
    storage.ref().child(ID).delete().then(() => {
        router.go('/');
    }).catch(() => {
        alert('エラーが発生しました');
    })
}

export async function getSearchData(limit, searchWord, searchUser, pagingToken) {
    let nextToken = "";
    let query = db.collection("comments").orderBy('createdAt');
    if (pagingToken != "") {
        const [seconds, nanoseconds] = pagingToken.split(':');
        const timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        query = query.startAfter(timestamp);
    }
    if (searchUser == "" && searchWord != "") {
        query = query.where('title', '==', searchWord).limit(limit);
    }
    else if (searchUser != "" && searchWord == "") {
        query = query.where('displayName', '==', searchUser).limit(limit);
    }
    else if (searchUser != "" && searchWord != "") {
        query = query.where('displayName', '==', searchUser).where('title', '==', searchWord).limit(limit);
    }


    const result = await query.get().then((snapshot) => {
        if (snapshot.docs.length >= limit) {
            const last = snapshot.docs[snapshot.docs.length - 1];
            const lastData = last.data();
            const time = lastData.createdAt;
            nextToken = `${time.seconds}:${time.nanoseconds}`;
        }
        return { "BuffData": snapshot, "nextPageToken": nextToken };
    }).catch(() => {
        alert("エラーが発生しました");
    });
    return result;
}

async function downloadImage(getData) {
    const imageURL = await storage.ref().child(getData.ID).getDownloadURL().catch(() => {
        alert("エラーが発生しました");
    });
    getData["downloadURL"] = imageURL;
    return getData;
}

export function postData(data) {
    return db.collection("comments").doc(data.ID).set({
        ID: data.ID,
        title: data.title,
        comment: data.comment,
        createdAt: data.createdAt,
        userID: data.userID,
        displayName: data.displayName,
    }).then(() => {
        console.log('データ送信完了')
    }).catch(() => {
        alert('エラーが発生しました');
    })
}

export async function uploadImage(uploadFile, imageURL) {
    var storageRef = storage.ref().child(imageURL);
    return storageRef.put(uploadFile).then(() => {
        console.log('画像送信完了')
    }).catch(() => {
        alert('エラーが発生しました');
    })
}

function dateCheck(createdAt) {
    var d = createdAt.toDate();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    createdAt = year + '-' + month + '-' + day;
    return createdAt;
}
