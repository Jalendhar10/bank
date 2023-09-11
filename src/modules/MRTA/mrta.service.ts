// import httpStatus from 'http-status';
// import mongoose from 'mongoose';
// import User from './user.model';
// import { ApiError } from '../utils/errors';
// import { IOptions, QueryResult } from '../utils/paginate/paginate';
// import { NewCreatedUser, UpdateUserBody, IUserDoc, NewRegisteredUser } from './user.interfaces';
import { pgpEncryption, aesEncryption } from '../utils/crypto';
import config from '../../config/config';

export const createQuote = async (quoteBody: any) => {
  // testing pgp generation
  // const { publicKey, privateKey } = await pgp.generateKeys();
  // const privateBuff = Buffer.from(privateKey).toString('base64');
  // console.log('privateKey: ', privateBuff);
  // const publicBuff = Buffer.from(publicKey).toString('base64');
  // console.log('publicKey: ', publicBuff);

  const text = 'this is to be encrypted';

  const publicKey = Buffer.from(config.federalBank.publicKey, 'base64').toString('ascii');
  const privateKey = Buffer.from(config.federalBank.privateKey, 'base64').toString('ascii');
  const encryptedData = await pgpEncryption.encrypt(text, publicKey);
  const decryptedData = await pgpEncryption.decrypt(encryptedData, privateKey, config.federalBank.passphrase);
  const response = {
    data: {
      data: quoteBody.data,
      encryptedData,
      decryptedData,
    },
    message: 'quote created',
  };
  return response;
};

export const finalizeQuote = async (quoteBody: any) => {
  // const key = crypto.randomBytes(32); //Need 32 bytes (256 bits) key as we are using AES-256 encryption
  const key = Buffer.from('J/PYjc1ftDFK5+77U1PB80v2TamokGap5yCIP2YI6tQ=', 'base64');
  // const iv = crypto.randomBytes(16); //Need 16 bytes (128 bits) Initialization vector as default block size is 128 bits
  const iv = Buffer.from('gaOr3uvhZEwFeSbRHwlHcg==', 'base64');

  // Its better to pass iv and key in bytes/buffer
  const encryptedData = aesEncryption.encrypt('some data to encrypt', key, iv);
  // Need same key and iv for decryption otherwise it won't work
  const decryptedData = aesEncryption.decrypt(encryptedData, key, iv);
  const response = {
    data: {
      data: quoteBody.data,
      encryptedData,
      decryptedData,
    },
    message: 'quote finalized',
  };
  return response;
};
