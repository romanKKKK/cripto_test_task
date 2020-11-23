//eslint-disable-next-line
const bitcoin = require('bitcoinjs-lib')
const bip38 = require('bip38')
const wif = require('wif')
import QRCode from 'qrcode'

export const getLegacyKeyData = () => {
    const keyPair = bitcoin.ECPair.makeRandom()
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })
    return address
}

export const getSegWitAddressData = async (wifKey) => {
    const decoded = bitcoin.ECPair.fromWIF(wifKey)
    const { address } = await bitcoin.payments.p2wpkh({ pubkey: decoded.publicKey })
    return address
}

export const getPrivateKeyData = async (key, passPhrase) => {
    const decoded = await fromWif(key)
    return await bip38.encrypt(decoded.privateKey, decoded.compressed, passPhrase)
}

export const decryptPrivateKey = (key, passPhrase) => {
    const decryptedKey = bip38.decrypt(key, passPhrase, (status) => console.log('status', status))
    // console.log(wif.encode(0x80, decryptedKey.privateKey, decryptedKey.compressed))
}

export const toWif = async (address) => {
    const privateKey = Buffer.from(address, 'utf8')
    return await wif.encode(128, privateKey, true)
}

export const fromWif = (key) => wif.decode(key)

export const toQrCode = async (text) => await QRCode.toDataURL(text)
