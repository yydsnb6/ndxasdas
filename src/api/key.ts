// // @ts-ignore
// import forge from 'node-forge';

// // 解密私钥
// var serverPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
// MIIEowIBAAKCAQEA1HClVxsls9XralGNyE33q5neC1DiWlHmsGmNHfqM4phiT5wn
// XKUC6s3S++HQl802fNiDEGp/cYXEjhJ365rTm9Sx/VLomUECWoSkQN270MeTs1l+
// eu0epBpImy2Ugx6UMtM/wqEwk3eLI1t4FiDYpUyAEsrKT+JWzaSOgbUpaI+mcz+J
// I7Ke/qC+wDGvwD06c5QJeA96BvZBa+Atr6nECMh3OE9OcCmla8+YILRY0puNbsEU
// Ex2nFIB7jHYQou0tfyi0ALWuWt+t0N0aMDv8wZQG/90ddFoeSFUprVye/sH85xcG
// AYKmK9nG08Rs2RUtcbgVhrMQ5Wl2S8niV2WWxQIDAQABAoIBAHGv1svGu2aCFHnR
// Kw8GqoQq06k6n+e17L57vglNDBg3dGUmK+poZCdD/qTNM9QI/h/RvlIKrCkUbRua
// xpJPSO8b5CStOczJ/Xhzg3MzNk+EfoZ8XjNqsfsgFbr1qYSB2M1aP8TofhZs4wkI
// 6jrtWQMc7W0hGSOm/M0QQzMmwAIz5ETqk2z6k22d30ZXeLiYb1EbGl4tGaypPkLi
// vTwH4H90J9h9WPsZo8kZoRRInKGPNSo+hRi3NeoJzE1EExPJTomOn97LmVkipwd2
// V2xv6D6pYnFhPgcSU0sH28FoiZc7tKT5dxIYjip7uMon9MH+chwQIJt5efgB7OlT
// JyjTIAECgYEA6kNT/FOgcNNHhPzkw7B/00bb3Ec7Ro4HixDecAkK1H6zIof2FyVJ
// MDavmq4SbkllLts3kn6+BpEQyWO+X2HJr+IlQs4bLQgKW6eU2rKCeXPytU3MybxH
// TirO7Bdxc7ofA8YHAtDWB8Os28ku15U4bshgf27O+cVDOLGQWXpQA5kCgYEA6Cbv
// k6XszhwKLsEIQeaBUOpOv+0JhBoUPQpqYd09j0CW6Z5TP8GhokSPVO/+DjLvqdX2
// eXfndjoYaKXLiz2pUClp6dvc5fXmIyN2RU9sSBodVxsleFRzUjygHjf9TsX/2Zdi
// BtfNFYJDjRnC56UfonBVRlvnq8lJ8SQI1JJhqA0CgYB67XWm1OM+EUBYYrRQk8+f
// uHEquB48uc7vhJyUwcnzE8FAf4P9RU2QhUHEs09snAsCeXpB30wr+feLFlIRjyjc
// qJjQ44KTMMLusZOE52NcBCH6TacGvUvVktUeQncAOUyJGGMZcSi+zklo07tG2UDR
// sUgh1q25l2/c0iBjM7HFEQKBgQDhxqQvaypf1UNN7yvRs5TGlemanLQphpdyOgP2
// Q42QGVfrwq/iDLXes2DWUUU6l+0ftlgsECHKiHueosfPFlvo+y3nY411FG4KdH2c
// sL51bPhl85/AZBl3vEBYw0kWaFgITULnts7cgUCjJI+6a4vVlfxJHi60kmHYJJx1
// 6BsTrQKBgHUD5UzB2IQK0sYAWVvpZ1zW96ZfXD9COjuGxfJZewSD1uLsFmYbHXCy
// OVBm7DLOzS+CZ6LuyaAQmQ8SAmpiWBDECLObmo1NdisAFwUtjMZVfvWl6/xA8EwG
// vV+XbhTWNZ3VAxXdXTdFZdEdWRByR0q0ou26JnzUBdD0/2Vpbkc7
// -----END PRIVATE KEY-----`;

// // 加密公钥
// var clientPublicKeyPem = `-----BEGIN PUBLIC KEY-----
// MIIBCgKCAQEApWSbZFCzF6lE4UIjukcw7UMAosKMXkzYQLSXd4vE5BAJw65iXrry
// kUM6TfKFfk7pJ0Z+CTTFTztBzu79ua7qQ8kegI+2ous6CHwpV9Py1wBt0fsIeoD5
// feFeRzPscCFHa2ps3+H0p5pX8jyw0/ISeShUl/j3kxpDEcNoEfLd9MiVY4D27kh9
// vTiDNlr0e8vZrIBHCk0g31ZrVw4UopsqNS2ZxsHwFWUDKgGDOCenQDU0QJWvwArN
// B8/h3SyRg2R4TVTFs4P+MdeCeERl9ZLleFiWEUyIWNqI+JThVGCnIOHW9p8A9ZQa
// 6AKs0CtMq/L+2IIpTildihCuvBCLbYrd+QIDAQAB
// -----END PUBLIC KEY-----`;

// const str1 = "RSAES"
// const str2 = "-PKCS1"
// const str3 = "-V1_5"


// // 公钥加密函数
// export function encryptPKCS1v15(data: string): { ciphertext: string, error?: Error } {
//     let dataArr = [];
//     for (let i = 0; i < data.length; i += 50) {
//         dataArr.push(data.slice(i, i + 50));
//     }
//     let ciphertext = ''

//     dataArr.forEach((item) => {
//         try {
//             const publicKey = forge.pki.publicKeyFromPem(clientPublicKeyPem);
//             const encrypted = publicKey.encrypt(forge.util.encodeUtf8(item), str1 + str2 + str3, {
//                 md: forge.md.sha256.create(),
//                 mgf1: forge.mgf1.create()
//             });
//             let code = forge.util.encode64(encrypted).replace(/\s+/g, '')
//             ciphertext = ciphertext + '_' + code
//         } catch (error: any) {
//             return { ciphertext: '', error: error };
//         }

//     })
//     return { ciphertext:ciphertext.slice(1) };

// }

// // 私钥解密函数
// export function decryptPKCS1v15(ciphertext: string): { plaintext: string, error?: Error } {
//     ciphertext = ciphertext.replace(/\s+/g, '')
//     let ciphertextArr = ciphertext.split("_")
//     let resultStr = ''
//     let reError = null
//     ciphertextArr.forEach((item) => {
//         try {
//             const privateKey = forge.pki.privateKeyFromPem(serverPrivateKeyPem);
//             const encryptedBytes = forge.util.decode64(item);
//             const decrypted = privateKey.decrypt(encryptedBytes, str1 + str2 + str3, {
//                 md: forge.md.sha256.create(),
//                 mgf1: forge.mgf1.create(),
//             });
//             resultStr += decrypted
//         } catch (error) {
//             reError = error
//             return { plaintext: '', error: error };
//         }
//     })
//     if (reError) {
//         return { plaintext: '', error: reError };
//     }
//     return { plaintext: forge.util.decodeUtf8(resultStr) };
// }

