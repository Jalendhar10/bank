import * as openpgp from 'openpgp';

const generateKeys = async () => {
  const { publicKey, privateKey } = await openpgp.generateKey({
    userIDs: [{ name: 'person', email: 'person@somebody.com' }],
    curve: 'ed25519',
    passphrase: 'qwerty',
  });
  const keys = {
    publicKey,
    privateKey,
  };
  return keys;
};

const encrypt = async (plainData: string, publicKeyArmored: any) => {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainData }),
    encryptionKeys: publicKey,
  });

  return encrypted;
};

const decrypt = async (encryptedData: string, privateKeyArmored: any, passphrase: string) => {
  const message = await openpgp.readMessage({
    armoredMessage: encryptedData, // parse armored message
  });
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase,
  });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey,
  });

  return decrypted;
};

export { generateKeys, encrypt, decrypt };
