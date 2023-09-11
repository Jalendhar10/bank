import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
// import { ApiError } from '../utils/errors';
import * as mrtaService from './mrta.service';

export const createQuote = catchAsync(async (req: Request, res: Response) => {
  const quoteData = await mrtaService.createQuote(req.body);
  res.status(httpStatus.OK).send(quoteData);
});

export const finalizeQuote = catchAsync(async (req: Request, res: Response) => {
  const result = await mrtaService.finalizeQuote(req.body);
  res.status(httpStatus.OK).send(result);
});
