import {HttpError,json,type Env} from '../_lib/core';
export const onRequest:PagesFunction<Env>=async ctx=>{try{return await ctx.next()}catch(error){if(error instanceof HttpError)return json({error:error.message},error.status);return json({error:'The service could not complete this request. Please retry or contact Verto.'},503)}};
